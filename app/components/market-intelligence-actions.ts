"use server";

import OpenAI from "openai";
import {
  MARKET_REFERENCE_SOURCES,
  ROLE_MARKET_SECTION,
} from "./market-intelligence-sources";

let _client: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_client) {
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _client;
}

export type MarketBarRow = {
  level: string;
  v1: number;
  v2: number;
};

export type MarketIntelligenceSnapshot = {
  role_title: string;
  pay_gap_women_percent: number;
  pay_gap_quote: string;
  bar_series_label_1: string;
  bar_series_label_2: string;
  bar_latam: MarketBarRow[];
  bar_global: MarketBarRow[];
  salary_trend: { year: string; salary: number }[];
  growth_narrative_percent: number;
  growth_narrative_suffix: string;
  work_modes: { label: string; salary_usd: number; highlight?: boolean }[];
  work_modes_insight: string;
  tech_stack_ranking: { name: string; demand_growth: string }[];
  demand_headline: string;
};

const SOURCES_PROMPT_BLOCK = `
Marco de referencia (solo para esta sección de inteligencia de mercado, rol ${ROLE_MARKET_SECTION}):
Calibra y justifica mentalmente tus estimaciones como si provinieran de la misma lógica que estos informes y estudios del sector (no cites URLs ni datos en bruto; aplica criterios coherentes con ellos):
- ${MARKET_REFERENCE_SOURCES.join("\n- ")}
Enfócate exclusivamente en el rol ${ROLE_MARKET_SECTION} (desarrollo frontend web: UI, frameworks, herramientas de cliente).
`.trim();

const FALLBACK: MarketIntelligenceSnapshot = {
  role_title: ROLE_MARKET_SECTION,
  pay_gap_women_percent: 17,
  pay_gap_quote:
    "En tecnología, las mujeres pueden ganar hasta 17% menos que sus colegas hombres en roles similares.",
  bar_series_label_1: "Perú",
  bar_series_label_2: "Colombia",
  bar_latam: [
    { level: "Junior", v1: 1200, v2: 1300 },
    { level: "Mid", v1: 2100, v2: 2300 },
    { level: "Senior", v1: 3400, v2: 3600 },
  ],
  bar_global: [
    { level: "Junior", v1: 1400, v2: 1500 },
    { level: "Mid", v1: 2600, v2: 2800 },
    { level: "Senior", v1: 4200, v2: 4500 },
  ],
  salary_trend: [
    { year: "2024", salary: 2800 },
    { year: "2025", salary: 3200 },
    { year: "2026", salary: 3800 },
  ],
  growth_narrative_percent: 21,
  growth_narrative_suffix: "en los últimos 3 años en roles tech.",
  work_modes: [
    { label: "Full-time (Planilla)", salary_usd: 3200 },
    { label: "Freelance", salary_usd: 4100, highlight: true },
  ],
  work_modes_insight:
    "Freelance Frontend Developers pueden ganar hasta 28% más por proyecto.",
  tech_stack_ranking: [
    { name: "React", demand_growth: "+18%" },
    { name: "Next.js", demand_growth: "+24%" },
    { name: "TypeScript", demand_growth: "+20%" },
    { name: "Vue", demand_growth: "+12%" },
    { name: "Angular", demand_growth: "+8%" },
  ],
  demand_headline: "Demanda +18% últimos 12 meses",
};

function parseSnapshot(raw: string): MarketIntelligenceSnapshot | null {
  const cleaned = raw.replace(/```json\n?|```\n?/g, "");
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;
  try {
    const p = JSON.parse(jsonMatch[0]) as Partial<MarketIntelligenceSnapshot>;
    if (
      !p.role_title ||
      !Array.isArray(p.bar_latam) ||
      !Array.isArray(p.bar_global) ||
      typeof p.pay_gap_women_percent !== "number"
    ) {
      return null;
    }
    return {
      ...FALLBACK,
      ...p,
      bar_latam: p.bar_latam!.length ? p.bar_latam! : FALLBACK.bar_latam,
      bar_global: p.bar_global!.length ? p.bar_global! : FALLBACK.bar_global,
      salary_trend:
        p.salary_trend && p.salary_trend.length > 0
          ? p.salary_trend
          : FALLBACK.salary_trend,
      work_modes:
        p.work_modes && p.work_modes.length > 0
          ? p.work_modes
          : FALLBACK.work_modes,
      tech_stack_ranking:
        p.tech_stack_ranking && p.tech_stack_ranking.length > 0
          ? p.tech_stack_ranking
          : FALLBACK.tech_stack_ranking,
    };
  } catch {
    return null;
  }
}

/**
 * Genera un snapshot de mercado (gráficos + textos) para la sección del home.
 * Siempre usa el rol Frontend Developer y el marco MARKET_REFERENCE_SOURCES.
 */
export async function fetchMarketIntelligenceSnapshot(): Promise<MarketIntelligenceSnapshot> {
  const role = ROLE_MARKET_SECTION;

  if (!process.env.OPENAI_API_KEY) {
    return { ...FALLBACK, role_title: role };
  }

  try {
    const response = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Eres una experta en datos de compensación tech en Latinoamérica y a nivel global.

${SOURCES_PROMPT_BLOCK}

Devuelve SOLO JSON válido (sin markdown) con estimaciones razonables en USD mensuales para el rol ${role}.
Los números deben ser coherentes entre sí (Junior < Mid < Senior; LATAM típicamente menor que Global).
Incluye brecha de género estimada para mujeres en tech en LATAM (entero 10-25), alineada con patrones que suelen reportar estudios de mercado y encuestas salariales del tipo indicado arriba.
Las etiquetas bar_series_label_1 y bar_series_label_2 deben ser cortas (ej. "Mercado LATAM", "Mujeres LATAM" o dos países representativos).
El campo "role_title" debe ser exactamente: "${role}".

Esquema obligatorio:
{
  "role_title": "${role}",
  "pay_gap_women_percent": <entero>,
  "pay_gap_quote": "<una frase para la UI, menciona brecha de género en tech en roles frontend>",
  "bar_series_label_1": "<leyenda barra azul>",
  "bar_series_label_2": "<leyenda barra rosa>",
  "bar_latam": [ {"level":"Junior","v1":number,"v2":number}, {"level":"Mid",...}, {"level":"Senior",...} ],
  "bar_global": [ mismo formato que bar_latam ],
  "salary_trend": [ {"year":"2024","salary":number}, {"year":"2025",...}, {"year":"2026",...} ],
  "growth_narrative_percent": <entero 15-30>,
  "growth_narrative_suffix": "<texto corto después del porcentaje, ej. en los últimos 3 años en roles tech.>",
  "work_modes": [ {"label":"Full-time (Planilla)","salary_usd":number}, {"label":"Freelance","salary_usd":number,"highlight":true} ],
  "work_modes_insight": "<una frase sobre freelance vs planilla para frontend>",
  "tech_stack_ranking": [ {"name":"...","demand_growth":"+NN%"}, ... exactamente 5 ítems del ecosistema frontend ],
  "demand_headline": "<ej. Demanda +18% últimos 12 meses>"
}`,
        },
        {
          role: "user",
          content: `Genera el snapshot de mercado para ${role}, aplicando el marco de referencia de fuentes indicado en el system (Stack Overflow, Glassdoor, GitHub Trends, estudios LATAM, LinkedIn Salary, Michael Page).`,
        },
      ],
      temperature: 0.35,
      max_tokens: 1200,
    });

    const content = response.choices[0]?.message?.content ?? "";
    const parsed = parseSnapshot(content);
    if (parsed) {
      return { ...parsed, role_title: ROLE_MARKET_SECTION };
    }
  } catch (e) {
    console.error("fetchMarketIntelligenceSnapshot:", e);
  }

  return { ...FALLBACK, role_title: ROLE_MARKET_SECTION };
}
