/*
  # Initial Schema Setup

  1. New Tables
    - users (managed by Supabase Auth)
    - staff
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - name (text)
      - role (text)
      - specialties (text[])
      - created_at (timestamptz)
    - services
      - id (uuid, primary key)
      - name (text)
      - duration (integer)
      - price (integer)
      - description (text)
      - image_url (text)
      - created_at (timestamptz)
    - appointments
      - id (uuid, primary key)
      - client_id (uuid, references auth.users)
      - service_id (uuid, references services)
      - staff_id (uuid, references staff)
      - date (date)
      - time (time)
      - status (text)
      - notes (text)
      - created_at (timestamptz)
    - clients
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - name (text)
      - age (integer)
      - gender (text)
      - phone (text)
      - address_street (text)
      - address_city (text)
      - address_state (text)
      - address_zip (text)
      - medical_history (text)
      - preferences (text)
      - price_tier (text)
      - created_at (timestamptz)
    - transactions
      - id (uuid, primary key)
      - appointment_id (uuid, references appointments)
      - amount (integer)
      - payment_method (text)
      - status (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for staff and client access
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Staff table
CREATE TABLE staff (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'practitioner', 'receptionist')),
  specialties text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Services table
CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  duration integer NOT NULL,
  price integer NOT NULL,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Clients table
CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  age integer,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  phone text,
  address_street text,
  address_city text,
  address_state text,
  address_zip text,
  medical_history text,
  preferences text,
  price_tier text DEFAULT 'standard' CHECK (price_tier IN ('standard', 'preferred', 'vip')),
  created_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id uuid REFERENCES clients NOT NULL,
  service_id uuid REFERENCES services NOT NULL,
  staff_id uuid REFERENCES staff NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  status text NOT NULL CHECK (status IN ('upcoming', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Transactions table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id uuid REFERENCES appointments NOT NULL,
  amount integer NOT NULL,
  payment_method text NOT NULL,
  status text NOT NULL CHECK (status IN ('completed', 'refunded')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Staff Policies
CREATE POLICY "Staff can view all staff members"
  ON staff FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM staff s
    WHERE s.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage staff"
  ON staff FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM staff s
    WHERE s.user_id = auth.uid()
    AND s.role = 'admin'
  ));

-- Services Policies
CREATE POLICY "Services are viewable by all authenticated users"
  ON services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can manage services"
  ON services FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM staff s
    WHERE s.user_id = auth.uid()
  ));

-- Clients Policies
CREATE POLICY "Clients can view and edit their own profile"
  ON clients FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Staff can view all clients"
  ON clients FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM staff s
    WHERE s.user_id = auth.uid()
  ));

-- Appointments Policies
CREATE POLICY "Clients can view their own appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (client_id IN (
    SELECT id FROM clients
    WHERE user_id = auth.uid()
  ));

CREATE POLICY "Staff can view all appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM staff s
    WHERE s.user_id = auth.uid()
  ));

CREATE POLICY "Staff can manage appointments"
  ON appointments FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM staff s
    WHERE s.user_id = auth.uid()
  ));

-- Transactions Policies
CREATE POLICY "Clients can view their own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (appointment_id IN (
    SELECT id FROM appointments a
    JOIN clients c ON a.client_id = c.id
    WHERE c.user_id = auth.uid()
  ));

CREATE POLICY "Staff can view all transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM staff s
    WHERE s.user_id = auth.uid()
  ));

CREATE POLICY "Staff can manage transactions"
  ON transactions FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM staff s
    WHERE s.user_id = auth.uid()
  ));