import React, { useState } from 'react';
import { 
  Award, 
  ExternalLink, 
  Download, 
  Calendar, 
  Building2, 
  Eye, 
  X,
  FileCheck2
} from 'lucide-react';
import { CertificateItem } from '../types/portfolio';

interface CertificatesSectionProps {
  certificates: CertificateItem[];
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificates }) => {
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);

  return (
    <section id="certificates" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
            <span>07 // CREDENTIALS & FOUNDATIONAL VERIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            CERTIFICATE <span className="text-gradient-cyan">GALLERY</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-mono mt-2">
            Academic achievements, coursework completions, and hackathon participation credentials.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl glass-panel border border-slate-800/90 hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {cert.date}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 mt-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{cert.organization}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setActiveCert(cert)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Credential</span>
                </button>

                {cert.fileUrl ? (
                  <a
                    href={cert.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Download / View document"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900">
                    Verified Record
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Certificate Preview Modal */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-2xl relative">
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-4">
              <FileCheck2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold font-heading text-white">{activeCert.title}</h3>
            <p className="text-xs font-mono text-cyan-400 mt-1">{activeCert.organization}</p>
            <p className="text-xs font-mono text-slate-400 mt-0.5">Issued: {activeCert.date}</p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              {activeCert.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {activeCert.fileUrl ? (
                <a
                  href={activeCert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs text-center flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD ATTACHED FILE</span>
                </a>
              ) : (
                <div className="flex-1 text-center text-xs font-mono text-slate-400 py-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  Physical document on file with institution
                </div>
              )}
              <button
                onClick={() => setActiveCert(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
