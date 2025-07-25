import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sbipowttqikulqwswyta.supabase.co'; // Ganti dengan URL Supabase-mu
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiaXBvd3R0cWlrdWxxd3N3eXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NjE1NTcsImV4cCI6MjA2NjEzNzU1N30.teJOrbk96Fu5bQKkgiD4rcM2pdsqEBvxYuODq3bXR3A'; // Ganti dengan anon key dari dashboard Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
