import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Mail, 
  Linkedin, 
  Github, 
  Instagram, 
  MessageSquare, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Users, 
  ArrowLeft,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ProfileData, VisitorStats } from '../types/portfolio';

interface ContactPageProps {
  profile: ProfileData;
  visitorStats?: VisitorStats;
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ profile, visitorStats, onNavigateHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to transmit message. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network connection offline. Please reach out directly via Phone, Email or WhatsApp.');
    }
  };

  return (
    <div className="relative pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Background Emerald Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-green-500/10 rounded-full blur-[130px] pointer-events-none" />

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

      {/* Header with Bright Green Accent */}
      <div className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-300 mb-3 font-semibold">
          <span>PAGE // 08 DIRECT REACH & SIGNALS</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight">
          GET IN <span className="text-gradient-emerald">TOUCH</span>
        </h1>
        <p className="text-slate-200 text-sm sm:text-base font-mono mt-2">
          Connect directly with Adithyan for internships, research, hackathon collaborations, and questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Phone & Social Endpoints with Brand Icons */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Prominent Direct Phone Card - Bold, Green, No Encryption */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 border-2 border-emerald-400 shadow-2xl shadow-emerald-950/60 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-3 py-1 rounded bg-emerald-400 text-slate-950 font-black uppercase tracking-wider">
                Direct Phone Call
              </span>
              <span className="text-xs font-mono text-emerald-300 font-bold">● Active 24/7</span>
            </div>

            <div>
              <span className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-wider block mb-1">
                PUBLIC CALL NUMBER (NO ENCRYPTION):
              </span>
              <a
                href="tel:+919659007117"
                className="text-3xl sm:text-4xl font-black font-mono text-white hover:text-emerald-300 transition-colors tracking-wider block drop-shadow-sm"
              >
                +91 9659007117
              </a>
              <span className="text-xs font-mono text-slate-200 mt-1 block">
                Direct phone line & WhatsApp chat: 9659007117
              </span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="tel:+919659007117"
                className="flex-1 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono font-black text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 stroke-[2.5]" />
                <span>Call +91 9659007117</span>
              </a>

              <a
                href={profile.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-[#0a2016] hover:bg-[#0e2c1e] text-emerald-300 border-2 border-emerald-500/60 font-mono font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Connected Brand Networks Cards (WhatsApp, LinkedIn, GitHub, Instagram, Email) */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-700 space-y-4">
            <h2 className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-widest pb-2 border-b border-slate-700">
              OFFICIAL NETWORK IDENTIFIERS //
            </h2>

            <div className="space-y-3 text-xs font-mono">
              
              {/* WhatsApp Card */}
              <a
                href={profile.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#0a2016] hover:bg-[#0e2c1e] border border-emerald-500/60 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md shadow-emerald-500/40">
                    <MessageSquare className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-emerald-400 text-[10px] uppercase font-bold block">WHATSAPP CHAT</span>
                    <span className="text-white text-sm font-bold group-hover:text-emerald-300">
                      +91 9659007117
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* LinkedIn Card */}
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#0a192f] hover:bg-[#0f2444] border border-cyan-500/60 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0077b5] text-white flex items-center justify-center shadow-md shadow-blue-500/40">
                    <Linkedin className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-cyan-400 text-[10px] uppercase font-bold block">LINKEDIN PROFILE</span>
                    <span className="text-white text-sm font-bold group-hover:text-cyan-300">
                      in/adithyan-r-7420bb419
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* GitHub Card */}
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#161b22] hover:bg-[#1f2633] border border-slate-600 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white text-slate-950 flex items-center justify-center shadow-md shadow-white/20">
                    <Github className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-slate-300 text-[10px] uppercase font-bold block">GITHUB HANDLE</span>
                    <span className="text-white text-sm font-bold group-hover:text-slate-200">
                      @Adithyan49
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Instagram Card */}
              <a
                href={profile.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#220d22] hover:bg-[#301330] border border-pink-500/50 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-pink-500/40">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-pink-400 text-[10px] uppercase font-bold block">INSTAGRAM HANDLE</span>
                    <span className="text-white text-sm font-bold group-hover:text-pink-300">
                      @aadhi49.exe
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-pink-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Email Direct Card */}
              <a
                href={`mailto:${profile.email}`}
                className="p-3.5 rounded-xl bg-[#091b1a] hover:bg-[#0e2726] border border-teal-500/50 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center shadow-md shadow-teal-500/40">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-teal-400 text-[10px] uppercase font-bold block">EMAIL ADDRESS</span>
                    <span className="text-white text-sm font-bold group-hover:text-teal-300">
                      {profile.email}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-teal-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Location Badge */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-300 text-[10px] uppercase font-bold block">CAMPUS LOCATION</span>
                  <span className="text-white font-semibold text-xs">
                    {profile.location}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Visitor Counter Card */}
          <div className="p-5 rounded-2xl glass-panel border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-300 font-bold block">TOTAL VISITS LOGGED</span>
                <span className="text-xl font-bold font-mono text-emerald-300">
                  {visitorStats?.totalVisits || 142} Visits
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-300 font-bold block">UNIQUE SESSIONS</span>
              <span className="text-sm font-bold font-mono text-white">
                {visitorStats?.uniqueVisitors || 89} Nodes
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7 p-8 rounded-2xl glass-panel border border-emerald-500/30">
          <h2 className="text-2xl font-bold font-heading text-white mb-6 flex items-center gap-2">
            <Send className="w-5 h-5 text-emerald-400" />
            <span>Send Direct Message to Adithyan</span>
          </h2>

          {status === 'success' && (
            <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-400 text-emerald-200 text-xs font-mono mb-6 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sm block">Message Delivered Successfully!</span>
                <span className="text-slate-200">Thank you! Your inquiry has been stored securely in Adithyan's portal database.</span>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs font-mono mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sm block">Transmission Issue</span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-200 font-bold block mb-1.5">
                  YOUR NAME <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-200 font-bold block mb-1.5">
                  EMAIL ADDRESS <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@domain.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-200 font-bold block mb-1.5">
                SUBJECT / TOPIC
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Collaboration / Research / AgriSaarthi AI"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono placeholder-slate-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-200 font-bold block mb-1.5">
                MESSAGE <span className="text-emerald-400">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Enter message details here..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono placeholder-slate-500 leading-relaxed resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>{status === 'submitting' ? 'TRANSMITTING MESSAGE...' : 'SEND DIRECT MESSAGE'}</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
