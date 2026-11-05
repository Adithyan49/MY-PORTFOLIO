-- ==============================================================================
-- ADITHYAN PORTFOLIO - SUPABASE POSTGRESQL SCHEMA & SECURITY CONFIGURATION
-- Designed for production deployment on Supabase PostgreSQL with RLS
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Public Portfolio Data for Adithyan)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT 'Adithyan',
  title TEXT NOT NULL DEFAULT 'AI & Data Science Student',
  degree TEXT NOT NULL DEFAULT 'B.Tech – Artificial Intelligence and Data Science',
  college TEXT NOT NULL DEFAULT 'Sri Eshwar College of Engineering',
  academic_year TEXT NOT NULL DEFAULT 'First Year',
  age INTEGER NOT NULL DEFAULT 18,
  location TEXT NOT NULL DEFAULT 'Pollachi, Coimbatore, Tamil Nadu, India',
  career_goal TEXT NOT NULL DEFAULT 'AI/ML Engineer',
  tagline TEXT NOT NULL DEFAULT 'Code. Create. Innovate. Repeat.',
  bio TEXT NOT NULL,
  avatar_url TEXT,
  resume_url TEXT,
  resume_available BOOLEAN DEFAULT FALSE,
  phone TEXT DEFAULT '+91 9659007117',
  show_phone_publicly BOOLEAN DEFAULT TRUE,
  email TEXT NOT NULL DEFAULT 'adithyanadhi2998@gmail.com',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. USER PROFILES TABLE (For Registered App Users & Admin Accounts)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user', -- 'admin' for adithyanadhi2998@gmail.com, 'user' for others
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'AI/ML', 'Web Development', 'Hardware', 'Cybersecurity'
  status TEXT NOT NULL,
  short_description TEXT NOT NULL,
  detailed_description TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  screenshots TEXT[] DEFAULT '{}',
  video_url TEXT,
  github_url TEXT,
  live_demo_url TEXT,
  completion_date TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Programming Languages', 'Web Development', 'Currently Learning'
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  description TEXT,
  status TEXT NOT NULL DEFAULT 'core', -- 'core', 'learning'
  display_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. COURSES & LEARNING TABLE
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  status TEXT NOT NULL, -- 'Completed', 'Ongoing'
  issuer TEXT,
  completion_date TEXT,
  description TEXT,
  skills_covered TEXT[] DEFAULT '{}',
  certificate_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. LEARNING MILESTONES TABLE
CREATE TABLE IF NOT EXISTS public.learning_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- 7. HACKATHONS TABLE
CREATE TABLE IF NOT EXISTS public.hackathons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  team_members TEXT,
  event_date TEXT NOT NULL,
  result TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  description TEXT NOT NULL,
  learnings TEXT,
  image_url TEXT,
  certificate_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 8. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  completion_date TEXT NOT NULL,
  description TEXT,
  preview_image_url TEXT,
  download_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 10. VISITOR STATS TABLE
CREATE TABLE IF NOT EXISTS public.visitor_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT NOT NULL DEFAULT '/',
  device_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_statistics ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES POLICIES
DROP POLICY IF EXISTS "Allow public read access on profiles" ON public.profiles;
CREATE POLICY "Allow public read access on profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admin full access on profiles" ON public.profiles;
CREATE POLICY "Allow authenticated admin full access on profiles" ON public.profiles 
  FOR ALL USING (
    (auth.jwt() ->> 'email') = 'adithyanadhi2998@gmail.com' 
    OR EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 2. USER PROFILES POLICIES (Users can only access their own private data)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
CREATE POLICY "Users can view their own profile" ON public.user_profiles 
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
CREATE POLICY "Users can update their own profile" ON public.user_profiles 
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
CREATE POLICY "Users can insert their own profile" ON public.user_profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Admins have full access on user_profiles" ON public.user_profiles;
CREATE POLICY "Admins have full access on user_profiles" ON public.user_profiles 
  FOR ALL USING (
    (auth.jwt() ->> 'email') = 'adithyanadhi2998@gmail.com' 
    OR EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 3. PROJECTS POLICIES
DROP POLICY IF EXISTS "Allow public read access on projects" ON public.projects;
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admin full access on projects" ON public.projects;
CREATE POLICY "Allow authenticated admin full access on projects" ON public.projects 
  FOR ALL USING (
    (auth.jwt() ->> 'email') = 'adithyanadhi2998@gmail.com' 
    OR EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 4. SKILLS POLICIES
DROP POLICY IF EXISTS "Allow public read access on skills" ON public.skills;
CREATE POLICY "Allow public read access on skills" ON public.skills FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admin full access on skills" ON public.skills;
CREATE POLICY "Allow authenticated admin full access on skills" ON public.skills 
  FOR ALL USING (
    (auth.jwt() ->> 'email') = 'adithyanadhi2998@gmail.com' 
    OR EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 5. COURSES POLICIES
DROP POLICY IF EXISTS "Allow public read access on courses" ON public.courses;
CREATE POLICY "Allow public read access on courses" ON public.courses FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admin full access on courses" ON public.courses;
CREATE POLICY "Allow authenticated admin full access on courses" ON public.courses 
  FOR ALL USING (
    (auth.jwt() ->> 'email') = 'adithyanadhi2998@gmail.com' 
    OR EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 6. MILESTONES POLICIES
DROP POLICY IF EXISTS "Allow public read access on learning_milestones" ON public.learning_milestones;
CREATE POLICY "Allow public read access on learning_milestones" ON public.learning_milestones FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admin full access on learning_milestones" ON public.learning_milestones;
CREATE POLICY "Allow authenticated admin full access on learning_milestones" ON public.learning_milestones 
  FOR ALL USING (
    (auth.jwt() ->> 'email') = 'adithyanadhi2998@gmail.com' 
    OR EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 7. HACKATHONS POLICIES
DROP POLICY IF EXISTS "Allow public read access on hackathons" ON public.hackathons;
CREATE POLICY "Allow public read access on hackathons" ON public.hackathons FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admin full access on hackathons" ON public.hackathons;
CREATE POLICY "Allow authenticated admin full access on hackathons" ON public.hackathons 
  FOR ALL USING (
    (auth.jwt() ->> 'email') = 'adithyanadhi2998@gmail.com' 
    OR EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 8. CERTIFICATES POLICIES
DROP POLICY IF EXISTS "Allow public read access on certificates" ON public.certificates;
CREATE POLICY "Allow public read access on certificates" ON public.certificates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admin full access on certificates" ON public.certificates;
CREATE POLICY "Allow authenticated admin full access on certificates" ON public.certificates 
  FOR ALL USING (
    (auth.jwt() ->> 'email') = 'adithyanadhi2998@gmail.com' 
    OR EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 9. CONTACT MESSAGES POLICIES
DROP POLICY IF EXISTS "Allow public insert on contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public insert on contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can read their own contact messages" ON public.contact_messages;
CREATE POLICY "Users can read their own contact messages" ON public.contact_messages 
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow authenticated admin full access on contact_messages" ON public.contact_messages;
CREATE POLICY "Allow authenticated admin full access on contact_messages" ON public.contact_messages 
  FOR ALL USING (
    (auth.jwt() ->> 'email') = 'adithyanadhi2998@gmail.com' 
    OR EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 10. VISITOR STATISTICS POLICIES
DROP POLICY IF EXISTS "Allow public insert on visitor_statistics" ON public.visitor_statistics;
CREATE POLICY "Allow public insert on visitor_statistics" ON public.visitor_statistics FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated admin read on visitor_statistics" ON public.visitor_statistics;
CREATE POLICY "Allow authenticated admin read on visitor_statistics" ON public.visitor_statistics 
  FOR SELECT USING (
    (auth.jwt() ->> 'email') = 'adithyanadhi2998@gmail.com' 
    OR EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ==============================================================================
-- AUTOMATIC USER PROFILE TRIGGER
-- Auto-creates user_profile row whenever someone registers via Supabase Auth
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    CASE WHEN new.email = 'adithyanadhi2998@gmail.com' THEN 'admin' ELSE 'user' END
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = NOW();
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
