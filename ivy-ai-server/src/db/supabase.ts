import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database.types'
import 'dotenv/config'

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create typed Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export type SupabaseClient = typeof supabase 