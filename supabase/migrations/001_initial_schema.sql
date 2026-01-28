-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PROFILES TABLE
-- ============================================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  skills TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  total_upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PROJECTS TABLE
-- ============================================================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT,
  demo_url TEXT NOT NULL,
  github_url TEXT NOT NULL,
  thumbnail_url TEXT,
  tags TEXT[] DEFAULT '{}',
  tools_used TEXT[] DEFAULT '{}',
  upvotes INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'featured')),
  grant_submission BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  launched_at DATE
);

-- ============================================================================
-- UPVOTES TABLE
-- ============================================================================
CREATE TABLE upvotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, project_id)
);

-- ============================================================================
-- RESOURCES TABLE
-- ============================================================================
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('tutorial', 'tool', 'course', 'article', 'video')),
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  tags TEXT[] DEFAULT '{}',
  upvotes INTEGER DEFAULT 0,
  submitted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- GRANTS TABLE
-- ============================================================================
CREATE TABLE grants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  prize_amount INTEGER NOT NULL,
  deadline TIMESTAMPTZ,
  requirements TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'judging', 'completed')),
  winner_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  sponsor_name TEXT,
  sponsor_logo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- GRANT SUBMISSIONS TABLE
-- ============================================================================
CREATE TABLE grant_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  grant_id UUID REFERENCES grants(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  pitch TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'winner', 'rejected')),
  UNIQUE(grant_id, project_id)
);

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX idx_projects_author ON projects(author_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_upvotes ON projects(upvotes DESC);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_upvotes_user ON upvotes(user_id);
CREATE INDEX idx_upvotes_project ON upvotes(project_id);
CREATE INDEX idx_resources_category ON resources(category);
CREATE INDEX idx_grants_status ON grants(status);
CREATE INDEX idx_grant_submissions_grant ON grant_submissions(grant_id);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, avatar_url, github_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'user_name', 'user_' || substr(NEW.id::text, 1, 8)),
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    CASE
      WHEN NEW.raw_user_meta_data->>'user_name' IS NOT NULL
      THEN 'https://github.com/' || (NEW.raw_user_meta_data->>'user_name')
      ELSE NULL
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update project upvotes count
CREATE OR REPLACE FUNCTION update_project_upvotes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE projects SET upvotes = upvotes + 1 WHERE id = NEW.project_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE projects SET upvotes = GREATEST(upvotes - 1, 0) WHERE id = OLD.project_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for upvotes
CREATE TRIGGER on_upvote_change
  AFTER INSERT OR DELETE ON upvotes
  FOR EACH ROW
  EXECUTE FUNCTION update_project_upvotes();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved projects are viewable"
  ON projects FOR SELECT
  USING (
    status IN ('approved', 'featured')
    OR author_id = auth.uid()
  );

CREATE POLICY "Users can insert own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = author_id);

-- Upvotes
ALTER TABLE upvotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Upvotes are viewable"
  ON upvotes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can upvote"
  ON upvotes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own upvotes"
  ON upvotes FOR DELETE
  USING (auth.uid() = user_id);

-- Resources
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Resources are viewable by everyone"
  ON resources FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can submit resources"
  ON resources FOR INSERT
  WITH CHECK (auth.uid() = submitted_by);

-- Grants
ALTER TABLE grants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Grants are viewable by everyone"
  ON grants FOR SELECT
  USING (true);

-- Grant Submissions
ALTER TABLE grant_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Grant submissions are viewable"
  ON grant_submissions FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can submit to grants"
  ON grant_submissions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE id = project_id
      AND author_id = auth.uid()
    )
  );
