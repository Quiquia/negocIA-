export interface SalarySubmission {
  id?: string;
  created_at?: string;
  accepted_terms: boolean;
  role_area: string | null;
  seniority: string | null;
  frontend_years_experience: string | null;
  main_technology: string | null;
  technical_skills: string | null;
  english_level: string | null;
  uses_english_current_job: string | null;
  role_description: string | null;
  country: string | null;
  city: string | null;
  work_mode: string | null;
  company_type: string | null;
  employment_type: string | null;
  work_schedule: string | null;
  company_scope: string | null;
  monthly_salary_amount: number | null;
  salary_currency: string | null;
  salary_type: string | null;
  has_variable_compensation: boolean | null;
  last_raise_period: string | null;
  negotiation_confidence: string | null;
  wants_salary_negotiation_practice: boolean | null;
}

export type SalarySubmissionInsert = Omit<SalarySubmission, "id" | "created_at">;
