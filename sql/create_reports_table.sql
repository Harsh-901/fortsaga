-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    fort TEXT NOT NULL,
    category TEXT NOT NULL,
    urgency TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) if needed
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to insert reports
CREATE POLICY "Allow authenticated users to insert reports" ON reports
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy for authenticated users to select reports
CREATE POLICY "Allow authenticated users to select reports" ON reports
FOR SELECT USING (auth.role() = 'authenticated');
