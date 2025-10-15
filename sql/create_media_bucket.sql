-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload media files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'media' AND
    auth.role() = 'authenticated'
  );

-- Create policy to allow public access to read media files
CREATE POLICY "Allow public access to read media files" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

-- Create policy to allow authenticated users to delete their own files
CREATE POLICY "Allow authenticated users to delete media files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'media' AND
    auth.role() = 'authenticated'
  );
