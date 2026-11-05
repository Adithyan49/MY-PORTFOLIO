import React, { useState } from 'react';
import { 
  Github, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle, 
  Star, 
  GitFork, 
  Clock, 
  ArrowLeft,
  AlertTriangle,
  Code2,
  Sparkles
} from 'lucide-react';
import { CodingStatsData } from '../types/portfolio';

interface DashboardPageProps {
  stats: CodingStatsData;
  onNavigateHome: () => void;
  onStatsUpdated?: (newStats: CodingStatsData) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ stats, onNavigateHome, onStatsUpdated }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const res = await fetch('/api/sync-stats');
      const data = await res.json();
      if (data.success && data.stats) {
        onStatsUpdated?.(data.stats);
        setSyncMessage('Synchronized successfully with GitHub public API.');
      } else {
        setSyncMessage('Sync completed with cached profile metrics.');
      }
    } catch (err) {
      setSyncMessage('Network sync offline. Displaying cached records.');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(null), 5000);
    }
  };

  const formattedDate = new Date(stats.lastSynced).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Background Emerald Ambient */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

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
            <span>PAGE // 05 LIVE DEVELOPER TELEMETRY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight">
            DEVELOPER <span className="text-gradient-emerald">DASHBOARD</span>
          </h1>
          <p className="text-slate-200 text-sm sm:text-base font-mono mt-2">
            Live GitHub telemetry and verified competitive programming handles for Adithyan.
          </p>
        </div>

        {/* Sync Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4 md:mt-0">
          <div className="text-xs font-mono text-slate-200 flex items-center gap-1.5 font-semibold">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Synced: {formattedDate}</span>
          </div>

          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-mono font-black flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-emerald-500/25"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'SYNCING...' : 'SYNC GITHUB NOW'}</span>
          </button>
        </div>
      </div>

      {syncMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-400 text-xs font-mono text-emerald-300 flex items-center gap-2 font-bold">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{syncMessage}</span>
        </div>
      )}

      {/* GitHub Card with Emerald Accents */}
      <div className="p-7 rounded-2xl glass-panel border border-emerald-500/40 mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-700">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-emerald-500/50 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50">
              <Github className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-heading text-white">GitHub Activity Telemetry</h2>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/50 font-bold">
                  Live API Connected
                </span>
              </div>
              <a
                href={stats.github.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-emerald-400 font-bold hover:underline flex items-center gap-1 mt-1"
              >
                <span>@{stats.github.username}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/30 min-w-[90px]">
              <span className="text-2xl font-bold font-mono text-emerald-400 block">
                {stats.github.publicRepos}
              </span>
              <span className="text-[10px] font-mono text-slate-200 font-bold">PUBLIC REPOS</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/30 min-w-[90px]">
              <span className="text-2xl font-bold font-mono text-white block">
                {stats.github.followers}
              </span>
              <span className="text-[10px] font-mono text-slate-200 font-bold">FOLLOWERS</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/30 min-w-[90px]">
              <span className="text-2xl font-bold font-mono text-emerald-300 block">
                {stats.github.following}
              </span>
              <span className="text-[10px] font-mono text-slate-200 font-bold">FOLLOWING</span>
            </div>
          </div>
        </div>

        {stats.github.recentRepos && stats.github.recentRepos.length > 0 ? (
          <div className="pt-6">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-4">
              RECENT REPOSITORIES //
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.github.recentRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700 hover:border-emerald-400 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-white font-bold group-hover:text-emerald-300 group-hover:underline truncate">
                        {repo.name}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 shrink-0 ml-1" />
                    </div>
                    <p className="text-xs text-slate-200 line-clamp-2">
                      {repo.description || 'Repository maintained by Adithyan'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-3 mt-2 border-t border-slate-700 text-[10px] font-mono text-slate-300">
                    {repo.language && (
                      <span className="text-emerald-400 font-bold">{repo.language}</span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3 text-slate-300" /> {repo.forks}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-6 text-xs font-mono text-slate-200 flex items-center justify-between">
            <span>Repositories synchronized directly via GitHub REST v3 endpoints.</span>
            <a
              href={stats.github.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>View GitHub Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Grid of Other Handles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* LeetCode */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-700 hover:border-amber-400 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-mono text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/40 font-bold">
              LEETCODE
            </span>
            <h3 className="text-xl font-bold text-white font-heading">
              @{stats.leetcode.username}
            </h3>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="text-slate-300">Solved:</span>
                <span className="text-amber-400 text-sm">{stats.leetcode.solvedTotal}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono font-bold">
                <div className="p-1.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">Easy: {stats.leetcode.easy}</div>
                <div className="p-1.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40">Med: {stats.leetcode.medium}</div>
                <div className="p-1.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/40">Hard: {stats.leetcode.hard}</div>
              </div>
            </div>
          </div>
          <a
            href={stats.leetcode.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 pt-3 border-t border-slate-700 text-xs font-mono text-amber-300 font-bold hover:underline flex items-center justify-between"
          >
            <span>Visit LeetCode</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* CodeChef */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-700 hover:border-blue-400 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-mono text-blue-300 bg-blue-950/80 px-2.5 py-0.5 rounded border border-blue-500/40 font-bold">
              CODECHEF
            </span>
            <h3 className="text-xl font-bold text-white font-heading">
              @{stats.codechef.username}
            </h3>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700">
              <span className="text-xs font-mono text-slate-300 block mb-1">Division Tier:</span>
              <span className="text-sm font-bold font-mono text-blue-300">{stats.codechef.rating}</span>
            </div>
          </div>
          <a
            href={stats.codechef.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 pt-3 border-t border-slate-700 text-xs font-mono text-blue-300 font-bold hover:underline flex items-center justify-between"
          >
            <span>Visit CodeChef</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* HackerRank */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-700 hover:border-emerald-400 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/40 font-bold">
              HACKERRANK
            </span>
            <h3 className="text-xl font-bold text-white font-heading">
              @{stats.hackerrank.username}
            </h3>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700">
              <span className="text-xs font-mono text-slate-300 block mb-2 font-bold">Track Badges:</span>
              <div className="flex flex-wrap gap-1.5">
                {stats.hackerrank.badges.map((b) => (
                  <span key={b} className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <a
            href={stats.hackerrank.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 pt-3 border-t border-slate-700 text-xs font-mono text-emerald-300 font-bold hover:underline flex items-center justify-between"
          >
            <span>Visit HackerRank</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Kaggle */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-700 hover:border-cyan-400 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/40 font-bold">
              KAGGLE
            </span>
            <h3 className="text-xl font-bold text-white font-heading">
              @{stats.kaggle.username}
            </h3>
            <p className="text-xs text-slate-200">
              Exploration of ML datasets, exploratory data analysis, and introductory neural baselines.
            </p>
          </div>
          <a
            href={stats.kaggle.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 pt-3 border-t border-slate-700 text-xs font-mono text-cyan-300 font-bold hover:underline flex items-center justify-between"
          >
            <span>Visit Kaggle</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* GeeksforGeeks */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-700 hover:border-green-400 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-mono text-green-300 bg-green-950/80 px-2.5 py-0.5 rounded border border-green-500/40 font-bold">
              GEEKSFORGEEKS
            </span>
            <h3 className="text-xl font-bold text-white font-heading">
              @{stats.geeksforgeeks.username}
            </h3>
            <p className="text-xs text-slate-200">
              Daily practice problems covering arrays, sorting, dynamic memory, and algorithm complexity.
            </p>
          </div>
          <a
            href={stats.geeksforgeeks.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 pt-3 border-t border-slate-700 text-xs font-mono text-green-300 font-bold hover:underline flex items-center justify-between"
          >
            <span>Visit GeeksforGeeks</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Unstop */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-700 hover:border-indigo-400 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/80 px-2.5 py-0.5 rounded border border-indigo-500/40 font-bold">
              UNSTOP
            </span>
            <h3 className="text-xl font-bold text-white font-heading">
              @{stats.unstop.username}
            </h3>
            <p className="text-xs text-slate-200">
              National collegiate hackathons, technical challenges, and problem solving contests.
            </p>
          </div>
          <a
            href={stats.unstop.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 pt-3 border-t border-slate-700 text-xs font-mono text-indigo-300 font-bold hover:underline flex items-center justify-between"
          >
            <span>Visit Unstop</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

    </div>
  );
};
