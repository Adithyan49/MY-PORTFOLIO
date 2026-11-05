import React, { useState } from 'react';
import { Code2, ArrowLeft, Sliders, Sparkles, Orbit } from 'lucide-react';
import { SkillItem } from '../types/portfolio';
import { ThreeSkillConstellation } from '../components/ThreeSkillConstellation';

interface SkillsPageProps {
  skills: SkillItem[];
  onNavigateHome: () => void;
  onOpenAdmin: () => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({ skills, onNavigateHome, onOpenAdmin }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkillId, setActiveSkillId] = useState<string>(skills[0]?.id || '');
  const [show3dOrbit, setShow3dOrbit] = useState(true);

  const categories = ['All', 'Programming Languages', 'Web Development', 'Currently Learning'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Background Emerald Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Breadcrumb */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 py-2 px-3.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO HOME</span>
        </button>

        <button
          onClick={onOpenAdmin}
          className="text-xs font-mono text-slate-200 hover:text-emerald-400 flex items-center gap-1.5 p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500/40 transition-all font-semibold"
        >
          <Sliders className="w-3.5 h-3.5 text-emerald-400" />
          <span>Edit Benchmarks in Admin</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-300 mb-3 font-semibold">
            <span>PAGE // 02 TECHNICAL COMPETENCIES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight">
            SKILLS & <span className="text-gradient-emerald">CONSTELLATION</span>
          </h1>
          <p className="text-slate-200 text-sm sm:text-base font-mono mt-2">
            Low-level systems programming in C++ paired with Python for computational algorithms.
          </p>
        </div>

        {/* 3D Orbit Toggle */}
        <button
          onClick={() => setShow3dOrbit(!show3dOrbit)}
          className="mt-4 md:mt-0 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/50 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
        >
          <Orbit className="w-4 h-4 text-emerald-400" />
          <span>{show3dOrbit ? 'Hide 3D Orbit' : 'Show 3D Orbit'}</span>
        </button>
      </div>

      {/* 3D Constellation Visualizer */}
      {show3dOrbit && (
        <div className="mb-12">
          <ThreeSkillConstellation
            skills={skills}
            selectedSkillId={activeSkillId}
            onSelectSkill={(skill) => setActiveSkillId(skill.id)}
          />
        </div>
      )}

      {/* Categorized Skills Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <span>Proficiency Cards & Benchmark Indicators</span>
          </h2>

          <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/95 rounded-xl border border-slate-700 text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                  selectedCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => {
            const isLearning = skill.status === 'learning';
            const isSelected = skill.id === activeSkillId;

            return (
              <div
                key={skill.id}
                onClick={() => setActiveSkillId(skill.id)}
                className={`p-5 rounded-xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-900/95 border-emerald-400 shadow-xl shadow-emerald-950/50 ring-2 ring-emerald-500/30'
                    : 'glass-panel border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold block mt-0.5">
                      {skill.category}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                      isLearning
                        ? 'bg-purple-950/90 text-purple-200 border border-purple-500/40'
                        : 'bg-emerald-950/90 text-emerald-200 border border-emerald-500/40'
                    }`}
                  >
                    {isLearning ? 'Active Learning' : 'Core Foundation'}
                  </span>
                </div>

                <p className="text-xs text-slate-100 leading-relaxed mb-4 min-h-[36px] font-normal">
                  {skill.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-700/80">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="text-slate-300">Proficiency Benchmark:</span>
                    <span className={isLearning ? 'text-purple-300' : 'text-emerald-400'}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isLearning
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-400'
                          : 'bg-gradient-to-r from-emerald-400 to-green-500'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
