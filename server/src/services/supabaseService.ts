import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string);
  }

  getSupabase() {
    return this.supabase;
  }
}

export default new SupabaseService();
