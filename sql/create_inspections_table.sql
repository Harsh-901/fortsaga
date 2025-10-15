-- Create inspections table for storing scheduled fort inspections
CREATE TABLE IF NOT EXISTS inspections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fort TEXT NOT NULL,
  inspection_type TEXT NOT NULL,
  inspector TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  description TEXT NOT NULL,
  equipment TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_inspections_fort ON inspections(fort);
CREATE INDEX IF NOT EXISTS idx_inspections_status ON inspections(status);
CREATE INDEX IF NOT EXISTS idx_inspections_priority ON inspections(priority);
CREATE INDEX IF NOT EXISTS idx_inspections_date ON inspections(date);
CREATE INDEX IF NOT EXISTS idx_inspections_created_at ON inspections(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read inspections
CREATE POLICY "Allow authenticated users to read inspections" ON inspections
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy for authenticated users to insert inspections
CREATE POLICY "Allow authenticated users to insert inspections" ON inspections
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy for authenticated users to update inspections
CREATE POLICY "Allow authenticated users to update inspections" ON inspections
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy for authenticated users to delete inspections
CREATE POLICY "Allow authenticated users to delete inspections" ON inspections
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_inspections_updated_at BEFORE UPDATE ON inspections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
