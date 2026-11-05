import React, { useState } from 'react';
import { 
  Award, 
  ExternalLink, 
  Download, 
  Building2, 
  Eye, 
  X, 
  FileCheck2, 
  ArrowLeft 
} from 'lucide-react';
import { CertificateItem } from '../types/portfolio';

interface CertificatesPageProps {
  certificates: CertificateItem[];
  onNavigateHome: () => void;
}

export const CertificatesPage: React.FC<CertificatesPageProps> = ({ certificates, onNavigateHome }) => {
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);

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
      <div className="flex flex-col items-start mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-300 mb-3 font-semibold">
          <span>PAGE // 07 CREDENTIALS & CERTIFICATES</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight">
          CERTIFICATE <span className="text-gradient-emerald">GALLERY</span>
        </h1>
        <p className="text-slate-200 text-sm sm:text-base font-mono mt-2">
          Academic foundation verifications, coursework credentials, and hackathon recognitions.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="p-6 sm:p-7 rounded-2xl glass-panel border border-slate-700 hover:border-emerald-400 transition-all flex flex-col justify-between group shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors shadow-sm">
                  <Award className="w-6 h-6 stroke-[2]" />
                </div>
                <span className="text-xs font-mono text-slate-300 font-bold">
                  {cert.date}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold font-heading text-white group-hover:text-emerald-300 transition-colors">
                  {cert.title}
                </h2>
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 mt-1 font-semibold">
                  <Building2 className="w-4 h-4" />
                  <span>{cert.organization}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                {cert.description}
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-700 flex items-center justify-between">
              <button
                onClick={() => setActiveCert(cert)}
                className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview Credential</span>
              </button>

              {cert.fileUrl ? (
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                  title="Download / View document"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                </a>
              ) : (
                <span className="text-[10px] font-mono text-slate-300 font-bold px-2.5 py-1 rounded bg-slate-900 border border-slate-700">
                  Verified Record
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="max-w-md w-full p-7 rounded-2xl bg-slate-900 border-2 border-emerald-500/50 shadow-2xl relative">
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 flex items-center justify-center text-emerald-300 mb-4 shadow-lg shadow-emerald-500/20">
              <FileCheck2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold font-heading text-white">{activeCert.title}</h3>
            <p className="text-xs font-mono text-emerald-400 mt-1 font-bold">{activeCert.organization}</p>
            <p className="text-xs font-mono text-slate-300 mt-0.5">Issued: {activeCert.date}</p>

            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed mt-4 p-4 rounded-xl bg-slate-950 border border-slate-700">
              {activeCert.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {activeCert.fileUrl ? (
                <a
                  href={activeCert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>DOWNLOAD ATTACHED FILE</span>
                </a>
              ) : (
                <div className="flex-1 text-center text-xs font-mono text-slate-300 py-3 bg-slate-950 rounded-xl border border-slate-700 font-semibold">
                  Physical document on file with institution
                </div>
              )}
              <button
                onClick={() => setActiveCert(null)}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
