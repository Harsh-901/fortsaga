-- Create media table for storing fort media files
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video', 'document')),
  size TEXT NOT NULL,
  fort TEXT NOT NULL,
  category TEXT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  uploaded_by TEXT NOT NULL,
  description TEXT,
  tags TEXT[],
  url TEXT NOT NULL,
  thumbnail TEXT
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_media_fort ON media(fort);
CREATE INDEX IF NOT EXISTS idx_media_type ON media(type);
CREATE INDEX IF NOT EXISTS idx_media_category ON media(category);
CREATE INDEX IF NOT EXISTS idx_media_upload_date ON media(upload_date DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read media
CREATE POLICY "Allow authenticated users to read media" ON media
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy for authenticated users to insert media
CREATE POLICY "Allow authenticated users to insert media" ON media
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy for authenticated users to delete their own uploads
CREATE POLICY "Allow authenticated users to delete media" ON media
  FOR DELETE USING (auth.role() = 'authenticated' AND uploaded_by = auth.jwt() ->> 'email');
