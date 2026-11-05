import React from 'react';
import { Github, Linkedin, Instagram, Mail, MessageSquare, Phone, Lock, ArrowUp } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface FooterProps {
  profile: ProfileData;
  onNavigate: (pageId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigate, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#02050e] border-t border-slate-800/80 pt-16 pb-24 text-xs font-mono text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Direct Contact */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 font-black font-mono text-sm shadow-md shadow-emerald-500/30">
                A
              </div>
              <span className="font-heading font-extrabold text-lg tracking-wider text-white">
                ADITHYAN
              </span>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              &ldquo;Code. Create. Innovate. Repeat.&rdquo; First-year B.Tech undergraduate in Artificial Intelligence & Data Science at Sri Eshwar College of Engineering, Coimbatore.
            </p>

            {/* Direct Phone Number - Plain Text */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-1">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">
                DIRECT MOBILE / WHATSAPP // NO ENCRYPTION:
              </span>
              <a
                href="tel:+919659007117"
                className="text-base font-black text-white hover:text-emerald-400 font-mono tracking-wider block"
              >
                +91 9659007117
              </a>
              <span className="text-[11px] text-slate-400 block">
                Direct phone line & WhatsApp chat
              </span>
            </div>

            <div className="text-[11px] text-emerald-400 font-bold">
              LOCATION: {profile.location}
            </div>
          </div>

          {/* Quick Page Navigation */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-white font-bold tracking-wider block">PAGES DIRECTORY //</span>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button onClick={() => onNavigate('home')} className="text-left text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">01. Home</button>
              <button onClick={() => onNavigate('about')} className="text-left text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">02. About</button>
              <button onClick={() => onNavigate('skills')} className="text-left text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">03. Skills & 3D</button>
              <button onClick={() => onNavigate('projects')} className="text-left text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">04. Projects</button>
              <button onClick={() => onNavigate('learning')} className="text-left text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">05. Learning</button>
              <button onClick={() => onNavigate('dashboard')} className="text-left text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">06. Dashboard</button>
              <button onClick={() => onNavigate('hackathons')} className="text-left text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">07. Hackathons</button>
              <button onClick={() => onNavigate('certificates')} className="text-left text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">08. Certificates</button>
              <button onClick={() => onNavigate('contact')} className="text-left text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">09. Contact</button>
            </div>
          </div>

          {/* Admin & Top Ascent */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-white font-bold tracking-wider block">CONTROLS //</span>
            <div className="flex flex-col gap-2 font-semibold">
              <button
                onClick={onOpenAdmin}
                className="text-left text-xs text-slate-300 hover:text-emerald-400 flex items-center gap-2 p-1.5 rounded hover:bg-slate-900 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Private Admin Portal</span>
              </button>

              <button
                onClick={scrollToTop}
                className="text-left text-xs text-slate-300 hover:text-emerald-400 flex items-center gap-2 p-1.5 rounded hover:bg-slate-900 cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Scroll to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-400 font-semibold">
          <div>
            © {new Date().getFullYear()} Adithyan. Sri Eshwar College of Engineering.
          </div>

          <div className="flex items-center gap-4">
            <a href="tel:+919659007117" className="hover:text-emerald-400 text-slate-300">+91 9659007117</a>
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="hover:text-emerald-400 text-slate-300">GitHub</a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-emerald-400 text-slate-300">LinkedIn</a>
            <a href={profile.socials.whatsapp} target="_blank" rel="noreferrer" className="hover:text-emerald-400 text-emerald-400">WhatsApp</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
