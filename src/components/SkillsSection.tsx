import React, { useState } from 'react';
import { Code2, Cpu, Globe, Sparkles, Sliders } from 'lucide-react';
import { SkillItem } from '../types/portfolio';
import { ThreeSkillConstellation } from './ThreeSkillConstellation';

interface SkillsSectionProps {
  skills: SkillItem[];
  onOpenAdmin?: () => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, onOpenAdmin }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkillId, setActiveSkillId] = useState<string>(skills[0]?.id || '');

  const categories = ['All', 'Programming Languages', 'Web Development', 'Currently Learning'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-purple-400 mb-3">
              <span>02 // CAPABILITIES & KNOWLEDGE MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              TECHNICAL <span className="text-gradient-purple">SKILLS</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-2">
              Combining low-level systems programming in C++ with machine learning exploration in Python.
            </p>
          </div>

          {/* Admin Edit Prompt */}
          <div className="mt-4 md:mt-0">
            <button
              onClick={onOpenAdmin}
              className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all"
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Modify benchmarks in Admin</span>
            </button>
          </div>
        </div>

        {/* 1. Interactive 3D Skill Constellation Visualizer */}
        <div className="mb-14">
          <ThreeSkillConstellation
            skills={skills}
            selectedSkillId={activeSkillId}
            onSelectSkill={(skill) => setActiveSkillId(skill.id)}
          />
        </div>

        {/* 2. Categorized Skill Cards and Progress Indicators */}
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span>Competency Benchmarks & Progress Indicators</span>
            </h3>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-mono">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Skill Cards */}
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
                      ? 'bg-slate-900/90 border-cyan-400/60 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                      : 'glass-panel border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-bold font-heading text-white group-hover:text-cyan-400">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                        {skill.category}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isLearning
                          ? 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
                          : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                      }`}
                    >
                      {isLearning ? 'Active Learning' : 'Core Foundation'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 min-h-[36px]">
                    {skill.description}
                  </p>

                  {/* Progress Bar & Level */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Self-Assessment Benchmark:</span>
                      <span className={isLearning ? 'text-purple-400 font-bold' : 'text-cyan-400 font-bold'}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isLearning
                            ? 'bg-gradient-to-r from-purple-500 to-indigo-400'
                            : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                        }`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>
              ℹ️ Levels reflect verified self-reported coursework, problem submissions, and project application. Editable anytime via Admin.
            </span>
            <span className="text-cyan-400">TOTAL NODES: {skills.length}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
