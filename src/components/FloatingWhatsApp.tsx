import React, { useState } from 'react';
import { MessageSquare, ExternalLink, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappUrl: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappUrl }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs font-mono text-emerald-300 shadow-xl backdrop-blur-md animate-fade-in">
          <span>Direct chat with Adithyan on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all group relative cursor-pointer"
        aria-label="Direct WhatsApp Chat with Adithyan"
      >
        <MessageSquare className="w-6 h-6 text-slate-950 fill-current" />
        
        {/* Subtle pulsing cyber ring */}
        <span className="absolute -inset-1 rounded-2xl border border-emerald-400/40 animate-ping opacity-30 pointer-events-none" />
      </a>
    </div>
  );
};
