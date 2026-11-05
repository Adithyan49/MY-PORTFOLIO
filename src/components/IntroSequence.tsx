import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, FastForward, CheckCircle2 } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusLog, setStatusLog] = useState('INITIALIZING CYBERSPACE...');

  useEffect(() => {
    // Check if user already saw intro in current session
    if (sessionStorage.getItem('adithyan_intro_seen')) {
      onComplete();
      return;
    }

    const logs = [
      { at: 15, text: 'MOUNTING THREE.JS CYBER MATRIX...' },
      { at: 40, text: 'CONNECTING GITHUB TELEMETRY @Adithyan49...' },
      { at: 65, text: 'CALIBRATING QUANTUM QSHIELD & HARDWARE NODES...' },
      { at: 85, text: 'WARMING GROUNDED AI COMPANION (GEMINI 3.8)...' },
      { at: 100, text: 'SYSTEM READY // WELCOME TO ADITHYAN UNIVERSE' }
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        const matchingLog = logs.find(l => l.at <= next);
        if (matchingLog) setStatusLog(matchingLog.text);

        if (next >= 100) {
          clearInterval(timer);
          sessionStorage.setItem('adithyan_intro_seen', 'true');
          setTimeout(onComplete, 400);
          return 100;
        }
        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('adithyan_intro_seen', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center p-6 text-center select-none font-mono">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      {/* Floating Center Brand */}
      <div className="relative z-10 max-w-md w-full flex flex-col items-center space-y-6">
        
        {/* Animated Brand Hologram Emblem */}
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white text-3xl font-extrabold font-heading shadow-2xl shadow-cyan-500/40 animate-pulse">
            A
          </div>
          <div className="absolute -inset-2 border border-cyan-500/40 rounded-3xl animate-spin duration-1000" />
        </div>

        {/* Identity Title */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-widest text-white uppercase text-gradient-cyan">
            ADITHYAN
          </h1>
          <p className="text-xs text-cyan-400 font-mono tracking-widest">
            AI & DATA SCIENCE // SRI ESHWAR
          </p>
          <p className="text-[11px] text-slate-400 font-mono italic">
            "Code. Create. Innovate. Repeat."
          </p>
        </div>

        {/* Cyber Progress Indicator */}
        <div className="w-full space-y-2 pt-4">
          <div className="flex justify-between text-xs text-slate-400">
            <span className="text-cyan-300 font-bold">{progress}%</span>
            <span className="text-slate-400 truncate max-w-[200px]">{statusLog}</span>
          </div>

          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip Intro Button */}
        <button
          onClick={handleSkip}
          className="px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <span>Skip Cinematic Intro</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
