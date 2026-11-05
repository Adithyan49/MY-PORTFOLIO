import React from 'react';
import { 
  Flame, 
  Users, 
  Calendar, 
  Code, 
  Lightbulb, 
  Sparkles,
  Trophy,
  Award
} from 'lucide-react';
import { HackathonItem } from '../types/portfolio';

interface HackathonsSectionProps {
  hackathons: HackathonItem[];
}

export const HackathonsSection: React.FC<HackathonsSectionProps> = ({ hackathons }) => {
  return (
    <section id="hackathons" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-purple-400 mb-3">
            <span>06 // HACKATHONS & RAPID PROTOTYPING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            COMPETITIONS & <span className="text-gradient-purple">HACKATHONS</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-mono mt-2">
            Honest participation logs and learnings from high-intensity development sprints.
          </p>
        </div>

        {/* Hackathon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {hackathons.map((event) => (
            <div
              key={event.id}
              className="p-7 rounded-2xl glass-panel border border-slate-800/90 hover:border-purple-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{event.date}</span>
                  </div>

                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-950/70 text-purple-300 border border-purple-500/30">
                    {event.result}
                  </span>
                </div>

                {/* Event Name */}
                <div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    {event.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-1">
                    <span className="text-cyan-400">ROLE: {event.role}</span>
                    <span>•</span>
                    <span>TEAM: {event.teamMembers}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {event.description}
                </p>

                {/* Key Takeaway / Learnings */}
                {event.learnings && (
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="flex items-center gap-1.5 text-purple-400 font-mono font-semibold">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>ENGINEERING TAKEAWAY:</span>
                    </div>
                    <p className="leading-relaxed">{event.learnings}</p>
                  </div>
                )}

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {event.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Participation Record</span>
                <span className="text-purple-400">Verified Submission</span>
              </div>
            </div>
          ))}
        </div>

        {/* Note on integrity */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-400 text-center">
          ⚡ Participation records are strictly grounded in verified event submissions. New hackathons are added via the private Admin Dashboard.
        </div>

      </div>
    </section>
  );
};
