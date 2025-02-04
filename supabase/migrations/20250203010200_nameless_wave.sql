/*
  # Add plan status to user profiles

  1. Changes
    - Add `plan_status` column to `user_profiles` table
    - Default value is 'inactive'
    - Valid values: 'inactive', 'active'

  2. Security
    - Maintain existing RLS policies
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'plan_status'
  ) THEN
    ALTER TABLE user_profiles 
    ADD COLUMN plan_status text NOT NULL DEFAULT 'inactive' 
    CHECK (plan_status IN ('inactive', 'active'));
  END IF;
END $$;