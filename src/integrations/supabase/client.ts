import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = 'https://dhmyuocwbsohakkmoqdl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobXl1b2N3YnNvaGFra21vcWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMzQ2MDQsImV4cCI6MjA5NzkxMDYwNH0.UJkEL-Oc_PDEWSXn0fPMNPY60TnVtQjiINHhFmthJIk';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
