import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

class SupabaseService {
	private supabase: SupabaseClient;

	constructor() {
		this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
	}

	getSupabase() {
		return this.supabase;
	}
}

export default new SupabaseService();
