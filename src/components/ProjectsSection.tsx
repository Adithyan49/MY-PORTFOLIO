import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Sprout, 
  ShieldAlert, 
  Cpu, 
  Orbit, 
  X, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'AI/ML', 'Cybersecurity', 'Hardware', 'Web Development'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const getProjectIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Sprout': return <Sprout className="w-5 h-5 text-emerald-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-purple-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-400" />;
      default: return <Orbit className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="projects" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
              <span>03 // CODE & HARDWARE PROTOTYPES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              FEATURED <span className="text-gradient-cyan">PROJECTS</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-2">
              From applied agricultural decision systems to embedded assistive prototypes.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-mono mt-6 md:mt-0 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-2xl glass-panel border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-transparent" />

              <div className="space-y-4">
                {/* Meta header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                      {getProjectIcon(project.icon)}
                    </div>
                    <div>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                    {project.status}
                  </span>
                </div>

                {/* Title & Short Description */}
                <div>
                  <h3 className="text-2xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm mt-2.5 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Special clarification tag for QShield to strictly avoid false AI claims */}
                {project.id === 'qshield' && (
                  <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-[11px] font-mono text-purple-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Cryptographic exploration prototype modeling signature attacks; not an ML neural model.</span>
                  </div>
                )}

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900/80 text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>VIEW SPECIFICATIONS & ARCHITECTURE</span>
                  <span>→</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  ) : (
                    <span
                      className="text-[11px] font-mono text-slate-400 px-2 py-1 rounded bg-slate-900 border border-slate-800"
                      title="Repository link to be updated via Admin"
                    >
                      Repo in sync
                    </span>
                  )}

                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-slate-800 transition-colors"
                      title="Live Demonstration"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Deep Specification Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="max-w-2xl w-full p-7 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-2xl relative my-8">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-400">
                {selectedProject.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Timeline: {selectedProject.completionDate}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              {selectedProject.title}
            </h3>

            {/* Detailed Description */}
            <div className="mt-4 space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>{selectedProject.detailedDescription}</p>

              {/* Highlights List */}
              {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 mt-4">
                  <span className="text-xs font-mono text-cyan-400 font-bold block mb-2">
                    TECHNICAL HIGHLIGHTS & ARCHITECTURE:
                  </span>
                  {selectedProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tech Stack */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <span className="text-xs font-mono text-slate-400 block mb-2">STACK & PROTOCOLS:</span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map(t => (
                  <span key={t} className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400">
                Status: <span className="text-white font-semibold">{selectedProject.status}</span>
              </div>
              
              <div className="flex items-center gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono flex items-center gap-1.5"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repo</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
