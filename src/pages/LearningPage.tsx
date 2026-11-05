import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Milestone, 
  BookOpen, 
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  Phone,
  MessageSquare
} from 'lucide-react';
import { LearningData } from '../types/portfolio';

interface LearningPageProps {
  learning: LearningData;
  onNavigateHome: () => void;
}

export const LearningPage: React.FC<LearningPageProps> = ({ learning, onNavigateHome }) => {
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Ongoing'>('All');

  const filteredTopics = filter === 'All'
    ? learning.topics
    : learning.topics.filter(t => t.status === filter);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Breadcrumb */}
      <div className="mb-8">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-mono text-emerald-300 hover:text-emerald-200 py-1.5 px-3 rounded-lg bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer shadow-sm shadow-emerald-950/40"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
          <span>BACK TO HOME</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-300 mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>PAGE // 05 LEARNING & MILESTONES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight">
            LEARNING <span className="text-gradient-emerald">JOURNEY</span>
          </h1>
          <p className="text-slate-200 text-sm sm:text-base font-mono mt-2">
            Academic courses, self-paced computational studies, and engineering milestones.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-emerald-500/30 text-xs font-mono mt-4 md:mt-0 shadow-lg">
          {(['All', 'Completed', 'Ongoing'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                filter === t
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'text-slate-200 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Courses vs Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Courses / Topics */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>Coursework & Topics ({filteredTopics.length})</span>
          </h2>

          <div className="space-y-4">
            {filteredTopics.map((topic) => {
              const isCompleted = topic.status === 'Completed';

              return (
                <div
                  key={topic.id}
                  className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white font-heading">
                        {topic.title}
                      </h3>
                      <span
                        className={`text-xs font-mono px-3 py-1 rounded-full shrink-0 font-bold ${
                          isCompleted
                            ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/50'
                            : 'bg-teal-950/90 text-teal-300 border border-teal-500/50'
                        }`}
                      >
                        {topic.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-emerald-400 mb-3 font-semibold">
                      <span>Issuer: {topic.issuer}</span>
                      <span className="text-slate-500">•</span>
                      <span>Date: {topic.completionDate}</span>
                    </div>

                    <p className="text-sm text-slate-100 leading-relaxed mb-4">
                      {topic.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/80">
                    {topic.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 text-emerald-300 border border-emerald-500/30 font-semibold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Milestones Trajectory */}
        <div className="lg:col-span-5 flex flex-col">
          <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2 mb-4">
            <Milestone className="w-5 h-5 text-emerald-400" />
            <span>Milestone Chronology</span>
          </h2>

          <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 relative shadow-xl">
            <div className="absolute top-8 bottom-8 left-9 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-slate-800" />

            <div className="space-y-7 relative">
              {learning.milestones.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 pl-1">
                  <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-emerald-400 flex items-center justify-center shrink-0 z-10 shadow-md shadow-emerald-500/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/40">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white font-heading mt-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-100 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plain Phone Banner */}
          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-slate-900 border-2 border-emerald-500/50 shadow-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <Phone className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-emerald-300 font-bold uppercase block">
                  ADITHYAN // DIRECT PHONE:
                </span>
                <a href="tel:+919659007117" className="text-lg font-black font-mono text-white hover:text-emerald-300">
                  +91 9659007117
                </a>
              </div>
            </div>
            <a
              href="https://wa.me/919659007117"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 font-mono text-xs font-bold flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
