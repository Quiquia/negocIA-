"use server";

import OpenAI from "openai";

let _client: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_client) {
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _client;
}

export type ConfidenceResult = {
  overall_score: number;
  confidence_score: number;
  clarity_score: number;
  positioning_score: number;
  summary: string;
  strengths: string[];
  improvements: string[];
};

export async function analyzeNegotiationPerformance(
  chatHistory: { role: "ai" | "user"; text: string }[],
  profile: {
    role: string;
    seniority: string;
    techStack: string;
    country: string;
    currentSalary: string;
    marketSalary: string;
    gapPercentage: number;
  }
): Promise<ConfidenceResult> {
  const historyText = chatHistory
    .map((m) => `${m.role === "ai" ? "Gerente" : "Candidata"}: ${m.text}`)
    .join("\n");

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Eres una experta en coaching de negociación salarial para mujeres en tech en Latinoamérica.

Analiza el desempeño completo de la candidata en su simulación de negociación y su perfil profesional.

Evalúa en porcentaje (0-100):
- overall_score: puntuación general de preparación para negociar
- confidence_score: qué tanta seguridad y firmeza demostró
- clarity_score: qué tan clara fue al comunicar su valor y argumentos
- positioning_score: qué tan bien se posicionó respecto al mercado y usó datos

También genera:
- summary: un mensaje motivacional y personalizado (2-3 oraciones en español) que destaque lo positivo y dé un consejo clave
- strengths: 2-3 fortalezas que demostró durante la negociación
- improvements: 2-3 áreas concretas donde puede mejorar

Responde SOLO con JSON válido, sin markdown.

{
  "overall_score": <0-100>,
  "confidence_score": <0-100>,
  "clarity_score": <0-100>,
  "positioning_score": <0-100>,
  "summary": "<mensaje motivacional personalizado>",
  "strengths": ["<fortaleza 1>", "<fortaleza 2>"],
  "improvements": ["<mejora 1>", "<mejora 2>"]
}`,
      },
      {
        role: "user",
        content: `## Perfil de la candidata
- Rol: ${profile.role} ${profile.seniority}
- Stack: ${profile.techStack}
- País: ${profile.country}
- Salario actual: ${profile.currentSalary}
- Salario de mercado: ${profile.marketSalary}
- Brecha salarial: ${profile.gapPercentage}%

## Conversación de negociación completa:
${historyText}`,
      },
    ],
    temperature: 0.4,
    max_tokens: 600,
  });

  const content = response.choices[0]?.message?.content ?? "";
  let cleaned = content.replace(/```json\n?|```\n?/g, "");
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return {
      overall_score: 70,
      confidence_score: 65,
      clarity_score: 70,
      positioning_score: 68,
      summary:
        "Has dado un gran paso al practicar tu negociación. Sigue preparándote con datos de mercado para sentirte más segura.",
      strengths: ["Disposición a negociar", "Tono profesional"],
      improvements: [
        "Usar más datos concretos del mercado",
        "Ser más firme en tus expectativas",
      ],
    };
  }
  return JSON.parse(jsonMatch[0]);
}
