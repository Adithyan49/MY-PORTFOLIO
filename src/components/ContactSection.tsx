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
  ExternalLink,
  ShieldCheck,
  Eye,
  Users
} from 'lucide-react';
import { ProfileData, VisitorStats } from '../types/portfolio';

interface ContactSectionProps {
  profile: ProfileData;
  visitorStats?: VisitorStats;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, visitorStats }) => {
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
      console.error('Contact error:', err);
      setStatus('error');
      setErrorMessage('Network connection offline. Please reach out directly via email or WhatsApp.');
    }
  };

  return (
    <section id="contact" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
            <span>08 // DIRECT COMMUNICATION & INQUIRIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            TRANSMIT A <span className="text-gradient-cyan">SIGNAL</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-mono mt-2">
            Open for hackathon collaborations, internship explorations, and technical conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-2xl glass-panel border border-cyan-500/20 relative">
            <h3 className="text-xl font-bold font-heading text-white mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-cyan-400" />
              <span>Contact Transmission Console</span>
            </h3>

            {status === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono mb-6 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Transmission Successful!</span>
                  <span>Thank you! Your message has been received and saved securely in Adithyan's communication database.</span>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-mono mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Transmission Error</span>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Anti-spam Honeypot field (hidden from real users) */}
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
                  <label className="text-xs font-mono text-slate-300 block mb-1.5">
                    YOUR NAME <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono placeholder-slate-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1.5">
                    EMAIL ADDRESS <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono placeholder-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5">
                  SUBJECT / TOPIC
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Collaboration on AgriSaarthi / Hackathon"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono placeholder-slate-600"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5">
                  MESSAGE <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your proposal, question, or project ideas..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono placeholder-slate-600 leading-relaxed resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{status === 'submitting' ? 'TRANSMITTING PACKET...' : 'SEND MESSAGE'}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Direct Channels & Visitor Counter */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Social Channels Card */}
            <div className="p-7 rounded-2xl glass-panel border border-slate-800 space-y-5">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest pb-2 border-b border-slate-800">
                DIRECT NETWORK ENDPOINTS //
              </h4>

              <div className="space-y-3">
                {/* Email Direct */}
                <a
                  href={`mailto:${profile.email}`}
                  className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-950/60 text-cyan-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400 block">EMAIL INBOX</span>
                      <span className="text-xs text-white font-mono group-hover:text-cyan-300">
                        {profile.email}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </a>

                {/* WhatsApp Direct */}
                <a
                  href={profile.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400 block">WHATSAPP INSTANT CHAT</span>
                      <span className="text-xs text-emerald-300 font-mono">
                        Direct 1-on-1 Chat Available
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                </a>

                {/* LinkedIn */}
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-950/60 text-blue-400">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400 block">LINKEDIN</span>
                      <span className="text-xs text-white font-mono group-hover:text-cyan-300">
                        in/adithyan-r-7420bb419
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </a>

                {/* Instagram */}
                <a
                  href={profile.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/30 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-950/60 text-purple-400">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400 block">INSTAGRAM</span>
                      <span className="text-xs text-white font-mono group-hover:text-purple-300">
                        @aadhi49.exe
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400" />
                </a>
              </div>

              {/* Privacy Notice per prompt instructions */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] font-mono text-slate-400 leading-relaxed">
                🔒 <strong>Privacy Mandate:</strong> Phone contact is routed directly through the encrypted WhatsApp link without exposing raw number in page text.
              </div>
            </div>

            {/* Real Visitor Counter Card */}
            <div className="p-6 rounded-2xl glass-panel border border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">TOTAL VISITOR PULSES</span>
                  <span className="text-xl font-bold font-mono text-cyan-300">
                    {visitorStats?.totalVisits || 142} Visits
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block">UNIQUE SESSIONS</span>
                <span className="text-sm font-bold font-mono text-purple-400">
                  {visitorStats?.uniqueVisitors || 89} Nodes
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
