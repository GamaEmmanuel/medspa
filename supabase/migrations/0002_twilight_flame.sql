/*
  # Add marketing preferences to clients table

  1. Changes
    - Add marketing_preferences column to clients table with allowed values:
      - 'email'
      - 'phone'
      - 'sms'
      - 'mail'
      - 'none'
    
  2. Notes
    - Default value is 'none' for new clients
    - Existing clients will have NULL value until updated
*/

DO $$ BEGIN
  -- Add marketing_preferences column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'clients' AND column_name = 'marketing_preferences'
  ) THEN
    ALTER TABLE clients 
    ADD COLUMN marketing_preferences text 
    DEFAULT 'none'
    CHECK (marketing_preferences IN ('email', 'phone', 'sms', 'mail', 'none'));
  END IF;
END $$;