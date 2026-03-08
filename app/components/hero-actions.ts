"use server";

import OpenAI from "openai";

let _client: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_client) {
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _client;
}

export type QuickEstimate = {
  min_salary: number;
  max_salary: number;
  gap_percentage: number;
  insight: string;
};

export async function getQuickSalaryEstimate(data: {
  role: string;
  experience: string;
  location: string;
  currentSalary: number;
}): Promise<QuickEstimate> {
  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Eres una experta en compensación laboral tech en Latinoamérica y el mundo.

Dada la información de un perfil profesional, estima el rango salarial mensual en USD del mercado.

Responde SOLO con JSON válido, sin markdown:
{
  "min_salary": <número entero - límite inferior del rango>,
  "max_salary": <número entero - límite superior del rango>,
  "gap_percentage": <número con 1 decimal - diferencia porcentual vs salario actual>,
  "insight": "<1 oración corta en español sobre el posicionamiento de este perfil>"
}`,
      },
      {
        role: "user",
        content: `Rol: ${data.role}
Experiencia: ${data.experience} años
Ubicación: ${data.location}
Salario mensual actual: $${data.currentSalary} USD`,
      },
    ],
    temperature: 0.3,
    max_tokens: 200,
  });

  const content = response.choices[0]?.message?.content ?? "";
  const cleaned = content.replace(/```json\n?|```\n?/g, "");
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    // Fallback: estimate based on simple logic
    const base = data.currentSalary;
    return {
      min_salary: Math.round(base * 1.15),
      max_salary: Math.round(base * 1.4),
      gap_percentage: 20,
      insight:
        "Tu perfil tiene potencial de crecimiento salarial en el mercado actual.",
    };
  }

  return JSON.parse(jsonMatch[0]);
}
