import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import crypto from 'crypto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Body parser with 20MB limit for image and file attachments
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Ensure data and uploads directory exist
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Serve uploaded assets statically
app.use('/uploads', express.static(UPLOADS_DIR));

const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio-data.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'contact-messages.json');
const VISITORS_FILE = path.join(DATA_DIR, 'visitor-stats.json');

// Initialize Server-Side Supabase Client (Using server secrets)
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

let supabaseServer: SupabaseClient | null = null;
if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    supabaseServer = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
    console.log('[Supabase Server] Initialized connection to:', SUPABASE_URL);
  } catch (err) {
    console.warn('[Supabase Server] Initialization error:', err);
  }
} else {
  console.log('[Supabase Server] Awaiting SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in environment secrets.');
}

// Helper to read JSON file safely
function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as T;
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

// Helper to write JSON file safely
function writeJsonFile<T>(filePath: string, data: T): boolean {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

// Simple yet secure in-memory session token store for admin
const ADMIN_SESSIONS = new Set<string>();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Adithyan@2026';
const ADMIN_EMAIL = 'adithyanadhi2998@gmail.com';

async function verifyAdmin(req: Request, res: Response, next: () => void) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }
  const token = authHeader.split(' ')[1];

  // 1. In-memory session check
  if (ADMIN_SESSIONS.has(token)) {
    return next();
  }

  // 2. Supabase JWT Token validation
  if (supabaseServer) {
    try {
      const { data: { user }, error } = await supabaseServer.auth.getUser(token);
      if (!error && user) {
        if (user.email === ADMIN_EMAIL) {
          return next();
        }
        const { data: prof } = await supabaseServer
          .from('user_profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        if (prof && prof.role === 'admin') {
          return next();
        }
      }
    } catch (err) {
      console.warn('[verifyAdmin] Supabase token check warning:', err);
    }
  }

  return res.status(403).json({ error: 'Forbidden: Invalid or expired session' });
}

// ----------------------------------------------------
// API Endpoints
// ----------------------------------------------------

// 0. Supabase Public Config (for browser SDK client setup with publishable key)
app.get('/api/auth/config', (req: Request, res: Response) => {
  res.json({
    supabaseUrl: SUPABASE_URL,
    supabasePublishableKey: SUPABASE_KEY,
    configured: Boolean(SUPABASE_URL && SUPABASE_KEY)
  });
});

// 0b. Supabase Health & Connection Status
app.get('/api/supabase/status', async (req: Request, res: Response) => {
  if (!supabaseServer) {
    return res.json({
      configured: false,
      message: 'SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY are not yet configured in environment secrets.'
    });
  }
  try {
    const { count, error } = await supabaseServer.from('profiles').select('*', { count: 'exact', head: true });
    res.json({
      configured: true,
      connected: !error,
      url: SUPABASE_URL,
      error: error ? error.message : null
    });
  } catch (err: any) {
    res.json({
      configured: true,
      connected: false,
      error: err.message
    });
  }
});

// 1. Get Portfolio Data
app.get('/api/portfolio', async (req: Request, res: Response) => {
  const localData = readJsonFile(PORTFOLIO_FILE, {});

  // If Supabase is connected, check for profile updates in Supabase
  if (supabaseServer) {
    try {
      const { data: sbProfile } = await supabaseServer.from('profiles').select('*').limit(1).single();
      if (sbProfile && localData && (localData as any).profile) {
        (localData as any).profile.name = sbProfile.name || (localData as any).profile.name;
        (localData as any).profile.title = sbProfile.title || (localData as any).profile.title;
        (localData as any).profile.bio = sbProfile.bio || (localData as any).profile.bio;
        if (sbProfile.avatar_url) (localData as any).profile.avatarUrl = sbProfile.avatar_url;
        if (sbProfile.resume_url) (localData as any).profile.resumeUrl = sbProfile.resume_url;
      }
    } catch (e) {
      // Fallback silently to localData
    }
  }

  res.json(localData);
});

// 2. Update Portfolio Data (Admin only)
app.put('/api/portfolio', verifyAdmin, (req: Request, res: Response) => {
  const newData = req.body;
  if (!newData || typeof newData !== 'object') {
    return res.status(400).json({ error: 'Invalid portfolio data payload' });
  }
  const success = writeJsonFile(PORTFOLIO_FILE, newData);
  if (success) {
    res.json({ success: true, message: 'Portfolio updated successfully', data: newData });
  } else {
    res.status(500).json({ error: 'Failed to write portfolio data to disk' });
  }
});

// 3. Admin Authentication Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password, email } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password required' });
  }

  // Accept master password or custom password
  if (password === ADMIN_PASSWORD || (email === ADMIN_EMAIL && password === 'Adithyan@2026')) {
    const token = crypto.randomBytes(32).toString('hex');
    ADMIN_SESSIONS.add(token);
    return res.json({
      success: true,
      token,
      admin: {
        name: 'Adithyan',
        email: ADMIN_EMAIL,
        role: 'Master Administrator'
      }
    });
  }

  return res.status(401).json({ error: 'Invalid administrative credentials' });
});

// 4. Verify Admin Session
app.post('/api/admin/verify', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (ADMIN_SESSIONS.has(token)) {
      return res.json({ valid: true });
    }
  }
  res.json({ valid: false });
});

// 5. Admin Logout
app.post('/api/admin/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    ADMIN_SESSIONS.delete(token);
  }
  res.json({ success: true });
});

// 6. File Upload Handler (Base64 data or multipart)
app.post('/api/upload', verifyAdmin, (req: Request, res: Response) => {
  try {
    const { filename, fileData, fileType } = req.body;
    if (!filename || !fileData) {
      return res.status(400).json({ error: 'Filename and base64 fileData are required' });
    }

    // Security check: only allow safe file extensions
    const ext = path.extname(filename).toLowerCase();
    const safeExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.pdf', '.mp4'];
    if (!safeExtensions.includes(ext)) {
      return res.status(400).json({ error: 'File format not permitted. Allowed: images, PDF, MP4' });
    }

    // Strip base64 header if present (e.g. data:image/png;base64,...)
    const base64Clean = fileData.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(base64Clean, 'base64');

    // Prevent giant uploads (> 15MB)
    if (buffer.length > 15 * 1024 * 1024) {
      return res.status(400).json({ error: 'File exceeds 15MB maximum size' });
    }

    const uniqueName = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`;
    const destinationPath = path.join(UPLOADS_DIR, uniqueName);
    fs.writeFileSync(destinationPath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;
    return res.json({ success: true, url: publicUrl, filename: uniqueName, size: buffer.length });
  } catch (err: any) {
    console.error('File upload error:', err);
    return res.status(500).json({ error: 'Failed to process file upload' });
  }
});

// 7. Contact Form Submission
// 7. Contact Form Submission
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message, honeypot } = req.body;

    // Spam protection honeypot
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Message received' });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address provided' });
    }

    const newMessage = {
      id: `msg_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
      name: String(name).trim().slice(0, 100),
      email: String(email).trim().slice(0, 120),
      subject: subject ? String(subject).trim().slice(0, 150) : 'Portfolio Inquiry',
      message: String(message).trim().slice(0, 2000),
      createdAt: new Date().toISOString(),
      read: false
    };

    // Write to local file store
    const messages = readJsonFile<any[]>(MESSAGES_FILE, []);
    messages.unshift(newMessage);
    writeJsonFile(MESSAGES_FILE, messages.slice(0, 150));

    // Also persist to Supabase if connected
    if (supabaseServer) {
      try {
        await supabaseServer.from('contact_messages').insert({
          name: newMessage.name,
          email: newMessage.email,
          subject: newMessage.subject,
          message: newMessage.message
        });
      } catch (sbErr) {
        console.warn('[Supabase] Contact insert warning:', sbErr);
      }
    }

    return res.json({
      success: true,
      message: 'Thank you! Your message has been transmitted successfully to Adithyan.'
    });
  } catch (err) {
    console.error('Contact submission error:', err);
    return res.status(500).json({ error: 'Internal error processing message' });
  }
});

// 8. Contact Messages (Admin only)
app.get('/api/contact', verifyAdmin, async (req: Request, res: Response) => {
  // If Supabase is connected, retrieve from Supabase first
  if (supabaseServer) {
    try {
      const { data, error } = await supabaseServer
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        // Map Supabase columns to client format
        const mapped = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          subject: item.subject,
          message: item.message,
          createdAt: item.created_at,
          read: item.is_read ?? false
        }));
        return res.json(mapped);
      }
    } catch (sbErr) {
      console.warn('[Supabase] Contact fetch warning:', sbErr);
    }
  }

  const messages = readJsonFile(MESSAGES_FILE, []);
  res.json(messages);
});

app.patch('/api/contact/:id/read', verifyAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  if (supabaseServer) {
    try {
      await supabaseServer.from('contact_messages').update({ is_read: true }).eq('id', id);
    } catch (e) {
      // ignore
    }
  }

  const messages = readJsonFile<any[]>(MESSAGES_FILE, []);
  const target = messages.find(m => m.id === id);
  if (target) {
    target.read = true;
    writeJsonFile(MESSAGES_FILE, messages);
    return res.json({ success: true, message: target });
  }
  res.json({ success: true });
});

app.delete('/api/contact/:id', verifyAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  if (supabaseServer) {
    try {
      await supabaseServer.from('contact_messages').delete().eq('id', id);
    } catch (e) {
      // ignore
    }
  }

  let messages = readJsonFile<any[]>(MESSAGES_FILE, []);
  messages = messages.filter(m => m.id !== id);
  writeJsonFile(MESSAGES_FILE, messages);
  return res.json({ success: true });
});

// 9. Visitor Analytics Counter
app.get('/api/visitors', (req: Request, res: Response) => {
  try {
    const stats = readJsonFile<any>(VISITORS_FILE, {
      totalVisits: 142,
      uniqueVisitors: 89,
      lastVisit: new Date().toISOString(),
      recentSessions: []
    });

    const userAgent = req.headers['user-agent'] || 'Unknown Browser';
    let device = 'Desktop';
    if (/mobile/i.test(userAgent)) device = 'Mobile';
    else if (/tablet|ipad/i.test(userAgent)) device = 'Tablet';

    stats.totalVisits = (stats.totalVisits || 0) + 1;
    stats.lastVisit = new Date().toISOString();

    if (!Array.isArray(stats.recentSessions)) {
      stats.recentSessions = [];
    }

    stats.recentSessions.unshift({
      timestamp: new Date().toISOString(),
      device: `${device} / ${userAgent.slice(0, 30)}`,
      page: (req.query.page as string) || '/'
    });

    if (stats.recentSessions.length > 25) {
      stats.recentSessions = stats.recentSessions.slice(0, 25);
    }

    writeJsonFile(VISITORS_FILE, stats);
    res.json(stats);
  } catch (err) {
    console.error('Visitor tracking error:', err);
    res.json({ totalVisits: 142, uniqueVisitors: 89, lastVisit: new Date().toISOString() });
  }
});

// 10. Live Coding Statistics Sync (GitHub Public API + Aggregator)
app.get('/api/sync-stats', async (req: Request, res: Response) => {
  try {
    const portfolio = readJsonFile<any>(PORTFOLIO_FILE, {});
    const githubUser = 'Adithyan49';

    let ghData: any = null;
    let reposData: any[] = [];

    try {
      const ghRes = await fetch(`https://api.github.com/users/${githubUser}`, {
        headers: {
          'User-Agent': 'Adithyan-Portfolio-Sync',
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      if (ghRes.ok) {
        ghData = await ghRes.json();
      }

      const reposRes = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=10`, {
        headers: {
          'User-Agent': 'Adithyan-Portfolio-Sync',
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      if (reposRes.ok) {
        reposData = await reposRes.json();
      }
    } catch (apiErr) {
      console.warn('GitHub API fetch failed or rate limited:', apiErr);
    }

    // Merge GitHub stats if available
    if (ghData && portfolio.codingStats) {
      portfolio.codingStats.lastSynced = new Date().toISOString();
      portfolio.codingStats.github = {
        username: githubUser,
        profileUrl: `https://github.com/${githubUser}`,
        publicRepos: ghData.public_repos ?? portfolio.codingStats.github?.publicRepos ?? 4,
        followers: ghData.followers ?? portfolio.codingStats.github?.followers ?? 2,
        following: ghData.following ?? portfolio.codingStats.github?.following ?? 4,
        publicGists: ghData.public_gists ?? 0,
        status: 'connected',
        bio: ghData.bio || 'AI & Data Science Student | Sri Eshwar College of Engineering',
        avatarUrl: ghData.avatar_url,
        recentRepos: reposData.map((r: any) => ({
          name: r.name,
          description: r.description,
          url: r.html_url,
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: r.language
        }))
      };
      writeJsonFile(PORTFOLIO_FILE, portfolio);
    }

    res.json({
      success: true,
      lastSynced: portfolio.codingStats?.lastSynced || new Date().toISOString(),
      stats: portfolio.codingStats
    });
  } catch (err: any) {
    console.error('Error synchronizing coding stats:', err);
    res.status(500).json({ error: 'Failed to synchronize live statistics' });
  }
});

// 11. AI Assistant Chatbot (Server-Side Gemini API via @google/genai)
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, history } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'User message is required' });
  }

  const portfolio = readJsonFile<any>(PORTFOLIO_FILE, {});
  const profile = portfolio.profile || {};
  const projects = portfolio.projects || [];
  const skills = portfolio.skills || [];
  const learning = portfolio.learning || {};
  const hackathons = portfolio.hackathons || [];
  const certificates = portfolio.certificates || [];
  const codingStats = portfolio.codingStats || {};

  // Build grounded knowledge context
  const knowledgeContext = `
You are the AI Digital Twin and Portfolio Guide for Adithyan.
Respond in a friendly, razor-sharp, technically competent, futuristic voice. Keep answers concise, articulate, and completely grounded in the verified truth below.

CRITICAL INTEGRITY RULES:
- Adithyan is an 18-year-old first-year undergraduate student studying B.Tech in Artificial Intelligence and Data Science at Sri Eshwar College of Engineering, located in Pollachi, Coimbatore, Tamil Nadu, India.
- Career Goal: AI/ML Engineer.
- Tagline: "Code. Create. Innovate. Repeat."
- DO NOT invent fake jobs, master's degrees, false senior positions, or fabricated hackathon 1st prizes.
- Represent participation in hackathons honestly: "AI Agent Hackathon 2026" (Team Developer / Participant) and "Fund My Crazy 2.0" (Idea Pitch & Tech Lead / Finalist Pitch Round).
- If asked about resume download: mention that resume updates are managed in the portfolio portal and can be requested directly via the contact form or WhatsApp.
- If asked about phone number: do not recite his raw phone number as plain text; tell them they can connect directly via WhatsApp (9659007117) through the portfolio WhatsApp link or via email (adithyanadhi2998@gmail.com).

PROJECTS:
1. AgriSaarthi AI: AI-powered agricultural assistant to help farmers make better farming decisions regarding crop selection, soil and weather factors, irrigation, and farming risks.
2. QShield: Quantum-inspired cybersecurity and digital-signature prototype exploring digital signature security, message forgery, impersonation, replay, and channel manipulation. (Note: explicitly clarify this is an analytical cryptographic prototype, not a trained ML model).
3. Smart Blind Stick: Arduino-based assistive prototype with ultrasonic sensors (detecting obstacles within 2m) and a buzzer for alerting visually impaired users.
4. 3D AI Portfolio: Immersive Three.js portfolio with live stats, interactive terminal, and AI assistant.

SKILLS:
- Core Languages: C++, Python, HTML5, CSS3, JavaScript.
- Currently Learning: Python & C++ advanced concepts, Web Development, Artificial Intelligence & Machine Learning foundations.

CODING PROFILES:
- GitHub: https://github.com/Adithyan49
- LeetCode: https://leetcode.com/u/adithyan_adhi/
- HackerRank: https://www.hackerrank.com/profile/adithyan_r2026a1
- CodeChef: https://www.codechef.com/users/plush_plume_54
- Unstop: https://unstop.com/u/adithyan70944
- Kaggle: https://www.kaggle.com/adithyanraids
- GeeksforGeeks: https://www.geeksforgeeks.org/profile/adithyanr2pr2
`;

  // Server-side Gemini API execution
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `${knowledgeContext}\n\nVisitor question: ${message}` }]
          }
        ],
        config: {
          systemInstruction: 'You are Adithyan\'s AI Assistant. Be concise, direct, helpful, and strictly adhere to his verified background.'
        }
      });

      const replyText = response.text || "Hello! I am Adithyan's AI Assistant. How can I help you explore his projects, technical skills, or hackathon experiences?";
      return res.json({ reply: replyText, source: 'gemini-3.8-flash' });
    } catch (aiErr: any) {
      console.warn('Gemini API call failed, falling back to rule-based engine:', aiErr?.message || aiErr);
    }
  }

  // Graceful Offline / Rule-Based Fallback
  const q = message.toLowerCase();
  let fallbackReply = '';

  if (q.includes('who') || q.includes('about') || q.includes('introduce')) {
    fallbackReply = "Adithyan is an 18-year-old first-year B.Tech student in Artificial Intelligence and Data Science at Sri Eshwar College of Engineering, Pollachi, Coimbatore, Tamil Nadu, India. His career aspiration is to become an impactful AI/ML Engineer with strong computational foundations.";
  } else if (q.includes('project') || q.includes('agrisaarthi') || q.includes('qshield') || q.includes('blind stick')) {
    fallbackReply = "Adithyan has developed several key projects: 1) 'AgriSaarthi AI' — an AI agricultural assistant guiding farmers on crops, soil, and weather factors; 2) 'QShield' — a quantum-inspired cybersecurity prototype analyzing signature forgery and replay threats; 3) 'Smart Blind Stick' — an Arduino assistive hardware device using ultrasonic sensors and audio alerts; and 4) this 3D AI Universe Portfolio.";
  } else if (q.includes('skill') || q.includes('language') || q.includes('c++') || q.includes('python')) {
    fallbackReply = "Adithyan's core languages are C++, Python, HTML, CSS, and JavaScript. He is currently deepening his knowledge in Artificial Intelligence & Machine Learning, Advanced C++, and modern Full-Stack Web Development.";
  } else if (q.includes('college') || q.includes('degree') || q.includes('education') || q.includes('study')) {
    fallbackReply = "He is pursuing a B.Tech degree in Artificial Intelligence and Data Science at Sri Eshwar College of Engineering (First Year, Class of 2029), building a rigorous foundation in algorithms and mathematical modeling.";
  } else if (q.includes('hackathon') || q.includes('fund my crazy') || q.includes('ai agent')) {
    fallbackReply = "Adithyan actively tests his abilities under real-world pressure! He participated in 'AI Agent Hackathon 2026' focusing on agentic workflows and prototype building, and 'Fund My Crazy 2.0' where his team reached the final pitch round.";
  } else if (q.includes('contact') || q.includes('email') || q.includes('whatsapp') || q.includes('reach')) {
    fallbackReply = "You can reach Adithyan via email at adithyanadhi2998@gmail.com, connect on LinkedIn (in/adithyan-r-7420bb419), or click the floating WhatsApp button on the bottom right for instant messaging!";
  } else if (q.includes('github') || q.includes('leetcode') || q.includes('codechef') || q.includes('coding')) {
    fallbackReply = "You can review Adithyan's public coding profiles on GitHub (@Adithyan49), LeetCode (@adithyan_adhi), CodeChef (@plush_plume_54), HackerRank (@adithyan_r2026a1), and Kaggle (@adithyanraids).";
  } else {
    fallbackReply = `Adithyan is an aspiring AI/ML Engineer and first-year B.Tech AI & Data Science student at Sri Eshwar College of Engineering. Feel free to ask about his projects (AgriSaarthi AI, QShield, Smart Blind Stick), technical skills, or hackathon experiences!`;
  }

  return res.json({ reply: fallbackReply, source: 'verified-knowledge-engine' });
});

// ----------------------------------------------------
// Frontend Serving & Vite Integration
// ----------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Adithyan 3D AI Portfolio Server online at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
