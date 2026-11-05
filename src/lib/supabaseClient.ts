import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

// Cache client instance once initialized
let supabaseInstance: SupabaseClient | null = null;
let initPromise: Promise<SupabaseClient | null> | null = null;

export interface SupabaseConfig {
  supabaseUrl: string;
  supabasePublishableKey: string;
  configured: boolean;
}

let cachedConfig: SupabaseConfig | null = null;

/**
 * Fetch public Supabase configuration from server environment variables
 */
export async function getSupabaseConfig(): Promise<SupabaseConfig> {
  if (cachedConfig) return cachedConfig;

  // 1. Check if injected via Vite build environment
  const viteUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
  const viteKey = (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY || (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

  if (viteUrl && viteKey) {
    cachedConfig = {
      supabaseUrl: viteUrl,
      supabasePublishableKey: viteKey,
      configured: true
    };
    return cachedConfig;
  }

  // 2. Otherwise fetch from server-side proxy route
  try {
    const res = await fetch('/api/auth/config');
    if (res.ok) {
      const data = await res.json();
      cachedConfig = {
        supabaseUrl: data.supabaseUrl || '',
        supabasePublishableKey: data.supabasePublishableKey || '',
        configured: Boolean(data.supabaseUrl && data.supabasePublishableKey)
      };
      return cachedConfig;
    }
  } catch (err) {
    console.warn('[Supabase] Failed to fetch server configuration:', err);
  }

  cachedConfig = { supabaseUrl: '', supabasePublishableKey: '', configured: false };
  return cachedConfig;
}

/**
 * Get or initialize the official Supabase client singleton
 */
export async function getSupabaseClient(): Promise<SupabaseClient | null> {
  if (supabaseInstance) return supabaseInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const config = await getSupabaseConfig();
    if (!config.configured || !config.supabaseUrl || !config.supabasePublishableKey) {
      console.warn('[Supabase] Supabase credentials not yet configured. Please set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.');
      return null;
    }

    try {
      supabaseInstance = createClient(config.supabaseUrl, config.supabasePublishableKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage: window.localStorage
        }
      });
      return supabaseInstance;
    } catch (err) {
      console.error('[Supabase] Client creation failed:', err);
      return null;
    }
  })();

  return initPromise;
}

// User Profile Interface
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'user';
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Authentication Helpers
 */

// 1. Sign Up with Email and Password
export async function registerWithEmail(email: string, password: string, fullName?: string) {
  const supabase = await getSupabaseClient();
  if (!supabase) throw new Error('Supabase is not configured. Please check environment variables.');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || email.split('@')[0]
      }
    }
  });

  if (error) throw error;
  return data;
}

// 2. Sign In with Email and Password
export async function loginWithEmail(email: string, password: string) {
  const supabase = await getSupabaseClient();
  if (!supabase) throw new Error('Supabase is not configured. Please check environment variables.');

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

// 3. Sign In with Google OAuth
export async function loginWithGoogle() {
  const supabase = await getSupabaseClient();
  if (!supabase) throw new Error('Supabase is not configured. Please check environment variables.');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });

  if (error) throw error;
  return data;
}

// 4. Sign Out
export async function logoutUser() {
  const supabase = await getSupabaseClient();
  if (!supabase) return;

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// 5. Send Password Reset Email
export async function sendPasswordResetEmail(email: string) {
  const supabase = await getSupabaseClient();
  if (!supabase) throw new Error('Supabase is not configured. Please check environment variables.');

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}?mode=reset-password`
  });

  if (error) throw error;
  return data;
}

// 6. Update User Password (after clicking reset link or from profile)
export async function updateUserPassword(newPassword: string) {
  const supabase = await getSupabaseClient();
  if (!supabase) throw new Error('Supabase is not configured. Please check environment variables.');

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) throw error;
  return data;
}

// 7. Get Current Session
export async function getCurrentSession(): Promise<Session | null> {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;

  const { data } = await supabase.auth.getSession();
  return data.session;
}

// 8. Fetch User Profile from public.user_profiles table
export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.warn('[Supabase] Could not fetch user_profile (table might need migration):', error.message);
    return null;
  }
  return data as UserProfile;
}

// 9. Update User Profile in public.user_profiles
export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<boolean> {
  const supabase = await getSupabaseClient();
  if (!supabase) return false;

  const { error } = await supabase
    .from('user_profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  if (error) {
    console.error('[Supabase] Failed to update user profile:', error);
    return false;
  }
  return true;
}
