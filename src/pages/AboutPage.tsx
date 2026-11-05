import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Target, 
  Code, 
  Sparkles,
  BookOpen,
  ArrowLeft,
  Phone,
  Mail,
  Award,
  MessageSquare,
  Linkedin,
  Github
} from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface AboutPageProps {
  profile: ProfileData;
  onNavigateHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ profile, onNavigateHome }) => {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Background Emerald Ambient */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Breadcrumb */}
      <div className="mb-8">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 py-2 px-3.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO HOME</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-300 mb-3 font-semibold">
          <span>PAGE // 01 ABOUT ADITHYAN</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight">
          ABOUT & <span className="text-gradient-emerald">ACADEMICS</span>
        </h1>
        <p className="text-slate-200 text-sm sm:text-base font-mono mt-2">
          First-year AI & Data Science engineering student at Sri Eshwar College of Engineering.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Narrative Card */}
        <div className="lg:col-span-8 p-8 rounded-2xl glass-panel border border-emerald-500/30 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>Academic Profile & Professional Direction</span>
            </h2>
            
            <p className="text-slate-100 leading-relaxed text-sm sm:text-base font-normal">
              I am an 18-year-old first-year undergraduate student studying for a 
              <strong className="text-white font-bold"> Bachelor of Technology in Artificial Intelligence and Data Science</strong> at 
              <strong className="text-emerald-300 font-bold"> Sri Eshwar College of Engineering</strong> in Pollachi, Coimbatore, Tamil Nadu, India.
            </p>

            <p className="text-slate-100 leading-relaxed text-sm sm:text-base font-normal">
              My career target is to become an impactful <strong className="text-emerald-400 font-bold">AI/ML Engineer</strong>. I am building a rigorous foundation in algorithms and low-level computer science, mastering object-oriented design and memory mechanics in <span className="text-emerald-300 font-mono font-bold">C++</span>, exploring data pipelines in <span className="text-emerald-300 font-mono font-bold">Python</span>, and practicing problem solving on competitive platforms daily.
            </p>

            <p className="text-slate-100 leading-relaxed text-sm sm:text-base font-normal">
              I believe in experiential learning through prototypes and peer teamwork. I have developed projects including the <strong className="text-white font-bold">Smart Blind Stick</strong> assistive hardware and participated actively in events like the <strong className="text-emerald-300 font-semibold">AI Agent Hackathon 2026</strong> and <strong className="text-emerald-300 font-semibold">Fund My Crazy 2.0</strong>.
            </p>
          </div>

          {/* Direct Phone & WhatsApp Callout Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500 text-slate-950">
                <Phone className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-emerald-300 block text-[11px] font-bold">DIRECT CALL (NO ENCRYPTION):</span>
                <a href="tel:+919659007117" className="text-white font-black text-base hover:text-emerald-300 tracking-wider">
                  +91 9659007117
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:+919659007117"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all"
              >
                Call
              </a>
              <a
                href={profile.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-emerald-300 border border-emerald-500/50 font-bold hover:bg-slate-800 transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30">
              <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">01 / DISCIPLINE</span>
              <span className="text-sm font-bold text-white block">Daily Problem Solving</span>
              <p className="text-xs text-slate-200 mt-1">Consistent competitive practice in C++ and Python.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30">
              <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">02 / FIRST PRINCIPLES</span>
              <span className="text-sm font-bold text-white block">Algorithms & Systems</span>
              <p className="text-xs text-slate-200 mt-1">Grounded understanding of data structures, pointers, and calculus.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30">
              <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">03 / APPLICATION</span>
              <span className="text-sm font-bold text-white block">Hackathon Builder</span>
              <p className="text-xs text-slate-200 mt-1">Building collaborative prototypes under rapid deadline constraints.</p>
            </div>
          </div>
        </div>

        {/* Academic Dossier Side Card */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="p-6 rounded-2xl glass-panel border border-slate-700 space-y-4">
            <h3 className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest pb-2 border-b border-slate-700">
              ACADEMIC DOSSIER //
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-300 block font-mono font-bold">DEGREE PROGRAM</span>
                  <span className="text-sm font-bold text-white leading-tight">{profile.degree}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-300 block font-mono font-bold">INSTITUTION</span>
                  <span className="text-sm font-bold text-white leading-tight">{profile.college}</span>
                  <span className="text-xs text-emerald-300 font-mono mt-0.5 block font-semibold">{profile.academicYear} Undergraduate</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mt-0.5">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-300 block font-mono font-bold">CAREER OBJECTIVE</span>
                  <span className="text-sm font-bold text-emerald-300 font-mono">AI/ML Engineer</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-300 block font-mono font-bold">CAMPUS LOCATION</span>
                  <span className="text-sm text-slate-100 font-medium">{profile.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-center justify-around text-center">
            <div>
              <span className="text-3xl font-black font-mono text-emerald-400 block">18</span>
              <span className="text-[10px] font-mono text-slate-300 font-bold">AGE (YEARS)</span>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <span className="text-3xl font-black font-mono text-white block">1st</span>
              <span className="text-[10px] font-mono text-slate-300 font-bold">ACADEMIC YEAR</span>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <span className="text-3xl font-black font-mono text-emerald-300 block">2029</span>
              <span className="text-[10px] font-mono text-slate-300 font-bold">GRADUATION</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
