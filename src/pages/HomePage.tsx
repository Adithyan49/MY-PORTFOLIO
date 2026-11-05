import React, { useState } from 'react';
import { 
  ArrowRight, 
  Download, 
  FileText, 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  MessageSquare, 
  Phone,
  Sparkles, 
  Code2, 
  Layers,
  GraduationCap,
  Award,
  Flame,
  LayoutDashboard,
  Tv,
  Globe,
  X,
  ExternalLink,
  ShieldCheck,
  Sun,
  Moon,
  Orbit
} from 'lucide-react';
import { ProfileData, CodingStatsData, BackgroundTheme } from '../types/portfolio';
import { ThreeAvatar } from '../components/ThreeAvatar';

interface HomePageProps {
  profile: ProfileData;
  codingStats: CodingStatsData;
  onNavigate: (pageId: string) => void;
  onOpenAiChat: () => void;
  backgroundTheme: BackgroundTheme;
  onSelectBackgroundTheme: (theme: BackgroundTheme) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  profile,
  codingStats,
  onNavigate,
  onOpenAiChat,
  backgroundTheme,
  onSelectBackgroundTheme
}) => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const isLight = backgroundTheme === 'light';

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (profile.resumeAvailable && profile.resumeUrl) {
      window.open(profile.resumeUrl, '_blank');
    } else {
      setResumeModalOpen(true);
    }
  };

  return (
    <div className="relative pt-24 pb-20 flex flex-col items-center">
      
      {/* Background Radial Glow */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none ${
          isLight ? 'bg-emerald-400/10' : 'bg-emerald-500/15'
        }`}
      />
      <div
        className={`absolute top-1/3 right-10 w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none ${
          isLight ? 'bg-teal-400/10' : 'bg-green-500/10'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Background Switcher Banner with 3 Selectable Modes */}
        <div
          className={`mb-8 p-4 sm:p-5 rounded-2xl border backdrop-blur-md shadow-2xl transition-all ${
            isLight
              ? 'bg-white/95 border-emerald-500/40 shadow-emerald-500/10'
              : 'bg-slate-900/90 border-emerald-500/40 shadow-emerald-950/40'
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            {/* Left Status Indicator */}
            <div className="flex items-center gap-3 text-xs sm:text-sm font-mono">
              <span className={`w-3 h-3 rounded-full animate-pulse ${isLight ? 'bg-emerald-600' : 'bg-emerald-400'}`}></span>
              <span className={isLight ? 'text-slate-700 font-semibold' : 'text-slate-200 font-semibold'}>
                DISPLAY ENVIRONMENT:
              </span>
              <span
                className={`font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                  isLight
                    ? 'text-emerald-800 bg-emerald-100 border border-emerald-300'
                    : 'text-emerald-300 bg-emerald-950 border border-emerald-500/40'
                }`}
              >
                {backgroundTheme === '3d'
                  ? '🌌 3D Futuristic Cosmos'
                  : backgroundTheme === 'dark-simple'
                  ? '🌑 Normal Simple Dark'
                  : '☀️ Plain Light Aesthetic'}
              </span>
            </div>

            {/* Right 3-Way Switcher Buttons */}
            <div
              className={`grid grid-cols-3 gap-1.5 p-1.5 rounded-xl border w-full md:w-auto ${
                isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'
              }`}
            >
              {/* Option 1: 3D Universe */}
              <button
                onClick={() => onSelectBackgroundTheme('3d')}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  backgroundTheme === '3d'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 font-black'
                    : isLight
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Orbit className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>3D Universe</span>
              </button>

              {/* Option 2: Normal Dark Simple */}
              <button
                onClick={() => onSelectBackgroundTheme('dark-simple')}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  backgroundTheme === 'dark-simple'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 font-black'
                    : isLight
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Moon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Normal Dark</span>
              </button>

              {/* Option 3: Plain Light Colour */}
              <button
                onClick={() => onSelectBackgroundTheme('light')}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  backgroundTheme === 'light'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-black'
                    : isLight
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Light Mode</span>
              </button>
            </div>

          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Status Pill */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs sm:text-sm font-mono backdrop-blur-md shadow-md font-semibold ${
                isLight
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-slate-900/95 border-emerald-400/50 text-emerald-300 shadow-emerald-950/60'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full animate-ping ${isLight ? 'bg-emerald-600' : 'bg-emerald-400'}`}></span>
              <span className={`tracking-wide font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                AI & DATA SCIENCE // 1ST YEAR UNDERGRADUATE
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl font-extrabold font-heading tracking-tight uppercase drop-shadow-sm">
                <span className="block text-gradient-emerald">ADITHYAN</span>
              </h1>
              <p
                className={`text-xl sm:text-2xl font-mono font-bold tracking-wide ${
                  isLight ? 'text-emerald-800' : 'text-emerald-300'
                }`}
              >
                {profile.title} <span className={isLight ? 'text-slate-400' : 'text-slate-400'}>|</span>{' '}
                <span className={isLight ? 'text-teal-700' : 'text-cyan-300'}>{profile.subtitle}</span>
              </p>
            </div>

            {/* Tagline Banner */}
            <div
              className={`p-4 rounded-xl border backdrop-blur-sm shadow-sm ${
                isLight ? 'bg-slate-50 border-slate-300' : 'bg-slate-900/90 border-emerald-500/30'
              }`}
            >
              <p
                className={`text-base sm:text-lg font-mono font-bold tracking-wider ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                &ldquo;{profile.tagline}&rdquo;
              </p>
            </div>

            {/* Bio */}
            <p
              className={`text-base sm:text-lg leading-relaxed max-w-2xl font-normal ${
                isLight ? 'text-slate-700' : 'text-slate-100'
              }`}
            >
              {profile.bio}
            </p>

            {/* Prominent Direct Phone Card with Call Button */}
            <div
              className={`w-full p-4 sm:p-5 rounded-2xl border-2 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                isLight
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 border-emerald-400 text-white shadow-emerald-600/20'
                  : 'bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border-emerald-500/60 text-white shadow-emerald-950/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold shadow-lg ${
                    isLight ? 'bg-white text-emerald-800' : 'bg-emerald-500 text-slate-950 shadow-emerald-500/40'
                  }`}
                >
                  <Phone className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <span
                    className={`text-xs font-mono font-bold uppercase tracking-wider block ${
                      isLight ? 'text-emerald-100' : 'text-emerald-300'
                    }`}
                  >
                    DIRECT MOBILE CALL // NO ENCRYPTION:
                  </span>
                  <a
                    href="tel:+919659007117"
                    className="text-2xl sm:text-3xl font-black font-mono text-white hover:text-emerald-200 transition-colors tracking-wider"
                  >
                    +91 9659007117
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href="tel:+919659007117"
                  className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-mono font-black text-xs uppercase tracking-wider text-center transition-all shadow-md cursor-pointer ${
                    isLight
                      ? 'bg-white text-emerald-900 hover:bg-slate-100'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30'
                  }`}
                >
                  Call +91 9659007117
                </a>
                <a
                  href={profile.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isLight
                      ? 'bg-emerald-900/60 hover:bg-emerald-900 text-white border border-emerald-300/40'
                      : 'bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/50'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* College & Location Badge */}
            <div
              className={`flex items-center gap-3 text-xs sm:text-sm font-mono p-3 rounded-xl border ${
                isLight ? 'bg-slate-100 text-slate-800 border-slate-300' : 'bg-slate-900/80 text-slate-200 border-slate-700'
              }`}
            >
              <span className={`font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>COLLEGE:</span>
              <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{profile.college}</span>
              <span className="text-slate-400">•</span>
              <span className={isLight ? 'text-slate-600' : 'text-slate-300'}>{profile.location}</span>
            </div>

            {/* Navigation & Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('projects')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono font-black text-sm tracking-wider flex items-center gap-2 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => onNavigate('skills')}
                className={`px-5 py-3.5 rounded-xl font-mono text-sm font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 text-emerald-800 border border-emerald-400 shadow-sm'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>SKILLS & 3D</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className={`px-5 py-3.5 rounded-xl font-mono text-sm font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 text-teal-800 border border-teal-400 shadow-sm'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40'
                }`}
              >
                <Mail className="w-4 h-4 text-teal-600 dark:text-cyan-400" />
                <span>CONTACT ME</span>
              </button>

              <button
                onClick={handleResumeClick}
                className={`px-4 py-3.5 rounded-xl font-mono text-sm font-bold tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700'
                }`}
                title="Download verified resume"
              >
                <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>RESUME</span>
              </button>
            </div>

            {/* Social Network Link Buttons */}
            <div className="pt-4 space-y-2.5 w-full">
              <span
                className={`text-xs font-mono font-bold uppercase tracking-wider block ${
                  isLight ? 'text-emerald-700' : 'text-emerald-300'
                }`}
              >
                CONNECT DIRECTLY ON VERIFIED NETWORKS //
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                
                {/* WhatsApp */}
                <a
                  href={profile.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl flex items-center gap-2.5 transition-all shadow-md group ${
                    isLight
                      ? 'bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900'
                      : 'bg-[#0a2016] hover:bg-[#0e2c1e] text-emerald-300 border border-emerald-500/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/50">
                    <MessageSquare className="w-4 h-4 fill-current stroke-[2]" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block">CHAT</span>
                    <span className={`text-xs font-bold font-heading ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      WhatsApp
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl flex items-center gap-2.5 transition-all shadow-md group ${
                    isLight
                      ? 'bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-900'
                      : 'bg-[#0a192f] hover:bg-[#0f2444] text-cyan-300 border border-cyan-500/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0077b5] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/50">
                    <Linkedin className="w-4 h-4 fill-current" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-mono block">NETWORK</span>
                    <span className={`text-xs font-bold font-heading ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      LinkedIn
                    </span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl flex items-center gap-2.5 transition-all shadow-md group ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900'
                      : 'bg-[#161b22] hover:bg-[#1f2633] text-slate-200 border border-slate-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <Github className="w-4 h-4 fill-current" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">REPOS</span>
                    <span className={`text-xs font-bold font-heading ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      GitHub
                    </span>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href={profile.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl flex items-center gap-2.5 transition-all shadow-md group ${
                    isLight
                      ? 'bg-pink-50 hover:bg-pink-100 border border-pink-300 text-pink-900'
                      : 'bg-[#220d22] hover:bg-[#301330] text-pink-300 border border-pink-500/40'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-pink-500/50">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-pink-600 dark:text-pink-400 font-mono block">SOCIAL</span>
                    <span className={`text-xs font-bold font-heading ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Instagram
                    </span>
                  </div>
                </a>

                {/* Email Direct */}
                <a
                  href={`mailto:${profile.email}`}
                  className={`p-3 rounded-xl flex items-center gap-2.5 transition-all shadow-md group ${
                    isLight
                      ? 'bg-teal-50 hover:bg-teal-100 border border-teal-300 text-teal-900'
                      : 'bg-[#141d2e] hover:bg-[#1b273d] text-teal-300 border border-teal-500/40'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-teal-500/40">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-teal-600 dark:text-teal-400 font-mono block">INBOX</span>
                    <span className={`text-xs font-bold font-heading ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Email
                    </span>
                  </div>
                </a>

              </div>
            </div>

          </div>

          {/* Right Column: 3D Holographic Avatar */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-3xl blur-2xl pointer-events-none ${
                  isLight
                    ? 'bg-gradient-to-b from-emerald-400/15 via-teal-400/10 to-transparent'
                    : 'bg-gradient-to-b from-emerald-500/25 via-cyan-500/15 to-transparent'
                }`}
              />
              <ThreeAvatar avatarPhotoUrl={profile.avatarUrl} name={profile.name} />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={onOpenAiChat}
                className={`px-4 py-2 rounded-full border text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer ${
                  isLight
                    ? 'bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-400 shadow-emerald-500/10'
                    : 'bg-slate-900/90 border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:bg-emerald-950/60 shadow-emerald-950/50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Ask AI About Adithyan</span>
              </button>
            </div>
          </div>

        </div>

        {/* Dedicated Page Portal Hub */}
        <div className={`mt-16 pt-12 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <div
            className={`text-xs font-mono font-bold tracking-wider mb-6 ${
              isLight ? 'text-emerald-700' : 'text-emerald-400'
            }`}
          >
            DEDICATED PORTFOLIO SECTIONS // SELECT TO EXPLORE:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <button
              onClick={() => onNavigate('about')}
              className={`p-5 rounded-2xl glass-panel transition-all text-left group cursor-pointer hover:-translate-y-1 ${
                isLight ? 'border-slate-200 hover:border-emerald-500 bg-white' : 'border-slate-800 hover:border-emerald-500/50'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 group-hover:scale-105 transition-transform ${
                  isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                }`}
              >
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold font-heading ${isLight ? 'text-slate-900 group-hover:text-emerald-700' : 'text-white group-hover:text-emerald-300'}`}>
                About & College
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-200'}`}>
                B.Tech AI & Data Science details at Sri Eshwar College of Engineering.
              </p>
            </button>

            <button
              onClick={() => onNavigate('skills')}
              className={`p-5 rounded-2xl glass-panel transition-all text-left group cursor-pointer hover:-translate-y-1 ${
                isLight ? 'border-slate-200 hover:border-emerald-500 bg-white' : 'border-slate-800 hover:border-emerald-500/50'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 group-hover:scale-105 transition-transform ${
                  isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                }`}
              >
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold font-heading ${isLight ? 'text-slate-900 group-hover:text-emerald-700' : 'text-white group-hover:text-emerald-300'}`}>
                Skills & 3D Constellation
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-200'}`}>
                C++, Python, Web Development, and 3D skill orbit visualization.
              </p>
            </button>

            <button
              onClick={() => onNavigate('projects')}
              className={`p-5 rounded-2xl glass-panel transition-all text-left group cursor-pointer hover:-translate-y-1 ${
                isLight ? 'border-slate-200 hover:border-emerald-500 bg-white' : 'border-slate-800 hover:border-emerald-500/50'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 group-hover:scale-105 transition-transform ${
                  isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                }`}
              >
                <Layers className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold font-heading ${isLight ? 'text-slate-900 group-hover:text-emerald-700' : 'text-white group-hover:text-emerald-300'}`}>
                Engineering Projects
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-200'}`}>
                AgriSaarthi AI, QShield, Smart Blind Stick & 3D Portfolio.
              </p>
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className={`p-5 rounded-2xl glass-panel transition-all text-left group cursor-pointer hover:-translate-y-1 ${
                isLight ? 'border-slate-200 hover:border-emerald-500 bg-white' : 'border-slate-800 hover:border-emerald-500/50'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 group-hover:scale-105 transition-transform ${
                  isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold font-heading ${isLight ? 'text-slate-900 group-hover:text-emerald-700' : 'text-white group-hover:text-emerald-300'}`}>
                Developer Dashboard
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-200'}`}>
                Live GitHub sync (@Adithyan49), LeetCode, CodeChef, and HackerRank.
              </p>
            </button>

          </div>
        </div>

      </div>

      {/* Honest Resume Status Modal */}
      {resumeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div
            className={`max-w-md w-full p-6 rounded-2xl border shadow-2xl relative ${
              isLight ? 'bg-white border-emerald-400' : 'bg-slate-900 border-emerald-500/40'
            }`}
          >
            <button
              onClick={() => setResumeModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                }`}
              >
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-lg font-bold font-heading ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Resume Document Status
                </h3>
                <p className={`text-xs font-mono font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                  VERIFIED STATUS PROTOCOL
                </p>
              </div>
            </div>

            <p className={`text-sm leading-relaxed mb-4 ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
              Adithyan is currently curating his first-year undergraduate resume with recent course milestones and hackathon prototypes. 
              The verified PDF can be uploaded directly via the <strong>Admin Portal</strong>.
            </p>

            <div
              className={`p-3.5 rounded-xl border text-xs font-mono mb-5 ${
                isLight ? 'bg-slate-50 border-emerald-300 text-emerald-800' : 'bg-slate-950 border-emerald-500/30 text-emerald-300'
              }`}
            >
              Available upon request for internships, hackathon collaborations, or technical research. Call +91 9659007117 or use the Contact Page.
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setResumeModalOpen(false);
                  onNavigate('contact');
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs text-center transition-all cursor-pointer"
              >
                GO TO CONTACT PAGE
              </button>
              <button
                onClick={() => setResumeModalOpen(false)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
