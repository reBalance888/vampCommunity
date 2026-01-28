-- ============================================================================
-- SEED DATA FOR VAMP COMMUNITY
-- ============================================================================

-- Insert sample grant (Vamp Grant #1)
INSERT INTO grants (id, title, description, prize_amount, deadline, requirements, status, sponsor_name)
VALUES (
  'b7e3a8f0-1234-5678-9abc-def012345678',
  'Vamp Grant #1 - Community App',
  'Build the Vamp Community web app - a Product Hunt specifically for vibecoding.',
  5000,
  NOW() + INTERVAL '2 days',
  ARRAY[
    'Public demo link',
    'GitHub repo',
    'No wallet connect',
    'No personal data collection',
    'Built with vibecoding tools (Claude, Cursor, v0, etc.)'
  ],
  'active',
  'Vamp Community'
);

-- Note: Sample profiles and projects should be created through the UI or API
-- after setting up GitHub OAuth authentication, as they need valid auth.users references.

-- Sample resources (can be added without auth)
INSERT INTO resources (title, description, url, category, difficulty, tags, is_featured)
VALUES
  (
    'Getting Started with Claude Code',
    'The complete beginner''s guide to vibecoding with Claude - learn the fundamentals and best practices.',
    'https://docs.anthropic.com/claude/docs',
    'tutorial',
    'beginner',
    ARRAY['Claude', 'Basics', 'Getting Started'],
    true
  ),
  (
    'Cursor - AI Code Editor',
    'The AI-first code editor built for vibecoding with powerful AI assistance and code generation.',
    'https://cursor.sh',
    'tool',
    'beginner',
    ARRAY['Editor', 'AI', 'Productivity'],
    true
  ),
  (
    'v0 by Vercel',
    'Generate UI components with AI - the fastest way to build beautiful interfaces through vibecoding.',
    'https://v0.dev',
    'tool',
    'intermediate',
    ARRAY['UI', 'Components', 'Design'],
    true
  ),
  (
    'Bolt.new',
    'Full-stack AI development environment - build entire apps through natural language.',
    'https://bolt.new',
    'tool',
    'intermediate',
    ARRAY['Full-stack', 'AI', 'Development'],
    true
  ),
  (
    'Advanced Prompting Techniques',
    'Master the art of prompt engineering for vibecoding - learn advanced patterns and strategies.',
    'https://www.promptingguide.ai',
    'article',
    'advanced',
    ARRAY['Prompting', 'Advanced', 'Techniques'],
    false
  ),
  (
    'Building with AI Agents',
    'Comprehensive video course on creating autonomous AI agents for development workflows.',
    'https://www.youtube.com/watch?v=example',
    'video',
    'advanced',
    ARRAY['AI Agents', 'Automation', 'Advanced'],
    false
  );

-- Sample tags that can be used for projects
-- (These are just examples - actual tags are stored in project records)
COMMENT ON COLUMN projects.tags IS 'Common tags: AI Music, Productivity, Developer Tools, Games, Education, Finance, Social, Creative, Healthcare, Analytics';
COMMENT ON COLUMN projects.tools_used IS 'Common tools: Claude, Cursor, v0, Bolt, ChatGPT, Copilot, Windsurf, Replit, GitHub Copilot';
