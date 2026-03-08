import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

/** Server-side client using secret key — use only in server actions / API routes */
export const supabase = createClient(
  supabaseUrl,
  process.env.SUPABASE_SECRET_KEY!
);
