/*
  # Medical Spa Database Schema

  1. New Tables
    - clients
      - Personal and contact information
      - Membership details
      - Medical history
    - appointments
      - Booking details
      - Service and client references
      - Status tracking
    - staff
      - Staff member information
      - Role and specialties
    - payments
      - Transaction records
      - Payment status
      - References to appointments and clients

  2. Security
    - Enable RLS on all tables
    - Add policies for data access
    
  3. Relationships
    - Appointments link to clients and services
    - Payments link to appointments and clients
    - Staff members link to appointments
*/

-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  date_of_birth date,
  address jsonb,
  medical_history text,
  preferences text,
  membership_tier text DEFAULT 'standard',
  member_since timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Staff Table
CREATE TABLE IF NOT EXISTS staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid REFERENCES auth.users,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL,
  specialties text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_role CHECK (role IN ('admin', 'practitioner', 'receptionist'))
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) NOT NULL,
  service_id uuid REFERENCES services(id) NOT NULL,
  staff_id uuid REFERENCES staff(id),
  date date NOT NULL,
  time time NOT NULL,
  status text DEFAULT 'scheduled',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled'))
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid REFERENCES appointments(id) NOT NULL,
  client_id uuid REFERENCES clients(id) NOT NULL,
  amount integer NOT NULL,
  status text DEFAULT 'pending',
  payment_method text,
  transaction_id text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'completed', 'refunded', 'failed'))
);

-- Enable Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policies for Clients
CREATE POLICY "Clients are viewable by staff" ON clients
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Staff can manage clients" ON clients
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for Staff
CREATE POLICY "Staff profiles are viewable by authenticated users" ON staff
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage staff" ON staff
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Policies for Appointments
CREATE POLICY "Staff can view all appointments" ON appointments
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Staff can manage appointments" ON appointments
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for Payments
CREATE POLICY "Staff can view all payments" ON payments
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Staff can manage payments" ON payments
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Updated_at Triggers
CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER staff_updated_at
  BEFORE UPDATE ON staff
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();