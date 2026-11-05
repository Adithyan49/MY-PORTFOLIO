import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Target, 
  Code, 
  Cpu, 
  Trophy, 
  Compass, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface AboutSectionProps {
  profile: ProfileData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="about" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
            <span>01 // IDENTITY & BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            ABOUT <span className="text-gradient-cyan">ADITHYAN</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-mono mt-2">
            Engineering solid computer science foundations for the next era of AI & machine learning.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Narrative Card */}
          <div className="lg:col-span-8 p-8 rounded-2xl glass-panel border border-cyan-500/20 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>The Engineering Journey</span>
              </h3>
              
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                I am a first-year undergraduate student pursuing my Bachelor of Technology in 
                <strong className="text-white font-semibold"> Artificial Intelligence and Data Science</strong> at 
                <strong className="text-cyan-300 font-semibold"> Sri Eshwar College of Engineering</strong> in Coimbatore, Tamil Nadu. 
                My focus centers on developing rigorous fundamentals in algorithmic thinking, low-level data structures, and mathematical modeling for machine learning.
              </p>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Rather than jumping blindly to surface-level AI wrappers, I invest deliberate time into understanding how algorithms behave from first principles — writing efficient code in <span className="text-cyan-300 font-mono">C++</span> and <span className="text-cyan-300 font-mono">Python</span>, debugging data flows, and exploring hardware-software intersections such as Arduino sensor prototypes.
              </p>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Outside of curriculum coursework, I actively collaborate in student hackathons including the 
                <em className="text-purple-300"> AI Agent Hackathon 2026</em> and <em className="text-purple-300">Fund My Crazy 2.0</em>, 
                where I test my ability to conceptualize viable prototypes under rapid engineering constraints.
              </p>
            </div>

            {/* Core Values Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-mono text-cyan-400 block mb-1">01 / DISCIPLINE</span>
                <span className="text-sm font-semibold text-white">Daily Problem Solving</span>
                <p className="text-xs text-slate-400 mt-1">Consistent practice across LeetCode, CodeChef, and HackerRank.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-mono text-purple-400 block mb-1">02 / FIRST PRINCIPLES</span>
                <span className="text-sm font-semibold text-white">Core Algorithms</span>
                <p className="text-xs text-slate-400 mt-1">Grounded in C++, OOP semantics, and memory awareness.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-mono text-emerald-400 block mb-1">03 / COLLABORATION</span>
                <span className="text-sm font-semibold text-white">Hackathon Builder</span>
                <p className="text-xs text-slate-400 mt-1">Iterating with diverse teammates to solve real human problems.</p>
              </div>
            </div>
          </div>

          {/* Quick Facts Dossier Card */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            <div className="p-6 rounded-2xl glass-panel border border-slate-800/90 space-y-4">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest pb-2 border-b border-slate-800">
                ACADEMIC DOSSIER //
              </h4>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">DEGREE & STREAM</span>
                    <span className="text-sm font-semibold text-white leading-tight">{profile.degree}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-400 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">COLLEGE</span>
                    <span className="text-sm font-semibold text-white leading-tight">{profile.college}</span>
                    <span className="text-xs text-purple-300 font-mono mt-0.5 block">{profile.academicYear} Undergrad</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">CAREER DESTINATION</span>
                    <span className="text-sm font-semibold text-emerald-300 font-mono">AI/ML Engineer</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-400 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">LOCATION</span>
                    <span className="text-sm text-slate-200">{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Badge */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-cyan-950/40 border border-cyan-500/20 flex items-center justify-around text-center">
              <div>
                <span className="text-2xl font-bold font-mono text-cyan-400 block">18</span>
                <span className="text-[10px] font-mono text-slate-400">AGE (YEARS)</span>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div>
                <span className="text-2xl font-bold font-mono text-purple-400 block">4+</span>
                <span className="text-[10px] font-mono text-slate-400">PROJECTS</span>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div>
                <span className="text-2xl font-bold font-mono text-emerald-400 block">2</span>
                <span className="text-[10px] font-mono text-slate-400">HACKATHONS</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
