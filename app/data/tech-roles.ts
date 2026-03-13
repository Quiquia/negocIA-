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

export const TECH_ROLE_ERROR =
  "Este rol no parece estar relacionado con tecnología. Ejemplos: DevOps Engineer, QA Tester, Data Analyst, Scrum Master, Soporte técnico...";
