/**
 * Keywords that indicate a role is related to tech/IT.
 * Used to validate custom "Otro" role inputs.
 */
const techKeywords = [
  // Roles en inglés
  "developer", "engineer", "programmer", "architect", "devops", "sre",
  "frontend", "backend", "fullstack", "full stack", "full-stack",
  "qa", "quality assurance", "tester", "testing",
  "data", "analyst", "analytics", "scientist", "machine learning", "ml", "ai",
  "cloud", "infrastructure", "platform", "systems", "system",
  "security", "cybersecurity", "infosec", "pentester", "ethical hacker",
  "database", "dba", "sql",
  "network", "networking", "sysadmin", "sys admin",
  "product manager", "product owner", "scrum master", "agile", "project manager",
  "ux", "ui", "designer", "design",
  "mobile", "ios", "android", "flutter", "react native",
  "web", "software", "tech", "it ", "tic", "informática", "informatic",
  "blockchain", "crypto", "web3",
  "erp", "sap", "crm", "salesforce",
  "support", "soporte técnico", "help desk", "helpdesk", "mesa de ayuda",
  "automation", "automatización", "rpa",
  "bi ", "business intelligence", "inteligencia de negocio",

  // Roles en español
  "desarrollador", "desarrolladora", "programador", "programadora",
  "ingeniero", "ingeniera", "arquitecto", "arquitecta",
  "analista", "consultor", "consultora",
  "administrador", "administradora",
  "técnico", "técnica", "tecnología", "tecnologías",
  "digital", "computación", "computacion", "sistemas",
  "ciberseguridad", "seguridad informática",
  "base de datos", "bases de datos",
  "redes", "telecomunicaciones", "telecom",
  "diseñador", "diseñadora",
  "líder técnico", "lider tecnico", "tech lead", "team lead",
  "cto", "cio", "vp engineering", "director de tecnología",
  "scrum", "producto digital",
  "implementador", "implementadora",
  "capacitador", "capacitadora",
  "migracion", "migración",
  "nube", "cloud",
  "código", "codigo", "code",
  "api", "microservicios", "microservicio",
];

export function isTechRole(role: string): boolean {
  const normalized = role.toLowerCase().trim();
  if (!normalized) return false;
  return techKeywords.some((keyword) => normalized.includes(keyword.trim()));
}

/** Presets que tienen listas de stack/herramientas en el formulario de salario. */
export const KNOWN_ROLE_PRESETS = [
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
  "UX Designer",
] as const;

export type KnownRolePreset = (typeof KNOWN_ROLE_PRESETS)[number];

function normalizeForRoleMatch(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

/**
 * Si el texto del rol «Otro» encaja con uno de los perfiles predefinidos, devuelve ese preset
 * para mostrar sus chips de stack/herramientas. Si no hay coincidencia (p. ej. DevOps, QA),
 * devuelve null y el formulario solo muestra los inputs libres.
 */
export function matchCustomRoleToPreset(
  input: string,
): KnownRolePreset | null {
  const s = normalizeForRoleMatch(input);
  if (!s) return null;

  const looksLikeUiUxDev =
    /\b(ui|ux)\s+developer\b/.test(s) ||
    /\bdeveloper\s+(de\s+)?(ui|ux)\b/.test(s) ||
    /\bdesarrollador(a)?\s+(de\s+)?(ui|ux)\b/.test(s);

  // UX / UI diseño (no implementación)
  if (
    /\b(ui|ux)\s+(designer|diseñador|diseñadora|researcher|research)\b/.test(s) ||
    /\b(diseñador|diseñadora)\s+(de\s+)?(ux|ui|experiencia|producto)\b/.test(s) ||
    /\b(ui|ux)\s*\/\s*(ui|ux)\b/.test(s) ||
    /\bproduct\s+designer\b/.test(s) ||
    /\bdiseñador(a)?\s+de\s+producto\b/.test(s)
  ) {
    if (looksLikeUiUxDev) return "Frontend Developer";
    return "UX Designer";
  }

  // Data / BI / analítica
  if (
    /\bdata\s+(analyst|scientist|engineer|analytics)\b/.test(s) ||
    /\banalista\s+de\s+datos\b/.test(s) ||
    /\bcientifico\s+de\s+datos\b/.test(s) ||
    /\b(bi|business intelligence|inteligencia de negocio)\b/.test(s) ||
    /\b(power bi|tableau|looker)\s+(analyst|analista|developer)?\b/.test(s)
  ) {
    return "Data Analyst";
  }

  // Backend
  if (
    /\bbackend\b/.test(s) ||
    /\bback[- ]end\b/.test(s) ||
    /\b(desarrollador|desarrolladora|ingeniero|ingeniera|dev(eloper)?|engineer)\s+(de\s+)?backend\b/.test(
      s,
    ) ||
    /\bbackend\s+(developer|engineer|dev|desarrollador|desarrolladora)\b/.test(s) ||
    /\b(api|microservicio|microservicios)\s+(developer|engineer|desarrollador|ingeniero)?\b/.test(s)
  ) {
    return "Backend Developer";
  }

  // Frontend / web cliente
  if (
    /\bfrontend\b/.test(s) ||
    /\bfront[- ]end\b/.test(s) ||
    /\b(desarrollador|desarrolladora|ingeniero|ingeniera)\s+(de\s+)?frontend\b/.test(s) ||
    /\bfrontend\s+(developer|engineer|dev|desarrollador|desarrolladora)\b/.test(s) ||
    /\b(react|angular|vue|svelte|next\.js|nextjs)\s+(developer|engineer|dev|desarrollador|ingeniero)?\b/.test(
      s,
    ) ||
    /\bweb\s+(developer|engineer|desarrollador|desarrolladora)\b/.test(s)
  ) {
    return "Frontend Developer";
  }

  return null;
}

export const TECH_ROLE_ERROR =
  "Este rol no parece estar relacionado con tecnología. Ejemplos: DevOps Engineer, QA Tester, Data Analyst, Scrum Master, Soporte técnico...";
