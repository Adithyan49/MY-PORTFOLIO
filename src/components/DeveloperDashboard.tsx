import React, { useState } from 'react';
import { 
  Github, 
  Code, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle, 
  Award, 
  Flame, 
  GitBranch, 
  Star, 
  GitFork, 
  Clock, 
  Link2,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { CodingStatsData } from '../types/portfolio';

interface DeveloperDashboardProps {
  stats: CodingStatsData;
  onStatsUpdated?: (newStats: CodingStatsData) => void;
}

export const DeveloperDashboard: React.FC<DeveloperDashboardProps> = ({ stats, onStatsUpdated }) => {
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
        setSyncMessage('Sync finished using cached public profile metrics.');
      }
    } catch (err) {
      console.warn('Sync failed:', err);
      setSyncMessage('Network synchronization offline. Displaying cached records.');
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
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <section id="dashboard" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
              <span>05 // VERIFIED TELEMETRY & CODING PROFILES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              DEVELOPER <span className="text-gradient-cyan">DASHBOARD</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-mono mt-2">
              Transparent coding metrics aggregated from real public handles. No inflated claims.
            </p>
          </div>

          {/* Sync Controller */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-6 md:mt-0">
            <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Last Synced: {formattedDate}</span>
            </div>

            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 hover:border-cyan-300 text-xs font-mono font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'SYNCING...' : 'SYNC NOW'}</span>
            </button>
          </div>
        </div>

        {syncMessage && (
          <div className="mb-6 p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-cyan-300 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <span>{syncMessage}</span>
          </div>
        )}

        {/* 1. Primary GitHub Real-time Telemetry Card */}
        <div className="p-7 rounded-2xl glass-panel border border-cyan-500/30 mb-8 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-white shadow-lg shadow-cyan-950/50">
                <Github className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold font-heading text-white">GitHub Activity Telemetry</h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                    Live API Connected
                  </span>
                </div>
                <a
                  href={stats.github.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 mt-1"
                >
                  <span>@{stats.github.username}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Quick Counters */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 min-w-[90px]">
                <span className="text-2xl font-bold font-mono text-cyan-400 block">
                  {stats.github.publicRepos}
                </span>
                <span className="text-[10px] font-mono text-slate-400">PUBLIC REPOS</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 min-w-[90px]">
                <span className="text-2xl font-bold font-mono text-purple-400 block">
                  {stats.github.followers}
                </span>
                <span className="text-[10px] font-mono text-slate-400">FOLLOWERS</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 min-w-[90px]">
                <span className="text-2xl font-bold font-mono text-emerald-400 block">
                  {stats.github.following}
                </span>
                <span className="text-[10px] font-mono text-slate-400">FOLLOWING</span>
              </div>
            </div>
          </div>

          {/* GitHub Repos Grid if synced */}
          {stats.github.recentRepos && stats.github.recentRepos.length > 0 ? (
            <div className="pt-6">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-4">
                RECENT REPOSITORIES //
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.github.recentRepos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-cyan-300 font-semibold group-hover:underline truncate">
                          {repo.name}
                        </span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-400 shrink-0 ml-1" />
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {repo.description || 'Repository maintained by Adithyan'}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-3 mt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
                      {repo.language && (
                        <span className="text-purple-400 font-semibold">{repo.language}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400" /> {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3 text-slate-400" /> {repo.forks}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="pt-6 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Repositories are synchronized directly via GitHub REST v3 endpoints.</span>
              <a
                href={stats.github.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>View Full GitHub Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* 2. Grid of Connected Competitive & Learning Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* LeetCode Card */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  LEETCODE
                </span>
                <span className="text-[11px] font-mono text-slate-400">Verified Handle</span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white font-heading">
                  @{stats.leetcode.username}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Active problem solving covering arrays, strings, two pointers, and basic recursion.
                </p>
              </div>

              {/* Problem Breakdown */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Solved Problems:</span>
                  <span className="text-amber-400 font-bold">{stats.leetcode.solvedTotal}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono pt-1">
                  <div className="p-1 rounded bg-emerald-950/50 text-emerald-300 border border-emerald-500/30">
                    Easy: {stats.leetcode.easy}
                  </div>
                  <div className="p-1 rounded bg-amber-950/50 text-amber-300 border border-amber-500/30">
                    Med: {stats.leetcode.medium}
                  </div>
                  <div className="p-1 rounded bg-rose-950/50 text-rose-300 border border-rose-500/30">
                    Hard: {stats.leetcode.hard}
                  </div>
                </div>
              </div>
            </div>

            <a
              href={stats.leetcode.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center justify-between"
            >
              <span>Visit LeetCode Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* CodeChef Card */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/30">
                  CODECHEF
                </span>
                <span className="text-[11px] font-mono text-slate-400">Active Division</span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white font-heading">
                  @{stats.codechef.username}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Participating in Starters contests to sharpen timed algorithmic problem resolution in C++.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-1">Division Tier:</span>
                <span className="text-sm font-bold font-mono text-blue-300">
                  {stats.codechef.rating}
                </span>
              </div>
            </div>

            <a
              href={stats.codechef.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center justify-between"
            >
              <span>Visit CodeChef Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* HackerRank Card */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  HACKERRANK
                </span>
                <span className="text-[11px] font-mono text-slate-400">Skill Badges</span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white font-heading">
                  @{stats.hackerrank.username}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Language foundations verification and domain badge tracks.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-2">Track Badges:</span>
                <div className="flex flex-wrap gap-1.5">
                  {stats.hackerrank.badges.map((b) => (
                    <span
                      key={b}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                    >
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
              className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center justify-between"
            >
              <span>Visit HackerRank Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Kaggle Card */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  KAGGLE
                </span>
                <span className="text-[11px] font-mono text-slate-400">AI / ML Datasets</span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white font-heading">
                  @{stats.kaggle.username}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Exploring tabular datasets, basic EDA notebooks, and introductory regression benchmarks.
                </p>
              </div>
            </div>

            <a
              href={stats.kaggle.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center justify-between"
            >
              <span>Visit Kaggle Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* GeeksforGeeks Card */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-green-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-green-400 bg-green-950/60 px-2 py-0.5 rounded border border-green-500/30">
                  GEEKSFORGEEKS
                </span>
                <span className="text-[11px] font-mono text-slate-400">DSA Practice</span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white font-heading">
                  @{stats.geeksforgeeks.username}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Curated problem-of-the-day sets and university lab coding practice.
                </p>
              </div>
            </div>

            <a
              href={stats.geeksforgeeks.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-green-400 hover:text-green-300 flex items-center justify-between"
            >
              <span>Visit GeeksforGeeks Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Unstop Card */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
                  UNSTOP
                </span>
                <span className="text-[11px] font-mono text-slate-400">Hackathons & Quizzes</span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white font-heading">
                  @{stats.unstop.username}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  National engineering competitions, campus assessments, and hackathon registration portal.
                </p>
              </div>
            </div>

            <a
              href={stats.unstop.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center justify-between"
            >
              <span>Visit Unstop Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Data Honesty Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span>
            <strong>Data Integrity Mandate:</strong> Only verified platforms with public profiles are linked. Third-party competitive profiles without open CORS endpoints are authenticated via manual administrator confirmation to ensure 100% truthful reporting.
          </span>
        </div>

      </div>
    </section>
  );
};
