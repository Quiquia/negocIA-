import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

/**
 * Server-side client using the publishable (anon) key.
 * This respects Row Level Security policies — use the service role key
 * only for admin operations that genuinely need to bypass RLS.
 */
export const supabase = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);
