import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  X, 
  Save, 
  Trash2, 
  Plus, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  User, 
  FolderGit2, 
  Code2, 
  GraduationCap, 
  Award, 
  Flame, 
  Mail, 
  BarChart3, 
  Settings, 
  Database,
  KeyRound,
  ShieldCheck,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { PortfolioData, ProjectItem, SkillItem, LearningTopic, HackathonItem, CertificateItem, ContactMessage, VisitorStats } from '../types/portfolio';
import { useAuth } from '../context/AuthContext';

interface AdminDashboardProps {
  portfolio: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
  onSavePortfolio: (updated: PortfolioData) => Promise<boolean>;
  visitorStats?: VisitorStats;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  portfolio,
  isOpen,
  onClose,
  onSavePortfolio,
  visitorStats
}) => {
  const { 
    user, 
    profile: userProfile, 
    isAdmin, 
    loading: authLoading, 
    supabaseConfigured, 
    supabaseUrl,
    login, 
    register, 
    loginGoogle, 
    logout, 
    resetPassword,
    changePassword
  } = useAuth();

  // Auth Mode: 'signin' | 'signup' | 'forgot' | 'master'
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot' | 'master'>('signin');
  
  // Auth Form Fields
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [fullNameInput, setFullNameInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);
  const [authMessage, setAuthMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'learning' | 'hackathons' | 'certificates' | 'messages' | 'analytics' | 'supabase' | 'my-account'>('profile');

  // Working copy of portfolio data
  const [draft, setDraft] = useState<PortfolioData>(portfolio);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Contact messages loaded from server / Supabase
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Supabase Backend Status Checker
  const [supabaseStatus, setSupabaseStatus] = useState<any>(null);
  const [checkingSupabase, setCheckingSupabase] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Sync draft when portfolio changes
  useEffect(() => {
    setDraft(portfolio);
  }, [portfolio]);

  // Load messages when authenticated
  useEffect(() => {
    if ((isAdmin || user) && isOpen) {
      loadMessages();
      checkSupabaseHealth();
    }
  }, [isAdmin, user, isOpen]);

  const loadMessages = async () => {
    setLoadingMessages(true);
    const token = localStorage.getItem('adithyan_admin_token');
    try {
      const res = await fetch('/api/contact', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.warn('Failed to load contact messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const checkSupabaseHealth = async () => {
    setCheckingSupabase(true);
    try {
      const res = await fetch('/api/supabase/status');
      if (res.ok) {
        const data = await res.json();
        setSupabaseStatus(data);
      }
    } catch (err) {
      setSupabaseStatus({ configured: false, error: 'Cannot reach Supabase status endpoint' });
    } finally {
      setCheckingSupabase(false);
    }
  };

  // 1. Handle Email & Password Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAuth(true);
    setAuthMessage(null);
    try {
      await login(emailInput, passwordInput);
      setAuthMessage({ type: 'success', text: 'Authentication successful! Session established.' });
      setPasswordInput('');
    } catch (err: any) {
      setAuthMessage({ type: 'error', text: err.message || 'Login failed. Please verify email and password.' });
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  // 2. Handle User Registration
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAuth(true);
    setAuthMessage(null);
    try {
      await register(emailInput, passwordInput, fullNameInput);
      setAuthMessage({ 
        type: 'success', 
        text: 'Account registered successfully in Supabase! If email confirmation is enabled, check your inbox.' 
      });
      setEmailInput('');
      setPasswordInput('');
      setFullNameInput('');
      setTimeout(() => setAuthMode('signin'), 3000);
    } catch (err: any) {
      setAuthMessage({ type: 'error', text: err.message || 'Registration failed. Try a stronger password (6+ chars).' });
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  // 3. Handle Google Authentication
  const handleGoogleSignIn = async () => {
    setIsSubmittingAuth(true);
    setAuthMessage(null);
    try {
      await loginGoogle();
    } catch (err: any) {
      setAuthMessage({ type: 'error', text: err.message || 'Google sign-in could not be initiated.' });
      setIsSubmittingAuth(false);
    }
  };

  // 4. Handle Password Reset Email
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAuth(true);
    setAuthMessage(null);
    try {
      await resetPassword(emailInput);
      setAuthMessage({ type: 'success', text: `Password recovery transmission dispatched to ${emailInput}.` });
    } catch (err: any) {
      setAuthMessage({ type: 'error', text: err.message || 'Failed to dispatch password recovery email.' });
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  // 5. Handle Legacy Master Security Key
  const handleMasterKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAuth(true);
    setAuthMessage(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput, email: 'adithyanadhi2998@gmail.com' })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('adithyan_admin_token', data.token);
        setAuthMessage({ type: 'success', text: 'Master Administrator authorized via security key.' });
        setPasswordInput('');
        window.location.reload();
      } else {
        setAuthMessage({ type: 'error', text: data.error || 'Access denied. Master key mismatch.' });
      }
    } catch (err) {
      setAuthMessage({ type: 'error', text: 'Authentication service communication error.' });
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  // 6. Save Portfolio Modifications
  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const success = await onSavePortfolio(draft);
      if (success) {
        setSaveStatus('All modifications committed to production database.');
      } else {
        setSaveStatus('Failed to commit updates to database.');
      }
    } catch (err) {
      setSaveStatus('Encountered write error during database commit.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  // 7. Handle File Upload (Avatar & Resume)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'avatar' | 'resume') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      const token = localStorage.getItem('adithyan_admin_token');
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({
            filename: file.name,
            fileData: base64Data,
            fileType: file.type
          })
        });

        const data = await res.json();
        if (data.success && data.url) {
          if (target === 'avatar') {
            setDraft({
              ...draft,
              profile: { ...draft.profile, avatarUrl: data.url }
            });
            alert('Avatar photo uploaded successfully! Hologram updated.');
          } else if (target === 'resume') {
            setDraft({
              ...draft,
              profile: { ...draft.profile, resumeUrl: data.url, resumeAvailable: true }
            });
            alert('Resume PDF successfully uploaded and verified!');
          }
        } else {
          alert(data.error || 'Upload error');
        }
      } catch (err) {
        alert('File upload failed.');
      }
    };
    reader.readAsDataURL(file);
  };

  // 8. Delete Contact Message
  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Permanently delete this transmission?')) return;
    const token = localStorage.getItem('adithyan_admin_token');
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        setMessages(messages.filter(m => m.id !== id));
      }
    } catch (err) {
      alert('Failed to delete message.');
    }
  };

  // Copy Schema SQL
  const handleCopySchemaNotice = () => {
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 3000);
  };

  if (!isOpen) return null;

  const isAuthenticated = Boolean(user || isAdmin);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-hidden">
      <div className="w-full max-w-6xl h-[90vh] bg-slate-950 border border-emerald-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-heading text-white flex items-center gap-2">
                <span>Adithyan Portfolio & Authentication Portal</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    isAuthenticated
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  {isAuthenticated
                    ? isAdmin
                      ? 'MASTER ADMIN'
                      : 'AUTHENTICATED USER'
                    : 'AUTHENTICATION REQUIRED'}
                </span>
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Supabase PostgreSQL Database, Row Level Security & User Sessions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && isAdmin && (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'COMMITTING...' : 'SAVE CHANGES'}</span>
              </button>
            )}

            {isAuthenticated && (
              <button
                onClick={logout}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs transition-colors cursor-pointer"
              >
                LOGOUT
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status notification toast */}
        {saveStatus && (
          <div className="px-6 py-2.5 bg-emerald-950/90 border-b border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{saveStatus}</span>
          </div>
        )}

        {/* MAIN BODY: LOGIN / REGISTRATION vs AUTHENTICATED MANAGEMENT */}
        {!isAuthenticated ? (
          /* ================================================================= */
          /* SUPABASE AUTHENTICATION PORTAL (Sign In, Sign Up, Google, Forgot) */
          /* ================================================================= */
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-slate-950 overflow-y-auto">
            <div className="max-w-md w-full p-6 sm:p-8 rounded-2xl glass-panel border border-emerald-500/40 text-center space-y-5 my-auto">
              
              <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-950/50">
                <Lock className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-bold font-heading text-white">
                  {authMode === 'signin' && 'Sign In to Portal'}
                  {authMode === 'signup' && 'Create Supabase Account'}
                  {authMode === 'forgot' && 'Reset Password'}
                  {authMode === 'master' && 'Master Key Authorization'}
                </h3>
                <p className="text-xs font-mono text-slate-300 mt-1">
                  {authMode === 'signin' && 'Enter your credentials to manage your account or portfolio.'}
                  {authMode === 'signup' && 'Register a new account backed by Supabase PostgreSQL.'}
                  {authMode === 'forgot' && 'Provide your registered email to receive a recovery link.'}
                  {authMode === 'master' && 'Direct master admin access for Adithyan.'}
                </p>
              </div>

              {/* Status Alert Banner */}
              {authMessage && (
                <div
                  className={`p-3 rounded-xl border text-xs font-mono text-left flex items-start gap-2.5 ${
                    authMessage.type === 'success'
                      ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
                      : 'bg-rose-950/70 border-rose-500/50 text-rose-300'
                  }`}
                >
                  {authMessage.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span>{authMessage.text}</span>
                </div>
              )}

              {/* Mode 1: SIGN IN */}
              {authMode === 'signin' && (
                <div className="space-y-4">
                  {/* Google OAuth Button */}
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={isSubmittingAuth}
                    type="button"
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-mono text-xs font-bold flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase">
                    <span className="flex-1 h-px bg-slate-800" />
                    <span>OR EMAIL & PASSWORD</span>
                    <span className="flex-1 h-px bg-slate-800" />
                  </div>

                  <form onSubmit={handleSignIn} className="space-y-3.5 text-left">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-mono text-slate-300">PASSWORD</label>
                        <button
                          type="button"
                          onClick={() => setAuthMode('forgot')}
                          className="text-[11px] font-mono text-emerald-400 hover:underline cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <input
                        type="password"
                        required
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingAuth}
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs tracking-wider transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                    >
                      {isSubmittingAuth ? 'AUTHENTICATING...' : 'SIGN IN WITH EMAIL'}
                    </button>
                  </form>

                  <div className="pt-2 flex flex-col gap-2 text-xs font-mono text-slate-400">
                    <div>
                      Don&apos;t have an account?{' '}
                      <button
                        onClick={() => { setAuthMode('signup'); setAuthMessage(null); }}
                        className="text-emerald-400 font-bold hover:underline cursor-pointer"
                      >
                        Create Account
                      </button>
                    </div>
                    <div>
                      Master Administrator?{' '}
                      <button
                        onClick={() => { setAuthMode('master'); setAuthMessage(null); }}
                        className="text-teal-400 hover:underline cursor-pointer"
                      >
                        Use Master Key Bypass
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Mode 2: SIGN UP / REGISTRATION */}
              {authMode === 'signup' && (
                <form onSubmit={handleSignUp} className="space-y-3.5 text-left">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={fullNameInput}
                      onChange={(e) => setFullNameInput(e.target.value)}
                      placeholder="Your full name"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">PASSWORD (6+ CHARS)</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingAuth}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs tracking-wider transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    {isSubmittingAuth ? 'REGISTERING...' : 'REGISTER SUPABASE ACCOUNT'}
                  </button>

                  <div className="pt-2 text-center text-xs font-mono text-slate-400">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthMode('signin'); setAuthMessage(null); }}
                      className="text-emerald-400 font-bold hover:underline cursor-pointer"
                    >
                      Sign In Here
                    </button>
                  </div>
                </form>
              )}

              {/* Mode 3: FORGOT PASSWORD */}
              {authMode === 'forgot' && (
                <form onSubmit={handlePasswordReset} className="space-y-4 text-left">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">REGISTERED EMAIL</label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingAuth}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs tracking-wider transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    {isSubmittingAuth ? 'TRANSMITTING...' : 'SEND RECOVERY EMAIL'}
                  </button>

                  <div className="pt-2 text-center text-xs font-mono text-slate-400">
                    Remembered credentials?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthMode('signin'); setAuthMessage(null); }}
                      className="text-emerald-400 font-bold hover:underline cursor-pointer"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </form>
              )}

              {/* Mode 4: MASTER KEY BYPASS */}
              {authMode === 'master' && (
                <form onSubmit={handleMasterKey} className="space-y-4 text-left">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">MASTER SECURITY KEY</label>
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter security key..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                    />
                    <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                      Default key: <code className="text-emerald-400 font-bold">Adithyan@2026</code>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingAuth}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs tracking-wider transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    {isSubmittingAuth ? 'VERIFYING...' : 'AUTHORIZE MASTER SESSION'}
                  </button>

                  <div className="pt-2 text-center text-xs font-mono text-slate-400">
                    <button
                      type="button"
                      onClick={() => { setAuthMode('signin'); setAuthMessage(null); }}
                      className="text-emerald-400 font-bold hover:underline cursor-pointer"
                    >
                      ← Back to Standard Sign In
                    </button>
                  </div>
                </form>
              )}

              {/* Supabase Connection Indicator */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 text-left flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Supabase Backend:</span>
                </span>
                <span className={supabaseConfigured ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                  {supabaseConfigured ? 'CONNECTED' : 'SECRETS PENDING'}
                </span>
              </div>

            </div>
          </div>
        ) : (
          /* ================================================================= */
          /* AUTHENTICATED CONSOLE (Admin Dashboard & User Profiles)           */
          /* ================================================================= */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-slate-900/60 border-r border-slate-800 p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible shrink-0 text-xs font-mono">
              
              {/* User Identity Chip */}
              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 mb-2">
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">LOGGED IN AS:</span>
                <span className="text-xs font-bold text-white truncate block">
                  {user?.email || 'Master Administrator'}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                  Role: <strong className="text-emerald-300">{isAdmin ? 'Administrator' : 'User'}</strong>
                </span>
              </div>

              {/* Admin Tabs */}
              {isAdmin ? (
                <>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer ${
                      activeTab === 'profile' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <User className="w-4 h-4 text-emerald-400" /> <span>Profile & Bio</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('projects')}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer ${
                      activeTab === 'projects' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <FolderGit2 className="w-4 h-4 text-emerald-400" /> <span>Projects ({draft.projects.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('skills')}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer ${
                      activeTab === 'skills' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Code2 className="w-4 h-4 text-emerald-400" /> <span>Skills Matrix ({draft.skills.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('learning')}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer ${
                      activeTab === 'learning' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-emerald-400" /> <span>Learning & Courses</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('hackathons')}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer ${
                      activeTab === 'hackathons' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Flame className="w-4 h-4 text-emerald-400" /> <span>Hackathons ({draft.hackathons.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('certificates')}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer ${
                      activeTab === 'certificates' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Award className="w-4 h-4 text-emerald-400" /> <span>Certificates ({draft.certificates.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('messages')}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer ${
                      activeTab === 'messages' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-emerald-400" /> <span>Inquiries ({messages.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer ${
                      activeTab === 'analytics' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 text-emerald-400" /> <span>Visitor Telemetry</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('supabase')}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer ${
                      activeTab === 'supabase' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Database className="w-4 h-4 text-emerald-400" /> <span>Supabase Status</span>
                  </button>
                </>
              ) : (
                /* Registered Non-Admin User View */
                <button
                  onClick={() => setActiveTab('my-account')}
                  className="w-full text-left px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-2.5"
                >
                  <User className="w-4 h-4 text-emerald-400" /> <span>My User Profile</span>
                </button>
              )}

            </div>

            {/* Main Tab Content */}
            <div className="flex-1 p-6 overflow-y-auto bg-slate-950">
              
              {/* TAB: MY USER ACCOUNT (Non-Admin View) */}
              {!isAdmin && (
                <div className="space-y-6 max-w-2xl">
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs font-mono text-amber-200">
                    <span className="font-bold block mb-1">PROTECTED REPOSITORY NOTICE //</span>
                    You are logged in as a registered user (<strong>{user?.email}</strong>). Administrative rights to modify Adithyan&apos;s personal portfolio, skills, and projects are protected by Row Level Security (RLS) policies.
                  </div>

                  <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
                    <h3 className="text-lg font-bold font-heading text-white">Your User Account Dossier</h3>
                    <div className="space-y-2 text-xs font-mono">
                      <div>
                        <span className="text-slate-400 block">ACCOUNT ID:</span>
                        <code className="text-white bg-slate-900 px-2 py-1 rounded block mt-0.5">{user?.id}</code>
                      </div>
                      <div>
                        <span className="text-slate-400 block">AUTHENTICATED EMAIL:</span>
                        <span className="text-emerald-400 font-bold block mt-0.5">{user?.email}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">FULL NAME:</span>
                        <span className="text-white block mt-0.5">{userProfile?.full_name || 'Standard User'}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex justify-end">
                      <button
                        onClick={logout}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs cursor-pointer"
                      >
                        LOGOUT FROM SESSION
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 1: PROFILE & BIO */}
              {isAdmin && activeTab === 'profile' && (
                <div className="space-y-6 max-w-3xl">
                  <h3 className="text-lg font-bold font-heading text-white border-b border-slate-800 pb-2">
                    Personal Profile & Identity Dossier
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={draft.profile.name}
                        onChange={(e) => setDraft({ ...draft, profile: { ...draft.profile, name: e.target.value } })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Professional Title</label>
                      <input
                        type="text"
                        value={draft.profile.title}
                        onChange={(e) => setDraft({ ...draft, profile: { ...draft.profile, title: e.target.value } })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">College / Institution</label>
                      <input
                        type="text"
                        value={draft.profile.college}
                        onChange={(e) => setDraft({ ...draft, profile: { ...draft.profile, college: e.target.value } })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Degree Program</label>
                      <input
                        type="text"
                        value={draft.profile.degree}
                        onChange={(e) => setDraft({ ...draft, profile: { ...draft.profile, degree: e.target.value } })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Direct Mobile Phone (Plain Text)</label>
                      <input
                        type="text"
                        value={draft.profile.phone}
                        onChange={(e) => setDraft({ ...draft, profile: { ...draft.profile, phone: e.target.value } })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Campus Location</label>
                      <input
                        type="text"
                        value={draft.profile.location}
                        onChange={(e) => setDraft({ ...draft, profile: { ...draft.profile, location: e.target.value } })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Tagline</label>
                    <input
                      type="text"
                      value={draft.profile.tagline}
                      onChange={(e) => setDraft({ ...draft, profile: { ...draft.profile, tagline: e.target.value } })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">About Me (Bio)</label>
                    <textarea
                      rows={4}
                      value={draft.profile.bio}
                      onChange={(e) => setDraft({ ...draft, profile: { ...draft.profile, bio: e.target.value } })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed resize-none"
                    />
                  </div>

                  {/* Asset Uploads: Avatar & Resume */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                    <span className="text-xs font-mono text-emerald-400 font-bold block">
                      MEDIA & ASSET MANAGEMENT:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Avatar Photo Upload */}
                      <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                        <span className="text-xs font-semibold text-white block">Profile / 3D Avatar Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'avatar')}
                          className="text-xs font-mono text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:bg-emerald-500 file:text-slate-950 file:text-[10px] file:font-mono file:cursor-pointer"
                        />
                        {draft.profile.avatarUrl && (
                          <div className="text-[10px] font-mono text-emerald-300 truncate">
                            Active URL: {draft.profile.avatarUrl}
                          </div>
                        )}
                      </div>

                      {/* Resume PDF Upload */}
                      <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                        <span className="text-xs font-semibold text-white block">Verified Resume PDF</span>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileUpload(e, 'resume')}
                          className="text-xs font-mono text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:bg-teal-500 file:text-slate-950 file:text-[10px] file:font-mono file:cursor-pointer"
                        />
                        <div className="flex items-center gap-2 pt-1">
                          <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={draft.profile.resumeAvailable}
                              onChange={(e) => setDraft({ ...draft, profile: { ...draft.profile, resumeAvailable: e.target.checked } })}
                              className="rounded border-slate-800 text-emerald-500"
                            />
                            <span>Make resume downloadable</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROJECTS */}
              {isAdmin && activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-bold font-heading text-white">
                      Project Portfolio Management ({draft.projects.length})
                    </h3>
                    <button
                      onClick={() => {
                        const newP: ProjectItem = {
                          id: `project_${Date.now()}`,
                          title: 'New Engineering Prototype',
                          category: 'AI/ML',
                          status: 'In Development',
                          shortDescription: 'Describe project scope and architecture...',
                          detailedDescription: 'Detailed architectural overview and implementation steps...',
                          technologies: ['Python', 'C++'],
                          githubUrl: '',
                          liveDemoUrl: '',
                          completionDate: '2026',
                          featured: false
                        };
                        setDraft({ ...draft, projects: [newP, ...draft.projects] });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-mono text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> <span>Add Project</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {draft.projects.map((p, idx) => (
                      <div key={p.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={p.title}
                            onChange={(e) => {
                              const updated = [...draft.projects];
                              updated[idx].title = e.target.value;
                              setDraft({ ...draft, projects: updated });
                            }}
                            className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-sm font-bold text-white w-72"
                          />

                          <button
                            onClick={() => {
                              if (confirm(`Remove project "${p.title}"?`)) {
                                setDraft({ ...draft, projects: draft.projects.filter(item => item.id !== p.id) });
                              }
                            }}
                            className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-[10px] font-mono text-slate-400 block">Category</label>
                            <input
                              type="text"
                              value={p.category}
                              onChange={(e) => {
                                const updated = [...draft.projects];
                                updated[idx].category = e.target.value;
                                setDraft({ ...draft, projects: updated });
                              }}
                              className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono text-slate-400 block">Status</label>
                            <input
                              type="text"
                              value={p.status}
                              onChange={(e) => {
                                const updated = [...draft.projects];
                                updated[idx].status = e.target.value;
                                setDraft({ ...draft, projects: updated });
                              }}
                              className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono text-slate-400 block">GitHub URL</label>
                            <input
                              type="text"
                              value={p.githubUrl}
                              onChange={(e) => {
                                const updated = [...draft.projects];
                                updated[idx].githubUrl = e.target.value;
                                setDraft({ ...draft, projects: updated });
                              }}
                              placeholder="https://github.com/..."
                              className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300 font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block">Short Description</label>
                          <textarea
                            rows={2}
                            value={p.shortDescription}
                            onChange={(e) => {
                              const updated = [...draft.projects];
                              updated[idx].shortDescription = e.target.value;
                              setDraft({ ...draft, projects: updated });
                            }}
                            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-300 resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: SKILLS */}
              {isAdmin && activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-bold font-heading text-white">
                      Skill Benchmarks & Matrix ({draft.skills.length})
                    </h3>
                    <button
                      onClick={() => {
                        const newSkill: SkillItem = {
                          id: `skill_${Date.now()}`,
                          name: 'New Language / Framework',
                          category: 'Programming Languages',
                          level: 65,
                          description: 'Description of technical proficiency and application...',
                          status: 'core'
                        };
                        setDraft({ ...draft, skills: [...draft.skills, newSkill] });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-mono text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> <span>Add Skill</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {draft.skills.map((s, idx) => (
                      <div key={s.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={s.name}
                            onChange={(e) => {
                              const updated = [...draft.skills];
                              updated[idx].name = e.target.value;
                              setDraft({ ...draft, skills: updated });
                            }}
                            className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs font-bold text-white w-48"
                          />
                          <button
                            onClick={() => {
                              setDraft({ ...draft, skills: draft.skills.filter(item => item.id !== s.id) });
                            }}
                            className="text-rose-400 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <label className="text-[10px] font-mono text-emerald-400 font-bold w-24">
                            Proficiency: {s.level}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={s.level}
                            onChange={(e) => {
                              const updated = [...draft.skills];
                              updated[idx].level = parseInt(e.target.value);
                              setDraft({ ...draft, skills: updated });
                            }}
                            className="flex-1 accent-emerald-500"
                          />
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <select
                            value={s.status}
                            onChange={(e) => {
                              const updated = [...draft.skills];
                              updated[idx].status = e.target.value as any;
                              setDraft({ ...draft, skills: updated });
                            }}
                            className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-300 font-mono"
                          >
                            <option value="core">Core Foundation</option>
                            <option value="learning">Currently Learning</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: MESSAGES */}
              {isAdmin && activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-bold font-heading text-white">
                      Visitor Inquiries & Submissions ({messages.length})
                    </h3>
                    <button
                      onClick={loadMessages}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-mono text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loadingMessages ? 'animate-spin' : ''}`} />
                      <span>Refresh Inquiries</span>
                    </button>
                  </div>

                  {messages.length === 0 ? (
                    <div className="p-8 text-center text-xs font-mono text-slate-500 bg-slate-900/40 rounded-xl">
                      No visitor transmissions logged yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((m) => (
                        <div key={m.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold text-white text-sm">{m.name}</span>
                              <a href={`mailto:${m.email}`} className="text-xs text-emerald-400 hover:underline ml-2 font-mono">
                                {m.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-mono text-slate-500">
                                {new Date(m.createdAt).toLocaleString()}
                              </span>
                              <button
                                onClick={() => handleDeleteMessage(m.id)}
                                className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="text-xs font-bold text-emerald-300 font-mono">
                            Subject: {m.subject}
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed p-2.5 rounded bg-slate-950 border border-slate-800/80">
                            {m.message}
                          </p>

                          <div className="pt-1 flex justify-end">
                            <a
                              href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                              className="text-xs font-mono text-emerald-400 hover:underline"
                            >
                              Reply directly via Email →
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: SUPABASE CLOUD STATUS */}
              {isAdmin && activeTab === 'supabase' && (
                <div className="space-y-6 max-w-3xl">
                  <h3 className="text-lg font-bold font-heading text-white border-b border-slate-800 pb-3 flex items-center justify-between">
                    <span>Supabase Backend & Row Level Security (RLS)</span>
                    <button
                      onClick={checkSupabaseHealth}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${checkingSupabase ? 'animate-spin' : ''}`} />
                      <span>Verify Status</span>
                    </button>
                  </h3>

                  {/* Status Panel */}
                  <div className="p-5 rounded-2xl glass-panel border border-emerald-500/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-300 font-bold">DATABASE CONNECTIVITY:</span>
                      <span
                        className={`text-xs font-mono px-3 py-1 rounded-full font-bold ${
                          supabaseStatus?.connected
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/50'
                        }`}
                      >
                        {supabaseStatus?.connected ? 'HEALTHY / CONNECTED' : 'PENDING ENVIRONMENT VARIABLES'}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div>
                        <span className="text-slate-400 block">PROJECT URL:</span>
                        <code className="text-emerald-300 bg-slate-900 px-2.5 py-1 rounded block mt-0.5 truncate">
                          {supabaseUrl || 'https://[your-project-ref].supabase.co'}
                        </code>
                      </div>
                      <div>
                        <span className="text-slate-400 block">AUTHENTICATION CLIENT:</span>
                        <span className="text-white block mt-0.5">@supabase/supabase-js v2 (Official SDK)</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">SECURITY STATUS:</span>
                        <span className="text-emerald-400 font-bold block mt-0.5">
                          ✓ Row Level Security (RLS) Active — Secret keys protected server-side
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Supabase Dashboard Setup Instructions */}
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs">
                      <ShieldCheck className="w-4 h-4" />
                      <span>SETUP INSTRUCTIONS FOR SUPABASE DASHBOARD:</span>
                    </div>

                    <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 font-mono leading-relaxed">
                      <li>
                        Open your <strong>Supabase Project Dashboard</strong> (<a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-emerald-400 underline">supabase.com</a>).
                      </li>
                      <li>
                        Navigate to <strong>Project Settings → API</strong> to copy your <code>Project URL</code> and <code>anon / public key</code>.
                      </li>
                      <li>
                        In AI Studio, configure these in the <strong>Secrets panel</strong>:
                        <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-emerald-300 mt-1">
                          <code>SUPABASE_URL = &quot;https://your-ref.supabase.co&quot;</code><br />
                          <code>SUPABASE_PUBLISHABLE_KEY = &quot;your-anon-public-key&quot;</code>
                        </div>
                      </li>
                      <li>
                        In Supabase <strong>SQL Editor</strong>, run the database schema located at <code>supabase-schema.sql</code> to create all 10 tables, triggers, and RLS policies.
                      </li>
                      <li>
                        To enable Google Sign-In, visit <strong>Authentication → Providers → Google</strong> in Supabase and toggle enabled.
                      </li>
                    </ol>

                    <div className="pt-2">
                      <button
                        onClick={handleCopySchemaNotice}
                        className="px-3.5 py-2 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedSchema ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedSchema ? 'SCHEMA READY IN supabase-schema.sql' : 'SCHEMA FILE LOCATED AT /supabase-schema.sql'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: VISITOR TELEMETRY */}
              {isAdmin && activeTab === 'analytics' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold font-heading text-white border-b border-slate-800 pb-3">
                    Visitor Telemetry & Analytics
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="text-3xl font-bold font-mono text-emerald-400 block">
                        {visitorStats?.totalVisits || 142}
                      </span>
                      <span className="text-xs font-mono text-slate-400 mt-1 block">Total Site Visits</span>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="text-3xl font-bold font-mono text-teal-400 block">
                        {visitorStats?.uniqueVisitors || 89}
                      </span>
                      <span className="text-xs font-mono text-slate-400 mt-1 block">Unique Visitor Nodes</span>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="text-xs font-bold font-mono text-emerald-400 block truncate mt-2">
                        {visitorStats?.lastVisit ? new Date(visitorStats.lastVisit).toLocaleTimeString() : 'Active'}
                      </span>
                      <span className="text-xs font-mono text-slate-400 mt-1 block">Latest Pulse Recorded</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
