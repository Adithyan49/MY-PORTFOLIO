import React from 'react';
import { 
  Flame, 
  Calendar, 
  Lightbulb, 
  ArrowLeft,
  Users,
  Award
} from 'lucide-react';
import { HackathonItem } from '../types/portfolio';

interface HackathonsPageProps {
  hackathons: HackathonItem[];
  onNavigateHome: () => void;
}

export const HackathonsPage: React.FC<HackathonsPageProps> = ({ hackathons, onNavigateHome }) => {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Background Emerald Ambient */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Breadcrumb */}
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
      <div className="flex flex-col items-start mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-300 mb-3 font-semibold">
          <span>PAGE // 06 COMPETITIONS & RAPID PROTOTYPING</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight">
          HACKATHONS & <span className="text-gradient-emerald">EVENTS</span>
        </h1>
        <p className="text-slate-200 text-sm sm:text-base font-mono mt-2">
          Real participation experiences, prototype submissions, and takeaways under sprint deadlines.
        </p>
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {hackathons.map((event) => (
          <div
            key={event.id}
            className="p-7 rounded-2xl glass-panel border border-slate-700 hover:border-emerald-400 transition-all flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{event.date}</span>
                </div>

                <span className="text-xs font-mono font-bold px-3 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/50">
                  {event.result}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-heading text-white">
                  {event.name}
                </h2>
                <div className="flex items-center gap-3 text-xs font-mono text-slate-300 mt-1 font-semibold">
                  <span className="text-emerald-400">ROLE: {event.role}</span>
                  <span>•</span>
                  <span>TEAM: {event.teamMembers}</span>
                </div>
              </div>

              <p className="text-sm text-slate-100 leading-relaxed font-normal">
                {event.description}
              </p>

              {event.learnings && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold">
                    <Lightbulb className="w-4 h-4 text-emerald-400" />
                    <span>ENGINEERING TAKEAWAYS:</span>
                  </div>
                  <p className="leading-relaxed font-normal">{event.learnings}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {event.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 text-emerald-300 border border-slate-700 font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-700 text-xs font-mono text-slate-300 flex items-center justify-between font-semibold">
              <span>Verified Submission</span>
              <span className="text-emerald-400">Sri Eshwar Student Team</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
