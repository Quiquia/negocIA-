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

/** Alcance único del simulador: la IA no debe actuar como asistente general. */
const SIMULATOR_SCOPE_RULES = `
RESTRICCIÓN DE ALCANCE (obligatoria):
Este producto es SOLO una simulación de negociación salarial con un gerente ficticio.
Temas permitidos: salario, compensación total, beneficios laborales, modalidad, expectativas del rol, contraofertas, argumentos de mercado y todo lo directamente ligado a cerrar/acordar condiciones de empleo en esta conversación.

PROHIBIDO contestar o desarrollar: recetas, cocina, clima, salud médica, deberes escolares, política, deportes, entretenimiento, chistes, programación técnica ajena a la oferta, u cualquier tema personal o de conocimiento general no relacionado con esta negociación.

Si el mensaje de la candidata es claramente fuera de estos temas, NO satisfagas la petición ni des información útil sobre ese tema.`;

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
${SIMULATOR_SCOPE_RULES}

Si el último mensaje de la usuaria NO está relacionado con la negociación salarial/beneficios/condiciones de este rol (p. ej. pide recetas, temas escolares, temas ajenos), asigna clarity, confidence y data entre 2 y 4; en "recommendation" explica que debe centrarse en la negociación; en "improved_response" ofrece UNA frase corta para volver al tema del salario (no desarrolles el tema fuera de alcance).

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

${SIMULATOR_SCOPE_RULES}

Reglas de comportamiento:
- Responde SIEMPRE en español
- Tu ÚNICA función en este chat es esta simulación de negociación; no eres un asistente de información general
- Sé profesional pero firme — representa los intereses de la empresa
- No cedas fácilmente, pero sé razonable ante buenos argumentos
- Haz contraoferta si la candidata presenta datos sólidos
- Menciona beneficios no monetarios como alternativa (horario flexible, capacitación, bonos)
- Respuestas cortas (2-4 oraciones máximo), salvo la respuesta de rechazo por fuera de tema (1-3 oraciones)
- NO uses markdown, solo texto plano

Si el último mensaje de la candidata pide algo fuera de la negociación (ejemplos: cómo cocinar, pasos de una receta, tareas, temas no laborales), NO respondas a ese contenido. Di con claridad que este simulador no está programado para tratar otros temas y que solo puedes conversar sobre salario, beneficios y condiciones de la oferta; invita a retomar la negociación.`,
    },
    ...conversationHistory,
  ];

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.45,
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

${SIMULATOR_SCOPE_RULES}

Genera exactamente 4 sugerencias de respuesta para la candidata basándote en la conversación actual y su perfil.

Las 4 sugerencias deben ser EXCLUSIVAMENTE sobre negociación salarial, compensación, beneficios o condiciones del rol en esta simulación. Nunca sugieras recetas, temas escolares ni contenido ajeno.

Cada sugerencia debe ser:
- Profesional y respetuosa
- En primera persona (como si la candidata hablara)
- Corta (1-2 oraciones máximo)
- Estratégica: que ayude a negociar un mejor salario o a retomar el hilo si la conversación se desvió
- Diferente entre sí cuando aplique: datos de mercado, logros/experiencia, alternativas de beneficios, flexibilidad con límites

Si la conversación se desvió a temas no permitidos, al menos 2 sugerencias deben redirigir cortésmente al tema salarial sin abordar el tema fuera de alcance.

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
