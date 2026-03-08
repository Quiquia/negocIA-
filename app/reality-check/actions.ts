"use server";

import { supabase } from "@/core/lib/supabase";
import {
  estimateSalary,
  type SalaryEstimate,
} from "@/core/lib/salary-estimator";
import type { SalarySubmission } from "@/core/types/database";

export type RealityCheckResult = {
  success: true;
  submission: SalarySubmission;
  estimate: SalaryEstimate;
} | {
  success: false;
  error: string;
};

/**
 * Fetches a specific salary submission by ID and runs the AI analysis.
 */
export async function analyzeProfile(submissionId: string): Promise<RealityCheckResult> {
  if (!submissionId) {
    return { success: false, error: "No se proporcionó un ID de perfil." };
  }

  const { data: submission, error } = await supabase
    .from("salary_submissions")
    .select("*")
    .eq("id", submissionId)
    .single();

  if (error || !submission) {
    return { success: false, error: error?.message ?? "No se encontró el perfil." };
  }

  try {
    const estimate = await estimateSalary(submission as SalarySubmission);
    return { success: true, submission: submission as SalarySubmission, estimate };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al analizar el perfil.";
    return { success: false, error: message };
  }
}
