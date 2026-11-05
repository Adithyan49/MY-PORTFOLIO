import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  EyeOff, 
  Sliders, 
  Compass, 
  Sparkles, 
  ChevronUp, 
  ChevronDown,
  Camera,
  Layers
} from 'lucide-react';

interface BottomControlDockProps {
  zenMode: boolean;
  onToggleZenMode: () => void;
  activeCameraPreset: 'default' | 'orbit' | 'neural' | 'deep';
  onChangeCameraPreset: (preset: 'default' | 'orbit' | 'neural' | 'deep') => void;
  particleDensity: 'low' | 'medium' | 'high';
  onChangeParticleDensity: (density: 'low' | 'medium' | 'high') => void;
}

export const BottomControlDock: React.FC<BottomControlDockProps> = ({
  zenMode,
  onToggleZenMode,
  activeCameraPreset,
  onChangeCameraPreset,
  particleDensity,
  onChangeParticleDensity
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Keyboard shortcut H to toggle dock
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'h' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        setIsCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
        isCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
      }`}
      style={{ maxWidth: 'min(940px, 94vw)' }}
    >
      {/* Dock Container */}
      <div className="flex flex-col items-center">
        
        {/* Collapse / Expand Tab Button pinned to top edge */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="px-3.5 py-1 rounded-t-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border-t border-x border-cyan-500/30 text-[11px] font-mono flex items-center gap-1.5 backdrop-blur-md shadow-md shadow-black/40 cursor-pointer"
          title="Toggle Dock (H)"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>▴ Show 3D Dock [H]</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>▾ Hide Controls [H]</span>
            </>
          )}
        </button>

        {/* Main Dock Body */}
        <div className="w-full px-4 py-2.5 rounded-2xl bg-slate-950/85 border border-cyan-500/30 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          
          {/* Zen / Cinema Mode Toggle */}
          <button
            onClick={onToggleZenMode}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
              zenMode
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800'
            }`}
            title="Inspect 3D universe without DOM overlay"
          >
            {zenMode ? <EyeOff className="w-3.5 h-3.5 text-cyan-400" /> : <Eye className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{zenMode ? 'Exit Zen Mode' : 'Zen 3D View'}</span>
          </button>

          {/* Camera View Selector */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 px-2 flex items-center gap-1">
              <Camera className="w-3 h-3 text-cyan-400" />
              <span>VIEW:</span>
            </span>
            {(['default', 'orbit', 'neural', 'deep'] as const).map((preset) => (
              <button
                key={preset}
                onClick={() => onChangeCameraPreset(preset)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                  activeCameraPreset === preset
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Particle Density */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 px-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>STARS:</span>
            </span>
            {(['low', 'medium', 'high'] as const).map((den) => (
              <button
                key={den}
                onClick={() => onChangeParticleDensity(den)}
                className={`px-2 py-1 rounded-lg capitalize transition-all ${
                  particleDensity === den
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {den}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
