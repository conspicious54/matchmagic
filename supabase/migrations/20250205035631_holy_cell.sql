-- Create user_photos table
CREATE TABLE IF NOT EXISTS user_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  storage_path text NOT NULL,
  original_name text NOT NULL,
  size integer NOT NULL,
  mime_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'failed')),
  metadata jsonb DEFAULT '{}'::jsonb,
  UNIQUE(user_id, storage_path)
);

-- Enable RLS
ALTER TABLE user_photos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own photos"
  ON user_photos
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own photos"
  ON user_photos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own photos"
  ON user_photos
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own photos"
  ON user_photos
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_photos_updated_at
  BEFORE UPDATE ON user_photos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();