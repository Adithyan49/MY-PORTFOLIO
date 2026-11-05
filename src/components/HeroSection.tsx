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
  Sparkles, 
  ShieldCheck, 
  Code2, 
  TerminalSquare, 
  Info, 
  X 
} from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { ThreeAvatar } from './ThreeAvatar';

interface HeroSectionProps {
  profile: ProfileData;
  onOpenAiChat: () => void;
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenAiChat,
  onOpenTerminal
}) => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (profile.resumeAvailable && profile.resumeUrl) {
      window.open(profile.resumeUrl, '_blank');
    } else {
      setResumeModalOpen(true);
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Status & Degree Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-md shadow-sm shadow-cyan-950/60">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span className="tracking-wide">AI & DATA SCIENCE // 1ST YEAR UNDERGRADUATE</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl font-extrabold font-heading tracking-tight text-white uppercase">
                <span className="block text-gradient-cyan">ADITHYAN</span>
              </h1>
              <p className="text-xl sm:text-2xl font-mono text-cyan-400 font-semibold tracking-wide">
                {profile.title} <span className="text-slate-500">|</span> <span className="text-purple-400">{profile.subtitle}</span>
              </p>
            </div>

            {/* Tagline */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <p className="text-base sm:text-lg font-mono font-medium text-slate-200 tracking-wider">
                &ldquo;{profile.tagline}&rdquo;
              </p>
            </div>

            {/* Short Introduction */}
            <p className="text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              {profile.bio}
            </p>

            {/* Academic institution callout */}
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60">
              <span className="text-cyan-400">INSTITUTION:</span>
              <span className="text-slate-200">{profile.college}</span>
              <span className="text-slate-600">•</span>
              <span>{profile.location}</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-sm tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 font-mono text-sm tracking-wider flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                <span>CONTACT ME</span>
              </a>

              <button
                onClick={handleResumeClick}
                className="px-5 py-3 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 font-mono text-sm tracking-wider flex items-center gap-2 transition-all"
                title="Download verified resume"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>RESUME</span>
              </button>
            </div>

            {/* Social Media Link Bar */}
            <div className="pt-4 flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 tracking-wider">NETWORK //</span>

              {/* GitHub */}
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-sm"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              {/* LinkedIn */}
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* Instagram */}
              <a
                href={profile.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-sm"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* WhatsApp (destination link uses 9659007117, phone not displayed in plain text) */}
              <a
                href={profile.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-emerald-950/80 text-slate-300 hover:text-emerald-400 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-sm"
                aria-label="Direct WhatsApp Message"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              {/* Email */}
              <a
                href={`mailto:${profile.email}`}
                className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-sm"
                aria-label="Send direct email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Human Avatar */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative">
              {/* Glowing Aura Ring */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-purple-500/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />
              
              {/* 3D Avatar Component */}
              <ThreeAvatar avatarPhotoUrl={profile.avatarUrl} name={profile.name} />
            </div>

            {/* Quick interactive assistant badge */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={onOpenAiChat}
                className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/40 hover:border-purple-400 text-xs font-mono text-purple-300 flex items-center gap-2 hover:bg-purple-950/50 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Ask AI About Adithyan</span>
              </button>

              <button
                onClick={onOpenTerminal}
                className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono text-cyan-300 flex items-center gap-2 hover:bg-cyan-950/50 transition-all"
              >
                <TerminalSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Launch CLI</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Honest Resume Status Modal (Never fake download) */}
      {resumeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-2xl relative">
            <button
              onClick={() => setResumeModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading text-white">Resume Document Status</h3>
                <p className="text-xs font-mono text-slate-400">VERIFIED STATUS PROTOCOL</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Adithyan is currently curating his first-year undergraduate resume with recent course milestones and hackathon prototypes. 
              The verified PDF can be uploaded directly via the <strong>Admin Portal</strong>.
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 mb-5">
              Available upon request for internships, hackathon collaborations, or technical research.
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={() => setResumeModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs text-center transition-all"
              >
                REQUEST VIA CONTACT
              </a>
              <button
                onClick={() => setResumeModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition-all"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
