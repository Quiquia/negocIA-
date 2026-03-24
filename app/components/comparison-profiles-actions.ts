"use server";

import OpenAI from "openai";

let _client: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_client) {
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _client;
}

export type ComparisonIconKey =
  | "monitor"
  | "search"
  | "bar-chart-3"
  | "settings"
  | "briefcase";

export type ComparisonProfileDTO = {
  role: string;
  icon_key: ComparisonIconKey;
  salary_avg: string;
  gap: string;
  region: string;
};

const ICON_ORDER: ComparisonIconKey[] = [
  "monitor",
  "search",
  "bar-chart-3",
  "settings",
  "briefcase",
];

function normalizeIcon(key: unknown, index: number): ComparisonIconKey {
  const valid = new Set(ICON_ORDER);
  if (typeof key === "string" && valid.has(key as ComparisonIconKey)) {
    return key as ComparisonIconKey;
  }
  return ICON_ORDER[index % ICON_ORDER.length]!;
}

const FALLBACK: ComparisonProfileDTO[] = [
  {
    role: "Frontend Developer",
    icon_key: "monitor",
    salary_avg: "$3,800 USD",
    gap: "+18% por especialización React",
    region: "LatAm (Remoto)",
  },
  {
    role: "Backend Developer",
    icon_key: "search",
    salary_avg: "$4,500 USD",
    gap: "+22% por arquitectura cloud",
    region: "Remoto Latinoamérica",
  },
  {
    role: "Data Analyst",
    icon_key: "bar-chart-3",
    salary_avg: "$3,200 USD",
    gap: "+15% por visualización avanzada",
    region: "Colombia & México",
  },
  {
    role: "UX Designer",
    icon_key: "settings",
    salary_avg: "$3,500 USD",
    gap: "+20% por research UX",
    region: "Startups (Global)",
  },
  {
    role: "Product Manager",
    icon_key: "briefcase",
    salary_avg: "$4,200 USD",
    gap: "+30% por liderazgo técnico",
    region: "Global (Startups)",
  },
];

function parseProfiles(raw: string): ComparisonProfileDTO[] | null {
  const cleaned = raw.replace(/```json\n?|```\n?/g, "");
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;
  try {
    const parsed = JSON.parse(jsonMatch[0]) as { profiles?: unknown };
    if (!Array.isArray(parsed.profiles) || parsed.profiles.length < 1) {
      return null;
    }
    const out: ComparisonProfileDTO[] = [];
    for (let i = 0; i < 5; i++) {
      const p = parsed.profiles[i] as Record<string, unknown> | undefined;
      if (!p || typeof p.role !== "string") return null;
      out.push({
        role: p.role.trim(),
        icon_key: normalizeIcon(p.icon_key, i),
        salary_avg:
          typeof p.salary_avg === "string"
            ? p.salary_avg.trim()
            : String(p.salary_avg ?? ""),
        gap: typeof p.gap === "string" ? p.gap.trim() : String(p.gap ?? ""),
        region:
          typeof p.region === "string" ? p.region.trim() : String(p.region ?? ""),
      });
    }
    return out;
  } catch {
    return null;
  }
}

/**
 * Cinco perfiles de comparación para el home (mujeres en tech, LATAM / remoto).
 */
export async function fetchComparisonProfiles(): Promise<ComparisonProfileDTO[]> {
  if (!process.env.OPENAI_API_KEY) {
    return FALLBACK;
  }

  try {
    const response = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Eres experta en mercado laboral tech y brecha salarial de género en Latinoamérica.
Genera exactamente 5 perfiles de roles tecnológicos distintos (mezcla engineering, datos, diseño, producto si aplica).
Cada uno debe sonar realista para mujeres en tech negociando en LATAM o remoto para empresas LATAM/US.

Devuelve SOLO JSON válido, sin markdown:
{
  "profiles": [
    {
      "role": "<nombre corto del rol en español o inglés>",
      "icon_key": "monitor" | "search" | "bar-chart-3" | "settings" | "briefcase",
      "salary_avg": "<rango o promedio mensual, ej. $3,800 USD — formato con $ y moneda>",
      "gap": "<una línea tipo +NN% o insight de brecha/oportunidad, en español>",
      "region": "<ej. LatAm (Remoto), México, Global startups — corto>"
    }
  ]
}

Asigna icon_key en este orden semántico al array:
1) monitor → roles muy visuales / frontend / UI
2) search → backend / APIs / infra
3) bar-chart-3 → datos / analytics / BI
4) settings → UX/UI / diseño / research
5) briefcase → producto / gestión / liderazgo

salary_avg debe ser coherente con seniority implícito (roles más senior = números mayores en USD mensuales típicos LATAM/remoto).`,
        },
        {
          role: "user",
          content:
            "Genera los 5 perfiles para la sección Comparaciones reales en tecnología del sitio NegocIA+.",
        },
      ],
      temperature: 0.45,
      max_tokens: 900,
    });

    const content = response.choices[0]?.message?.content ?? "";
    const profiles = parseProfiles(content);
    if (profiles && profiles.length === 5) {
      return profiles;
    }
  } catch (e) {
    console.error("fetchComparisonProfiles:", e);
  }

  return FALLBACK;
}
