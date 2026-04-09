"use server";

import { supabase } from "@/core/lib/supabase";

/**
 * Total de envíos en salary_submissions (para métricas públicas en la landing).
 */
export async function getSalarySubmissionsCount(): Promise<number> {
  const { count, error } = await supabase
    .from("salary_submissions")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Supabase count salary_submissions:", error);
    return 0;
  }

  return count ?? 0;
}
