import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Milestone, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { LearningData } from '../types/portfolio';

interface LearningSectionProps {
  learning: LearningData;
}

export const LearningSection: React.FC<LearningSectionProps> = ({ learning }) => {
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Ongoing'>('All');

  const filteredTopics = filter === 'All'
    ? learning.topics
    : learning.topics.filter(t => t.status === filter);

  return (
    <section id="learning" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-purple-400 mb-3">
              <span>04 // CURRICULUM & KNOWLEDGE MILESTONES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              LEARNING <span className="text-gradient-purple">JOURNEY</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-2">
              Structured academic progress, self-paced computational studies, and technical milestones.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-mono mt-6 md:mt-0">
            {(['All', 'Completed', 'Ongoing'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filter === t
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Layout: Courses & Milestones Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Courses / Topics Cards */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span>Courses & Deep Dives ({filteredTopics.length})</span>
            </h3>

            <div className="space-y-4">
              {filteredTopics.map((topic) => {
                const isCompleted = topic.status === 'Completed';

                return (
                  <div
                    key={topic.id}
                    className="p-5 rounded-2xl glass-panel border border-slate-800/90 hover:border-purple-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white font-heading">
                          {topic.title}
                        </h4>
                        <span
                          className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full shrink-0 ${
                            isCompleted
                              ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30'
                              : 'bg-purple-950/70 text-purple-300 border border-purple-500/30'
                          }`}
                        >
                          {topic.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mb-3">
                        <span>Issuer: {topic.issuer}</span>
                        <span>•</span>
                        <span>Date: {topic.completionDate}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                        {topic.description}
                      </p>
                    </div>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                      {topic.skills.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
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

          {/* Right Column: Chronological Milestones Timeline */}
          <div className="lg:col-span-5 flex flex-col">
            <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2 mb-4">
              <Milestone className="w-5 h-5 text-cyan-400" />
              <span>Milestone Trajectory</span>
            </h3>

            <div className="p-6 rounded-2xl glass-panel border border-cyan-500/20 relative">
              <div className="absolute top-8 bottom-8 left-9 w-0.5 bg-gradient-to-b from-cyan-500/60 via-purple-500/40 to-slate-800" />

              <div className="space-y-7 relative">
                {learning.milestones.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 pl-1">
                    <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shrink-0 z-10 shadow-sm shadow-cyan-500/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                          {item.year}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-heading mt-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Note on Admin Updates */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400">
              Future courses and university milestones are dynamically added and tracked through the Admin Dashboard as Adithyan progresses through his B.Tech tenure.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
