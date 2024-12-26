/*
  # Create services table

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `duration` (integer, required)
      - `price` (integer, required)
      - `description` (text, required)
      - `image` (text, required)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)

  2. Security
    - Enable RLS on services table
    - Add policies for:
      - Public read access
      - Authenticated staff members can create/update/delete
*/

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  duration integer NOT NULL,
  price integer NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Services are viewable by everyone" ON services
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage services
CREATE POLICY "Staff members can manage services" ON services
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Set up updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();