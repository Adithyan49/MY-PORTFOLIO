import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface DeveloperTerminalProps {
  portfolio: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command?: string;
  output: string | React.ReactNode;
  type: 'input' | 'output' | 'error' | 'system';
}

export const DeveloperTerminal: React.FC<DeveloperTerminalProps> = ({
  portfolio,
  isOpen,
  onClose
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      type: 'system',
      output: (
        <div className="space-y-1">
          <div className="text-cyan-400 font-bold">
            ADITHYAN NEURAL CLI // SYSTEM v2.6.0 [Sri Eshwar Node]
          </div>
          <div className="text-slate-400 text-xs">
            Type <span className="text-cyan-300 font-bold">help</span> to view available terminal commands, or <span className="text-cyan-300 font-bold">about</span> for profile dossier.
          </div>
        </div>
      )
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Add to input history
    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIdx(-1);

    // Record user command
    const newLogs: CommandLog[] = [...logs, { type: 'input', command: rawCmd, output: '' }];

    switch (cmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          output: (
            <div className="space-y-2 py-1 text-xs">
              <div className="text-cyan-400 font-bold">AVAILABLE PROTOCOLS:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-slate-300">
                <div><span className="text-cyan-300 font-mono w-24 inline-block">about</span> : Candidate background & career goal</div>
                <div><span className="text-cyan-300 font-mono w-24 inline-block">skills</span> : Verified languages & active learning</div>
                <div><span className="text-cyan-300 font-mono w-24 inline-block">projects</span> : Hardware & software prototype portfolio</div>
                <div><span className="text-cyan-300 font-mono w-24 inline-block">education</span> : Degree, college & academic status</div>
                <div><span className="text-cyan-300 font-mono w-24 inline-block">hackathons</span> : Rapid prototyping event participations</div>
                <div><span className="text-cyan-300 font-mono w-24 inline-block">stats</span> : Live coding handles & metrics</div>
                <div><span className="text-cyan-300 font-mono w-24 inline-block">contact</span> : Transmit direct communication signals</div>
                <div><span className="text-cyan-300 font-mono w-24 inline-block">whoami</span> : Current visitor terminal context</div>
                <div><span className="text-cyan-300 font-mono w-24 inline-block">clear</span> : Flush terminal screen buffer</div>
                <div><span className="text-cyan-300 font-mono w-24 inline-block">exit</span> : Terminate CLI window</div>
              </div>
            </div>
          )
        });
        break;

      case 'about':
        newLogs.push({
          type: 'output',
          output: (
            <div className="space-y-1 text-xs text-slate-300">
              <div className="text-cyan-300 font-bold">{portfolio.profile.name} — {portfolio.profile.title}</div>
              <div className="text-slate-400">"{portfolio.profile.tagline}"</div>
              <p className="mt-1 leading-relaxed">{portfolio.profile.bio}</p>
              <div className="text-purple-400 pt-1">Target Role: {portfolio.profile.subtitle}</div>
            </div>
          )
        });
        break;

      case 'education':
        newLogs.push({
          type: 'output',
          output: (
            <div className="space-y-1 text-xs text-slate-300">
              <div className="text-cyan-400 font-bold">ACADEMIC CREDENTIALS:</div>
              <div>Degree: <span className="text-white">{portfolio.profile.degree}</span></div>
              <div>College: <span className="text-white">{portfolio.profile.college}</span></div>
              <div>Year: <span className="text-white">{portfolio.profile.academicYear} Undergrad</span></div>
              <div>Location: <span className="text-white">{portfolio.profile.location}</span></div>
            </div>
          )
        });
        break;

      case 'skills':
        newLogs.push({
          type: 'output',
          output: (
            <div className="space-y-1 text-xs text-slate-300">
              <div className="text-cyan-400 font-bold">COMPETENCY MATRIX:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
                {portfolio.skills.map(s => (
                  <div key={s.id} className="flex justify-between border-b border-slate-800 pb-0.5">
                    <span className="text-slate-200">{s.name} ({s.status})</span>
                    <span className="text-cyan-400 font-mono">{s.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          )
        });
        break;

      case 'projects':
        newLogs.push({
          type: 'output',
          output: (
            <div className="space-y-2 text-xs text-slate-300">
              <div className="text-cyan-400 font-bold">ENGINEERING PROJECTS:</div>
              {portfolio.projects.map((p, i) => (
                <div key={p.id} className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>{i + 1}. {p.title}</span>
                    <span className="text-purple-400 text-[10px] font-mono">{p.status}</span>
                  </div>
                  <p className="text-slate-400 mt-0.5">{p.shortDescription}</p>
                  <div className="text-[10px] text-cyan-300 font-mono mt-1">
                    Tech: {p.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          )
        });
        break;

      case 'hackathons':
        newLogs.push({
          type: 'output',
          output: (
            <div className="space-y-2 text-xs text-slate-300">
              <div className="text-purple-400 font-bold">HACKATHON PARTICIPATIONS:</div>
              {portfolio.hackathons.map((h) => (
                <div key={h.id} className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-white font-bold">{h.name} ({h.date})</div>
                  <div className="text-slate-400 text-[11px]">Role: {h.role} • Result: {h.result}</div>
                  <p className="text-slate-300 text-xs mt-1">{h.description}</p>
                </div>
              ))}
            </div>
          )
        });
        break;

      case 'stats':
        newLogs.push({
          type: 'output',
          output: (
            <div className="space-y-1 text-xs text-slate-300">
              <div className="text-cyan-400 font-bold">CODING PROFILE TELEMETRY:</div>
              <div>GitHub: <span className="text-white">github.com/{portfolio.codingStats.github.username} ({portfolio.codingStats.github.publicRepos} Repos)</span></div>
              <div>LeetCode: <span className="text-white">leetcode.com/u/{portfolio.codingStats.leetcode.username} ({portfolio.codingStats.leetcode.solvedTotal} Solved)</span></div>
              <div>CodeChef: <span className="text-white">codechef.com/users/{portfolio.codingStats.codechef.username}</span></div>
              <div>HackerRank: <span className="text-white">hackerrank.com/profile/{portfolio.codingStats.hackerrank.username}</span></div>
              <div>Kaggle: <span className="text-white">kaggle.com/{portfolio.codingStats.kaggle.username}</span></div>
            </div>
          )
        });
        break;

      case 'contact':
        newLogs.push({
          type: 'output',
          output: (
            <div className="space-y-1 text-xs text-slate-300">
              <div className="text-cyan-400 font-bold">COMMUNICATION SIGNALS:</div>
              <div>Email: <a href={`mailto:${portfolio.profile.email}`} className="text-cyan-300 underline">{portfolio.profile.email}</a></div>
              <div>LinkedIn: <a href={portfolio.profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-cyan-300 underline">in/adithyan-r-7420bb419</a></div>
              <div>WhatsApp: <span className="text-emerald-400">Available via bottom-right floating trigger</span></div>
            </div>
          )
        });
        break;

      case 'whoami':
        newLogs.push({
          type: 'output',
          output: <div className="text-xs text-cyan-300 font-mono">guest@adithyan-cyber-universe:~$ [Session: Authenticated Visitor]</div>
        });
        break;

      case 'clear':
        setLogs([]);
        return;

      case 'exit':
        onClose();
        return;

      default:
        newLogs.push({
          type: 'error',
          output: (
            <div className="text-xs text-rose-400">
              Unknown command: "{rawCmd}". Type <span className="text-cyan-300 font-bold">help</span> to view supported commands.
            </div>
          )
        });
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < history.length) {
          setHistoryIdx(nextIdx);
          setInputVal(history[nextIdx]);
        } else {
          setHistoryIdx(-1);
          setInputVal('');
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div
        className={`w-full bg-slate-950 border border-cyan-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 font-mono ${
          isExpanded ? 'h-[92vh] max-w-6xl' : 'h-[540px] max-w-3xl'
        }`}
      >
        {/* Terminal Title Bar */}
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-300 font-bold tracking-wider">
              adithyan@portfolio-cli: ~
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
              title={isExpanded ? 'Restore' : 'Maximize'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800"
              title="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Console Buffer */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/95 text-xs text-slate-300 select-text">
          {logs.map((log, i) => (
            <div key={i} className="space-y-1">
              {log.command !== undefined && (
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <span>guest@adithyan:~$</span>
                  <span className="text-white">{log.command}</span>
                </div>
              )}
              {log.output && <div>{log.output}</div>}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Prompt */}
        <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
          <span className="text-cyan-400 text-xs font-bold shrink-0">guest@adithyan:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' for available commands..."
            className="flex-1 bg-transparent text-white text-xs font-mono focus:outline-none placeholder-slate-600"
            autoComplete="off"
            spellCheck="false"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="p-1 text-slate-400 hover:text-cyan-400"
            title="Execute"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
