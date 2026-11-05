import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { 
  getSupabaseClient, 
  getSupabaseConfig, 
  registerWithEmail, 
  loginWithEmail, 
  loginWithGoogle, 
  logoutUser, 
  sendPasswordResetEmail, 
  updateUserPassword, 
  fetchUserProfile, 
  UserProfile 
} from '../lib/supabaseClient';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  supabaseConfigured: boolean;
  supabaseUrl: string;
  error: string | null;
  register: (email: string, password: string, fullName?: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  loginGoogle: () => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
  changePassword: (newPassword: string) => Promise<any>;
  refreshProfile: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Check if current user is Master Admin (Adithyan)
  const isAdmin = Boolean(
    (user && (user.email === 'adithyanadhi2998@gmail.com' || profile?.role === 'admin')) ||
    (typeof window !== 'undefined' && localStorage.getItem('adithyan_admin_token'))
  );

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;

    async function initAuth() {
      try {
        const config = await getSupabaseConfig();
        setSupabaseConfigured(config.configured);
        setSupabaseUrl(config.supabaseUrl);

        if (!config.configured) {
          setLoading(false);
          return;
        }

        const supabase = await getSupabaseClient();
        if (!supabase) {
          setLoading(false);
          return;
        }

        // 1. Get initial session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          const userProf = await fetchUserProfile(currentSession.user.id);
          setProfile(userProf);
        }

        // 2. Listen for auth changes (login, logout, token refresh, OAuth callback)
        const { data } = supabase.auth.onAuthStateChange(async (event, newSession) => {
          setSession(newSession);
          setUser(newSession?.user ?? null);

          if (newSession?.user) {
            const userProf = await fetchUserProfile(newSession.user.id);
            setProfile(userProf);
          } else {
            setProfile(null);
          }
          setLoading(false);
        });

        subscription = data.subscription;
      } catch (err: any) {
        console.error('[AuthContext] Initialization error:', err);
        setError(err.message || 'Auth initialization failed');
      } finally {
        setLoading(false);
      }
    }

    initAuth();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const refreshProfile = async () => {
    if (!user) return;
    const prof = await fetchUserProfile(user.id);
    setProfile(prof);
  };

  const clearError = () => setError(null);

  const register = async (email: string, password: string, fullName?: string) => {
    setError(null);
    try {
      const res = await registerWithEmail(email, password, fullName);
      return res;
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const res = await loginWithEmail(email, password);
      return res;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  const loginGoogle = async () => {
    setError(null);
    try {
      return await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google authentication failed');
      throw err;
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await logoutUser();
      localStorage.removeItem('adithyan_admin_token');
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (err: any) {
      setError(err.message || 'Logout failed');
    }
  };

  const resetPassword = async (email: string) => {
    setError(null);
    try {
      return await sendPasswordResetEmail(email);
    } catch (err: any) {
      setError(err.message || 'Failed to send password reset email');
      throw err;
    }
  };

  const changePassword = async (newPassword: string) => {
    setError(null);
    try {
      return await updateUserPassword(newPassword);
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isAdmin,
        loading,
        supabaseConfigured,
        supabaseUrl,
        error,
        register,
        login,
        loginGoogle,
        logout,
        resetPassword,
        changePassword,
        refreshProfile,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
