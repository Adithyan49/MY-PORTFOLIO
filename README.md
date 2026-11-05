# Adithyan – Immersive 3D AI/ML Developer Portfolio

> "Code. Create. Innovate. Repeat."

A cinematic, futuristic personal portfolio and interactive developer hub for **Adithyan**, an aspiring AI/ML Engineer and first-year B.Tech student in Artificial Intelligence and Data Science at Sri Eshwar College of Engineering, Pollachi / Coimbatore, Tamil Nadu, India.

---

## 🌟 Key Features

1. **Futuristic AI Universe 3D Scene**:
   - Built with Three.js WebGL rendering with emerald neon & cyber lighting.
   - 3 Switchable environments: **3D Cosmos**, **Normal Simple Dark**, and **Light Mode**.
   - Procedural Holographic 3D Avatar that responds to pointer movement and supports photo projection.

2. **Supabase PostgreSQL & Authentication Integration**:
   - Official `@supabase/supabase-js` client SDK and server-side connection.
   - User Registration (Email + Password).
   - User Login (Email + Password).
   - Google OAuth Authentication.
   - Forgot Password & Password Recovery link dispatch.
   - Session persistence on page reloads (`onAuthStateChange` + localStorage).
   - Automatic `user_profiles` table trigger.
   - Row Level Security (RLS) policies on all tables so users only access their own private data.
   - Master Admin authorization for Adithyan (`adithyanadhi2998@gmail.com`).

3. **Grounded AI Assistant (Gemini 3.8 Flash)**:
   - Server-side AI assistant strictly trained on Adithyan's real background, projects, college, and hackathons.
   - Built-in rule-based offline fallback engine.

4. **Live Developer Statistics**:
   - Direct integration with GitHub API (`Adithyan49`).
   - Profile links to LeetCode, HackerRank, CodeChef, Unstop, Kaggle, and GeeksforGeeks.

5. **Projects, Hackathons & Certificates**:
   - AgriSaarthi AI, QShield (Quantum-inspired security explorer), Smart Blind Stick (Arduino assistive device), and 3D Portfolio.
   - Transparent participation records for AI Agent Hackathon 2026 and Fund My Crazy 2.0.
   - Certificate gallery with preview modal and downloads.

6. **Direct Mobile Phone & WhatsApp**:
   - Direct plain text phone line: `+91 9659007117`.
   - Direct WhatsApp quick chat button to `+91 9659007117`.

---

## ⚡ Supabase Dashboard Configuration

### Step 1: Create a Project in Supabase
1. Go to [supabase.com](https://supabase.com) and create a free project.
2. Under **Project Settings → API**, copy your:
   - **Project URL** (e.g. `https://xyzcompany.supabase.co`)
   - **anon / public key** (e.g. `eyJhbGciOiJIUzI1NiIsIn...`)

### Step 2: Configure Environment Variables
In AI Studio, add these two entries in the **Secrets** panel:

```env
SUPABASE_URL="https://your-project-id.supabase.co"
SUPABASE_PUBLISHABLE_KEY="your-anon-public-key"
```

*(Note: Never expose `service_role` secret keys in client code; the backend protects secrets and serves the publishable key securely).*

### Step 3: Run Database Schema & RLS in Supabase
1. In your Supabase Dashboard, open the **SQL Editor** tab from the left navigation.
2. Click **New Query**, copy the contents of `supabase-schema.sql` from this repository, paste it into the editor, and click **Run**.
3. This creates all 10 tables, enables Row Level Security (RLS), adds security policies, and sets up the automatic user profile trigger for new registrations.

### Step 4: Enable Google Authentication (Optional)
1. In your Supabase Dashboard, go to **Authentication → Providers → Google**.
2. Toggle **Enable Google provider**, paste your Google OAuth Client ID and Secret, and click **Save**.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start full-stack development server (Express + Vite)
npm run dev

# 3. Open in browser
http://localhost:3000
```
