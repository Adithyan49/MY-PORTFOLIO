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
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectsPageProps {
  projects: ProjectItem[];
  onNavigateHome: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects, onNavigateHome }) => {
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
      default: return <Orbit className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Background Emerald Ambient */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-300 mb-3 font-semibold">
            <span>PAGE // 03 CODE & HARDWARE PROTOTYPES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight">
            ENGINEERING <span className="text-gradient-emerald">PROJECTS</span>
          </h1>
          <p className="text-slate-200 text-sm sm:text-base font-mono mt-2">
            Applied agricultural decision systems, cryptographic security analysis, and embedded assistive devices.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/95 rounded-xl border border-slate-700 text-xs font-mono mt-4 md:mt-0 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-bold ${
                activeCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-sm'
                  : 'text-slate-300 hover:text-white'
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
            className="p-6 sm:p-7 rounded-2xl glass-panel border border-slate-700 hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden shadow-xl"
          >
            {/* Top Green Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 group-hover:border-emerald-400 transition-colors">
                    {getProjectIcon(project.icon)}
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-white font-bold">
                    {project.category}
                  </span>
                </div>

                <span className="text-xs font-mono text-emerald-300 font-bold px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50">
                  {project.status}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-heading text-white group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h2>
                <p className="text-slate-100 text-sm mt-2.5 leading-relaxed font-normal">
                  {project.shortDescription}
                </p>
              </div>

              {project.id === 'qshield' && (
                <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/40 text-xs font-mono text-purple-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Cryptographic exploration prototype modeling signature attacks; not an ML neural model.</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 text-emerald-300 border border-slate-700 font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-700/80 flex items-center justify-between">
              <button
                onClick={() => setSelectedProject(project)}
                className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>VIEW ARCHITECTURE & SPECIFICATIONS</span>
                <span>→</span>
              </button>

              <div className="flex items-center gap-2">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 transition-colors"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-[11px] font-mono text-slate-300 px-2.5 py-1 rounded bg-slate-900 border border-slate-700">
                    Repo in sync
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Specification Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
          <div className="max-w-2xl w-full p-7 rounded-2xl bg-slate-900 border-2 border-emerald-500/50 shadow-2xl relative my-8">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono px-3 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold">
                {selectedProject.category}
              </span>
              <span className="text-xs font-mono text-slate-300">
                Timeline: {selectedProject.completionDate}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              {selectedProject.title}
            </h3>

            <div className="mt-4 space-y-4 text-sm text-slate-100 leading-relaxed">
              <p>{selectedProject.detailedDescription}</p>

              {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-700 space-y-2 mt-4">
                  <span className="text-xs font-mono text-emerald-400 font-bold block mb-2">
                    TECHNICAL HIGHLIGHTS & ARCHITECTURE:
                  </span>
                  {selectedProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700">
              <span className="text-xs font-mono text-emerald-400 font-bold block mb-2">STACK & PROTOCOLS:</span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map(t => (
                  <span key={t} className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-800 text-white font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-300">
                Status: <span className="text-emerald-300 font-bold">{selectedProject.status}</span>
              </div>
              
              <div className="flex items-center gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold flex items-center gap-1.5"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repo</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-black text-xs cursor-pointer shadow-md"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
