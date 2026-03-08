"use server";

import OpenAI from "openai";

let _client: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_client) {
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _client;
}

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

// --- Coach: analiza la respuesta de la usuaria ---

export type CoachAnalysis = {
  clarity: number;
  confidence: number;
  data: number;
  recommendation: string;
  improved_response: string;
};

export async function analyzeResponse(
  conversationHistory: { role: "ai" | "user"; text: string }[],
  userMessage: string
): Promise<CoachAnalysis> {
  const historyText = conversationHistory
    .map((m) => `${m.role === "ai" ? "Gerente" : "Tú"}: ${m.text}`)
    .join("\n");

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Eres una coach experta en negociación salarial para mujeres en tech en Latinoamérica.
Analiza la respuesta de la usuaria en el contexto de la conversación de negociación.

Evalúa en escala 1-10:
- clarity: qué tan clara y directa fue su comunicación
- confidence: qué tanta seguridad proyecta
- data: si usó datos, métricas o argumentos concretos

Da una recomendación breve y una versión mejorada de su respuesta.
Responde SOLO con JSON válido, sin markdown.

{
  "clarity": <1-10>,
  "confidence": <1-10>,
  "data": <1-10>,
  "recommendation": "<1-2 oraciones en español>",
  "improved_response": "<versión mejorada de lo que dijo la usuaria>"
}`,
      },
      {
        role: "user",
        content: `## Conversación hasta ahora:\n${historyText}\n\n## Última respuesta de la usuaria:\n${userMessage}`,
      },
    ],
    temperature: 0.4,
    max_tokens: 500,
  });

  const content = response.choices[0]?.message?.content ?? "";
  let cleaned = content.replace(/```json\n?|```\n?/g, "");
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return {
      clarity: 7,
      confidence: 6,
      data: 5,
      recommendation: "Intenta usar datos concretos del mercado para fortalecer tu posición.",
      improved_response: userMessage,
    };
  }
  return JSON.parse(jsonMatch[0]);
}

// --- Gerente: responde como contraparte de negociación ---

export type ProfileContext = {
  role: string;
  seniority: string;
  techStack: string;
  country: string;
  currentSalary: string;
  marketSalary: string;
};

export async function getManagerResponse(
  conversationHistory: ChatMessage[],
  profile?: ProfileContext
): Promise<string> {
  const profileInfo = profile
    ? `\n\nContexto del perfil de la candidata (úsalo para hacer la negociación realista):
- Rol: ${profile.role} ${profile.seniority}
- Stack: ${profile.techStack}
- País: ${profile.country}
- Salario actual: ${profile.currentSalary}
- Salario de mercado estimado: ${profile.marketSalary}`
    : "";

  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `Eres un gerente de contratación en una empresa de tecnología en Latinoamérica.
Estás en una negociación salarial con una candidata para un rol técnico.${profileInfo}

Reglas:
- Responde SIEMPRE en español
- Sé profesional pero firme — representa los intereses de la empresa
- No cedas fácilmente, pero sé razonable ante buenos argumentos
- Haz contraoferta si la candidata presenta datos sólidos
- Menciona beneficios no monetarios como alternativa (horario flexible, capacitación, bonos)
- Respuestas cortas (2-4 oraciones máximo)
- NO uses markdown, solo texto plano`,
    },
    ...conversationHistory,
  ];

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.6,
    max_tokens: 300,
  });

  return response.choices[0]?.message?.content ?? "Entiendo tu posición. Déjame revisarlo internamente.";
}

// --- Sugerencias: genera ideas contextuales para responder ---

export async function generateSuggestions(
  conversationHistory: { role: "ai" | "user"; text: string }[],
  profile?: ProfileContext
): Promise<string[]> {
  const historyText = conversationHistory
    .map((m) => `${m.role === "ai" ? "Gerente" : "Candidata"}: ${m.text}`)
    .join("\n");

  const profileInfo = profile
    ? `\nPerfil de la candidata:
- Rol: ${profile.role} ${profile.seniority}
- Stack: ${profile.techStack}
- País: ${profile.country}
- Salario actual: ${profile.currentSalary}
- Salario de mercado: ${profile.marketSalary}`
    : "";

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Eres una coach de negociación salarial para mujeres en tech en Latinoamérica.

Genera exactamente 4 sugerencias de respuesta para la candidata basándote en la conversación actual y su perfil.

Cada sugerencia debe ser:
- Profesional y respetuosa
- En primera persona (como si la candidata hablara)
- Corta (1-2 oraciones máximo)
- Estratégica: que ayude a negociar un mejor salario
- Diferente entre sí: una basada en datos de mercado, una en logros/experiencia, una proponiendo alternativas, y una mostrando flexibilidad con límites

Responde SOLO con un JSON array de 4 strings, sin markdown.
["sugerencia 1", "sugerencia 2", "sugerencia 3", "sugerencia 4"]`,
      },
      {
        role: "user",
        content: `## Conversación:\n${historyText}${profileInfo}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 400,
  });

  const content = response.choices[0]?.message?.content ?? "";
  let cleaned = content.replace(/```json\n?|```\n?/g, "");
  const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
  if (!arrayMatch) {
    return [
      "Me gustaría que revisáramos el rango salarial considerando mi experiencia.",
      "Según datos del mercado, considero que mi perfil justifica una compensación más competitiva.",
      "Estoy abierta a explorar beneficios adicionales junto con un ajuste salarial.",
      "Valoro la oportunidad, y me gustaría encontrar un punto medio que funcione para ambas partes.",
    ];
  }
  return JSON.parse(arrayMatch[0]);
}
