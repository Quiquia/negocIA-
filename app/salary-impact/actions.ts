"use server";

import { supabase } from "@/lib/supabase";
import type { SalarySubmissionInsert } from "@/types/database";

/**
 * Guarda el perfil salarial en Supabase.
 *
 * Retorna el ID de la submission para redirigir a /reality-check?id=xxx
 */
export async function submitSalaryProfile(
  formData: FormData
): Promise<{ success: boolean; id?: string; error?: string }> {
  const submission: SalarySubmissionInsert = {
    accepted_terms: formData.get("acceptedTerms") === "on",
    role_area: (formData.get("roleArea") as string) || null,
    seniority: (formData.get("seniority") as string) || null,
    frontend_years_experience:
      (formData.get("frontendYearsExperience") as string) || null,
    main_technology: (formData.get("mainTechnology") as string) || null,
    technical_skills: (formData.get("technicalSkills") as string) || null,
    english_level: (formData.get("englishLevel") as string) || null,
    uses_english_current_job:
      (formData.get("usesEnglishCurrentJob") as string) || null,
    role_description: (formData.get("roleDescription") as string) || null,
    country: (formData.get("country") as string) || null,
    city: (formData.get("city") as string) || null,
    work_mode: (formData.get("workMode") as string) || null,
    company_type: (formData.get("companyType") as string) || null,
    employment_type: (formData.get("employmentType") as string) || null,
    work_schedule: (formData.get("workSchedule") as string) || null,
    company_scope: (formData.get("companyScope") as string) || null,
    monthly_salary_amount: formData.get("monthlySalaryAmount")
      ? Number(formData.get("monthlySalaryAmount"))
      : null,
    salary_currency: (formData.get("salaryCurrency") as string) || null,
    salary_type: (formData.get("salaryType") as string) || null,
    has_variable_compensation:
      formData.get("hasVariableCompensation") === "on" ? true : null,
    last_raise_period: (formData.get("lastRaisePeriod") as string) || null,
    negotiation_confidence:
      (formData.get("negotiationConfidence") as string) || null,
    wants_salary_negotiation_practice:
      formData.get("wantsSalaryNegotiationPractice") === "on" ? true : false,
  };

  const { data, error } = await supabase
    .from("salary_submissions")
    .insert(submission)
    .select("id")
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, error: error.message };
  }

  return { success: true, id: data.id };
}
