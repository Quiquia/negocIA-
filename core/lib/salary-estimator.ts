/**
 * Estimador de salario de mercado usando OpenAI.
 *
 * Recibe el perfil de una usuaria y devuelve:
 * - estimated_salary: el salario mensual estimado del mercado
 * - currency: la moneda del salario
 * - gap_percentage: qué tan lejos está del mercado (positivo = por debajo)
 * - summary: una explicación corta en español
 * - profile_insights: 3 insights personalizados
 * - growth_skills: habilidades a fortalecer
 * - growth_target_role: siguiente nivel objetivo
 */
import OpenAI from "openai";
import type { SalarySubmission } from "@/core/types/database";

// --- Tipos ---

export interface SalaryEstimate {
  estimated_salary: number;
  currency: string;
  gap_percentage: number;
  gap_direction: "below" | "above" | "at_market";
  summary: string;
  profile_insights: [string, string, string];
  growth_skills: string[];
  growth_target_role: string;
}

// --- Cliente OpenAI (lazy) ---

let _client: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!_client) {
    _client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return _client;
}

// --- Prompt ---

function buildPrompt(profile: SalarySubmission): string {
  return `Eres una experta en compensación y mercado laboral en Latinoamérica.

Analiza el siguiente perfil profesional y estima el SALARIO MENSUAL DE MERCADO
para una persona con estas características. Basa tu estimación en datos reales
del mercado laboral de la región.

## Perfil

- Área del rol: ${profile.role_area ?? "No especificado"}
- Seniority: ${profile.seniority ?? "No especificado"}
- Años de experiencia: ${profile.frontend_years_experience ?? "No especificado"}
- Tecnología principal: ${profile.main_technology ?? "No especificado"}
- Habilidades técnicas: ${profile.technical_skills ?? "No especificado"}
- Nivel de inglés: ${profile.english_level ?? "No especificado"}
- Usa inglés en el trabajo: ${profile.uses_english_current_job ?? "No especificado"}
- Descripción del rol: ${profile.role_description ?? "No especificado"}
- País: ${profile.country ?? "No especificado"}
- Ciudad: ${profile.city ?? "No especificado"}
- Modalidad: ${profile.work_mode ?? "No especificado"}
- Tipo de empresa: ${profile.company_type ?? "No especificado"}
- Tipo de empleo: ${profile.employment_type ?? "No especificado"}
- Jornada: ${profile.work_schedule ?? "No especificado"}
- Alcance de empresa: ${profile.company_scope ?? "No especificado"}
- Salario actual: ${profile.monthly_salary_amount ?? "No especificado"} ${profile.salary_currency ?? ""}
- Tipo de salario: ${profile.salary_type ?? "No especificado"}
- Compensación variable: ${profile.has_variable_compensation ? "Sí" : "No"}

## Instrucciones

1. Estima el salario mensual de mercado en la MISMA moneda (${profile.salary_currency ?? "USD"}).
2. Calcula el porcentaje de brecha: ((estimado - actual) / estimado) * 100.
3. Genera 3 insights personalizados sobre el perfil (oportunidades, fortalezas, tendencias del mercado para este perfil específico). Cada insight debe ser una oración completa en español, específica al perfil (no genérica).
4. Sugiere 4 habilidades técnicas concretas que esta persona debería fortalecer para avanzar al siguiente nivel.
5. Indica cuál sería el siguiente rol objetivo (ej: "Mid", "Senior", "Lead / Staff").
6. Responde ÚNICAMENTE con un JSON válido, sin markdown ni explicaciones fuera del JSON.

## Formato de respuesta (JSON)

{
  "estimated_salary": <número entero>,
  "currency": "${profile.salary_currency ?? "USD"}",
  "gap_percentage": <número con 1 decimal>,
  "gap_direction": "below" | "above" | "at_market",
  "summary": "<1-2 oraciones en español explicando la estimación>",
  "profile_insights": ["<insight 1>", "<insight 2>", "<insight 3>"],
  "growth_skills": ["<skill 1>", "<skill 2>", "<skill 3>", "<skill 4>"],
  "growth_target_role": "<siguiente nivel>"
}`;
}

// --- Llamada a OpenAI ---

export async function estimateSalary(
  profile: SalarySubmission
): Promise<SalaryEstimate> {
  const prompt = buildPrompt(profile);

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Eres una experta en compensación laboral. Responde SOLO con JSON válido.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_tokens: 1000,
  });

  const content = response.choices[0]?.message?.content ?? "";

  // Limpiar respuesta por si envuelve en ```json ... ```
  let cleaned = content;
  cleaned = cleaned.replace(/```json\n?|```\n?/g, "");

  // Extraer el primer objeto JSON válido
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No se encontró JSON válido en la respuesta de la IA");
  }

  const parsed: SalaryEstimate = JSON.parse(jsonMatch[0]);

  return parsed;
}
