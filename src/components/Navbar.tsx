import React, { useState } from 'react';
import { 
  Sparkles, 
  Lock, 
  Menu, 
  X, 
  Tv, 
  Phone,
  Sun,
  Moon,
  Orbit,
  UserCheck
} from 'lucide-react';
import { BackgroundTheme } from '../types/portfolio';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
  onOpenAiChat: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn?: boolean;
  backgroundTheme: BackgroundTheme;
  onSelectBackgroundTheme: (theme: BackgroundTheme) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenAiChat,
  onOpenAdmin,
  isAdminLoggedIn = false,
  backgroundTheme,
  onSelectBackgroundTheme
}) => {
  const { user, isAdmin: isAuthAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLight = backgroundTheme === 'light';
  const hasActiveSession = Boolean(user || isAuthAdmin || isAdminLoggedIn);

  const navLinks = [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT', id: 'about' },
    { label: 'SKILLS', id: 'skills' },
    { label: 'PROJECTS', id: 'projects' },
    { label: 'LEARNING', id: 'learning' },
    { label: 'DASHBOARD', id: 'dashboard' },
    { label: 'HACKATHONS', id: 'hackathons' },
    { label: 'CERTIFICATES', id: 'certificates' },
    { label: 'CONTACT', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md py-3 shadow-xl transition-colors duration-300 ${
          isLight
            ? 'bg-white/95 border-b border-emerald-500/20 shadow-slate-200/50 text-slate-800'
            : 'bg-[#030907]/95 border-b border-emerald-500/30 shadow-black/60 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo / Brand with Emerald Green Gradient */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 font-black font-mono text-lg shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col">
              <span
                className={`font-heading font-extrabold text-base tracking-widest transition-colors ${
                  isLight ? 'text-slate-900 group-hover:text-emerald-600' : 'text-white group-hover:text-emerald-400'
                }`}
              >
                ADITHYAN
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold tracking-wider">
                AI & DATA SCIENCE
              </span>
            </div>
          </button>

          {/* Desktop Navigation Pages */}
          <nav
            className={`hidden xl:flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-md ${
              isLight
                ? 'bg-slate-100/90 border-slate-200'
                : 'bg-slate-900/90 border-slate-700/80'
            }`}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                  currentPage === link.id
                    ? isLight
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/60 shadow-sm shadow-emerald-500/20'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-200'
                    : 'text-slate-200 hover:text-white hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            
            {/* Quick Call Button with Phone Icon */}
            <a
              href="tel:+919659007117"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shadow-sm cursor-pointer ${
                isLight
                  ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300'
                  : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
              }`}
              title="Call Adithyan directly: +91 9659007117"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
              <span>9659007117</span>
            </a>

            {/* 3-Mode Background Switcher: 3D | Normal Dark | Clean Light */}
            <div
              className={`flex items-center p-0.5 rounded-lg border text-xs font-mono ${
                isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-900 border-slate-700'
              }`}
            >
              {/* 3D Option */}
              <button
                onClick={() => onSelectBackgroundTheme('3d')}
                className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer font-bold ${
                  backgroundTheme === '3d'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="3D Universe Animated Cosmos"
              >
                <Orbit className="w-3 h-3" />
                <span className="hidden lg:inline text-[11px]">3D</span>
              </button>

              {/* Normal Dark Option */}
              <button
                onClick={() => onSelectBackgroundTheme('dark-simple')}
                className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer font-bold ${
                  backgroundTheme === 'dark-simple'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Normal Simple Dark Background"
              >
                <Moon className="w-3 h-3" />
                <span className="hidden lg:inline text-[11px]">Normal</span>
              </button>

              {/* Clean Light Option */}
              <button
                onClick={() => onSelectBackgroundTheme('light')}
                className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer font-bold ${
                  backgroundTheme === 'light'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Light Colour Plain Background"
              >
                <Sun className="w-3 h-3" />
                <span className="hidden lg:inline text-[11px]">Light</span>
              </button>
            </div>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiChat}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                isLight
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40'
              }`}
              title="Launch AI Digital Twin"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden sm:inline">AI Twin</span>
            </button>

            {/* Admin / User Portal Button */}
            <button
              onClick={onOpenAdmin}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                hasActiveSession
                  ? 'bg-emerald-500 text-slate-950 border-emerald-500 font-bold shadow-sm shadow-emerald-500/20'
                  : isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700'
              }`}
              title={user ? `Signed in as ${user.email}` : 'Access Portal'}
            >
              {hasActiveSession ? <UserCheck className="w-3.5 h-3.5 text-slate-950" /> : <Lock className="w-3.5 h-3.5 text-emerald-500" />}
              <span className="hidden md:inline">
                {user ? (isAuthAdmin ? 'Admin' : 'Account') : hasActiveSession ? 'Admin Active' : 'Portal'}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`xl:hidden p-2 rounded-lg border cursor-pointer ${
                isLight
                  ? 'bg-slate-100 text-slate-800 border-slate-300'
                  : 'bg-slate-900/80 text-white border-slate-700'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-40 xl:hidden backdrop-blur-xl pt-24 px-6 pb-12 flex flex-col justify-between overflow-y-auto ${
            isLight ? 'bg-white/98 text-slate-900' : 'bg-slate-950/98 text-white'
          }`}
        >
          <div className="flex flex-col gap-2">
            <div
              className={`text-xs font-mono pb-2 border-b tracking-wider flex items-center justify-between font-bold ${
                isLight ? 'text-emerald-700 border-slate-200' : 'text-emerald-400 border-slate-800'
              }`}
            >
              <span>PAGES MATRIX //</span>
              <span className="text-[11px] text-slate-500">SELECT PAGE</span>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-3 px-4 rounded-xl text-sm font-mono tracking-wider flex items-center justify-between transition-colors text-left cursor-pointer font-bold ${
                  currentPage === link.id
                    ? isLight
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : isLight
                    ? 'text-slate-700 hover:bg-slate-100'
                    : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-emerald-500">→</span>
              </button>
            ))}
          </div>

          <div className={`pt-6 border-t flex flex-col gap-3 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
            
            {/* Phone Button */}
            <a
              href="tel:+919659007117"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4 stroke-[2.5]" />
              <span>Call +91 9659007117</span>
            </a>

            {/* Mobile 3-way Background Switcher */}
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800">
              <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                BACKGROUND STYLE:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => {
                    onSelectBackgroundTheme('3d');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-2 rounded-lg text-xs font-mono font-bold flex flex-col items-center justify-center gap-1 ${
                    backgroundTheme === '3d'
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Orbit className="w-4 h-4" />
                  <span>3D Cosmos</span>
                </button>

                <button
                  onClick={() => {
                    onSelectBackgroundTheme('dark-simple');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-2 rounded-lg text-xs font-mono font-bold flex flex-col items-center justify-center gap-1 ${
                    backgroundTheme === 'dark-simple'
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span>Normal</span>
                </button>

                <button
                  onClick={() => {
                    onSelectBackgroundTheme('light');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-2 rounded-lg text-xs font-mono font-bold flex flex-col items-center justify-center gap-1 ${
                    backgroundTheme === 'light'
                      ? 'bg-emerald-600 text-white font-black'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span>Light</span>
                </button>
              </div>
            </div>

            {/* AI Assistant Button */}
            <button
              onClick={() => {
                onOpenAiChat();
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer ${
                isLight
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Consult AI Assistant</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
