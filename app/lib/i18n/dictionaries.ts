import type { Locale } from "@/app/providers/LanguageProvider";
import { extraEs, extraEn } from "./dictionaries-extra";
import { salaryFormEs, salaryFormEn } from "./dictionaries-salary-form";

/** Claves planas: prefijo por página o sección (layout.*, home.*, …). */
const esCore: Record<string, string> = {
  "layout.nav.producto": "Producto",
  "layout.nav.comoFunciona": "Cómo funciona",
  "layout.nav.sobreNosotros": "Sobre nosotros",
  "layout.footer.producto": "Producto",
  "layout.footer.simulator": "Simulador de negociación",
  "layout.footer.salaryAnalysis": "Análisis salarial",
  "layout.footer.howItWorks": "Cómo funciona",
  "layout.footer.contacto": "Contacto",
  "layout.footer.linkedin": "LinkedIn",
  "layout.footer.email": "Email",
  "layout.footer.copyright": "© 2026 NegocIA+",
  "layout.footer.tagline":
    "Empoderando a mujeres en tecnología con inteligencia salarial basada en datos.",
  "layout.footer.privacy": "Política de Privacidad",
  "layout.footer.terms": "Términos de Servicio",
  "layout.aria.menu": "Abrir menú",
  "layout.aria.language": "Seleccionar idioma",
  "layout.aria.langEs": "Español",
  "layout.aria.langEn": "English",

  "home.hero.title":
    "Llega a tu próxima negociación con la seguridad de conocer el mercado",
  "home.hero.subtitle":
    "NegocIA+ ayuda a mujeres en tecnología a analizar su salario con datos reales del mercado y negociar con confianza.",
  "home.hero.badgeLoading": "Cargando análisis realizados…",
  "home.hero.badgeDone": "+{{count}} análisis salariales realizados",
  "home.hero.badgeMarket": "Datos reales del mercado tecnológico",
  "home.hero.badgeWomen": "Plataforma diseñada para mujeres en tecnología",
  "home.hero.cta": "Analizar mi salario",
  "home.floating.demandTitle": "Demanda de mercado",
  "home.floating.demandSub": "+15% este mes",
  "home.floating.gapTitle": "Brecha salarial",
  "home.floating.gapSub": "Identificada",
  "home.trust.confidential": "100% confidencial",
  "home.trust.womenTech": "Creado para mujeres en tech",
  "home.trust.free": "Gratis y sin registro",
  "home.social.avatarAlt": "Usuaria",
  "home.social.moreThan": "Más de … mujeres en tecnología",
  "home.social.moreThanCount": "Más de {{count}} mujeres en tecnología",
  "home.social.suffix": "ya han analizado su salario con NegocIA+",
  "home.purpose.title": "Nuestro propósito: Cerrar la brecha salarial",
  "home.purpose.text":
    "En Latinoamérica, las mujeres en tecnología ganan en promedio un 20% menos que sus pares masculinos por el mismo trabajo. NegocIA+ existe para cambiar eso, brindándote herramientas para comunicar tu valor y alcanzar acuerdos que impulsen tu crecimiento profesional.",
  "home.comparison.title": "Comparaciones reales en tecnología",
  "home.comparison.subtitle":
    "Explora cómo otras mujeres en tecnología están posicionando su salario.",
  "home.comparison.aiBadge": "Análisis de Mercado AI",
  "home.comparison.avgLabel": "Salario promedio analizado",
  "home.comparison.gapLabel": "Brecha salarial detectada",
  "home.comparison.regionLabel": "Región con mayor crecimiento",
  "home.comparison.loading": "Cargando...",
  "home.comparison.ctaProfile": "Analizar mi perfil específico",
  "home.bottom.title": "Toma el control de tu futuro hoy",
  "home.bottom.cta": "Comenzar mi análisis gratuito",

  "heroForm.analyzing": "Analizando tu perfil...",
  "heroForm.title": "AI Salary Scanner",
  "heroForm.step": "Paso 1 de 4",
  "heroForm.lead":
    "Prueba rápida: descubre si tu salario está alineado con el mercado tecnológico",
  "heroForm.roleLabel": "¿Cuál es tu rol?",
  "heroForm.rolePlaceholder": "Selecciona tu rol...",
  "heroForm.other": "Otro",
  "heroForm.customPlaceholder": "Ej: DevOps, QA, Product Manager...",
  "heroForm.roleError": "Ingresa un rol relacionado con tecnología.",
  "heroForm.roleHint":
    "Prueba con: DevOps Engineer, QA Tester, Scrum Master, Data Scientist, Product Manager, Soporte técnico",
  "heroForm.roleValid": "Rol válido",
  "heroForm.salaryLabel": "Salario Mensual Actual (USD)",
  "heroForm.salaryError": "El salario debe ser mayor a 100 USD",
  "heroForm.expLabel": "Años de experiencia",
  "heroForm.locationLabel": "Ubicación",
  "heroForm.select": "Selecciona...",
  "heroForm.exp.0-1": "0-1 años",
  "heroForm.exp.2-3": "2-3 años",
  "heroForm.exp.4-5": "4-5 años",
  "heroForm.exp.6-8": "6-8 años",
  "heroForm.exp.9+": "9+ años",
  "heroForm.loc.latam": "LatAm",
  "heroForm.loc.europe": "Europa",
  "heroForm.loc.us": "Estados Unidos",
  "heroForm.loc.remote": "Remoto global",
  "heroForm.submit": "Ver estimación rápida",
  "heroForm.disclaimer": "Análisis gratuito, confidencial y sin registro.",
  "heroForm.time": "Solo toma 3 minutos.",
  "heroForm.pending": "Analizando tu perfil con IA...",
  "heroForm.resultLead":
    "Tu salario estimado de mercado podría estar entre:",
  "heroForm.continue": "Continuar simulación completa (Gratis)",
  "heroForm.again": "Volver a analizar",

  "faq.title": "Preguntas frecuentes",
  "faq.subtitle": "Encuentra respuestas a las dudas más comunes sobre NegocIA+.",
  "faq.searchPlaceholder": "Buscar una pregunta...",
  "faq.noResults": "No se encontraron resultados para tu búsqueda.",
  "faq.contactTitle": "¿Aún tienes dudas?",
  "faq.contactText":
    "Nuestro equipo está disponible para ayudarte. Escríbenos y te responderemos lo antes posible.",
  "faq.emailCta": "Enviar un correo",
  "faq.contactTeam": "Contactar al equipo",
  "faq.q1": "¿Qué es NegocIA+ y cómo funciona?",
  "faq.a1":
    "NegocIA+ es una herramienta gratuita que utiliza inteligencia artificial para analizar tu salario actual, compararlo con el mercado y ayudarte a preparar una negociación salarial efectiva. Solo necesitas ingresar tu perfil profesional y nuestro sistema te proporcionará un análisis completo con estrategias personalizadas.",
  "faq.q2": "¿Es realmente gratuito?",
  "faq.a2":
    "Sí, NegocIA+ es 100% gratuito. Nuestra misión es cerrar la brecha salarial de género en tecnología y creemos que el acceso a datos salariales y herramientas de negociación no debería tener costo. Nos financiamos a través de alianzas con organizaciones comprometidas con la equidad.",
  "faq.q3": "¿De dónde provienen los datos salariales?",
  "faq.a3":
    "Nuestros datos provienen de múltiples fuentes: encuestas salariales de la industria tech en Latinoamérica, datos públicos de plataformas de empleo, reportes de consultoras especializadas y contribuciones anónimas de nuestra comunidad. Los datos se actualizan trimestralmente para garantizar precisión.",
  "faq.q4": "¿Mis datos personales están seguros?",
  "faq.a4":
    "Absolutamente. No almacenamos información personal identificable. Los datos de tu perfil se procesan en tiempo real para generar el análisis y no se guardan en nuestros servidores. Cumplimos con las normativas de protección de datos aplicables en la región.",
  "faq.q5": "¿Cómo puedo prepararme mejor para mi negociación?",
  "faq.a5":
    "Te recomendamos seguir estos pasos: 1) Completa tu análisis salarial para obtener datos de mercado, 2) Revisa las estrategias personalizadas que te ofrecemos, 3) Practica con nuestro simulador de negociación al menos 3 veces, 4) Prepara tus argumentos basándote en los datos proporcionados. Cuanto más practiques, mayor será tu confianza.",

  "product.badge": "Nuestro Producto",
  "product.hero.title": "Herramientas potenciadas por",
  "product.hero.titleAccent": "inteligencia artificial",
  "product.hero.subtitle":
    "Descubre tu verdadero valor en el mercado y negocia con confianza. NegocIA+ combina datos reales con IA avanzada para empoderarte.",
  "product.f1.title": "AI Salary Scanner",
  "product.f1.subtitle": "Descubre cuánto deberías ganar realmente.",
  "product.f1.desc":
    "Nuestra IA analiza miles de puntos de datos en tiempo real para determinar exactamente cuánto deberías ganar basándose en tu rol, seniority, stack tecnológico y país.",
  "product.f1.badge": "Feature principal",
  "product.f2.title": "Salary Intelligence Dashboard",
  "product.f2.subtitle": "Visualiza tu brecha salarial con datos claros.",
  "product.f2.desc":
    "Visualiza la brecha salarial, proyecta tus ingresos futuros y compara tu compensación con otras mujeres en roles similares a nivel local e internacional.",
  "product.f3.title": "Negotiation Simulator",
  "product.f3.subtitle": "Practica tu negociación antes de la reunión real.",
  "product.f3.desc":
    "Practica tu conversación salarial con un manager de IA. Recibe feedback inmediato sobre tu claridad, uso de datos y nivel de confianza antes de la reunión real.",
  "product.f4.title": "Confidence Coaching",
  "product.f4.subtitle": "Supera el miedo a negociar tu salario.",
  "product.f4.desc":
    "Herramientas psicológicas y ejercicios diseñados específicamente para superar el síndrome del impostor y el miedo a negociar en entornos tecnológicos.",
  "product.cta.title": "Empieza a descubrir tu verdadero valor",
  "product.cta.subtitle":
    "Únete a miles de mujeres en tech que ya están negociando con datos y confianza.",
  "product.cta.button": "Comenzar ahora",

  "como.badge": "Proceso Simple",
  "como.hero.title": "¿Cómo funciona",
  "como.hero.titleEnd": "?",
  "como.hero.subtitle":
    "En 4 simples pasos, descubre tu valor real en el mercado y prepárate para negociar con confianza y datos.",
  "como.s1.title": "Completa tu perfil",
  "como.s1.desc":
    "Ingresa tu información profesional: rol, experiencia, ubicación, tecnologías y salario actual. Toda tu data se mantiene privada y segura.",
  "como.s2.title": "Análisis con IA",
  "como.s2.desc":
    "Nuestra inteligencia artificial analiza tu perfil contra miles de datos salariales del mercado tech en Latinoamérica y el mundo.",
  "como.s3.title": "Reporte personalizado",
  "como.s3.desc":
    "Recibe un reporte detallado con tu posición en el mercado, brecha salarial de género, proyección de crecimiento y recomendaciones específicas.",
  "como.s4.title": "Entrena tu negociación",
  "como.s4.desc":
    "Practica con nuestro simulador de negociación impulsado por IA. Recibe coaching en tiempo real y desarrolla la confianza para acordar tu valor en el mercado.",
  "como.cta.title": "¿Lista para dar el primer paso?",
  "como.cta.subtitle":
    "Comienza tu análisis salarial gratuito y descubre cuánto deberías estar ganando.",
  "como.cta.button": "Comenzar análisis",

  "common.loading": "Cargando...",

  "market.badgeLoading": "Generando inteligencia de mercado…",
  "market.badgeLive": "Datos actualizados recientemente",
  "market.mainTitle": "La brecha salarial en tecnología aún existe",
  "market.gapLead": "Brecha salarial estimada para mujeres en tecnología en LATAM",
  "market.gapSub": "Estimación con IA según rol y mercado actual",
  "market.sectionTitle": "Inteligencia salarial del mercado tecnológico",
  "market.sectionLead": "Datos generados con IA para tomar mejores decisiones profesionales",
  "market.analysisSuffix": "análisis salarial",
  "market.comparisonLabel": "Comparativa por nivel de experiencia (USD)",
  "market.trendTitle": "Crecimiento salarial",
  "market.trendSub": "Tendencia últimos 3 años",
  "market.tooltipAvg": "Salario promedio",
  "market.growthPrefix": "El salario promedio ha crecido",
  "market.workModeTitle": "Modalidad de trabajo",
  "market.workModeSub": "Salario promedio por modalidad (estimado)",
  "market.usdMonth": "USD/mes",
  "market.demand": "demanda",
  "market.techPaidTitle": "Tecnologías mejor pagadas",
  "market.techPaidSub": "Ranking según demanda y compensación (IA)",
  "market.disclaimer":
    "* Estimaciones generadas con IA; no constituyen asesoría legal ni financiera.",
  "market.footnoteMarket": "Datos del mercado tecnológico",
  "market.footnoteExp": "Nivel de experiencia",
  "market.footnoteStack": "Stack tecnológico",
  "market.footnoteGeo": "Ubicación geográfica",
  "market.referenceFrame": "Marco de referencia (Frontend):",
  "market.synthesis": "Síntesis NegocIA+",
};

const enCore: Record<string, string> = {
  "layout.nav.producto": "Product",
  "layout.nav.comoFunciona": "How it works",
  "layout.nav.sobreNosotros": "About us",
  "layout.footer.producto": "Product",
  "layout.footer.simulator": "Negotiation simulator",
  "layout.footer.salaryAnalysis": "Salary analysis",
  "layout.footer.howItWorks": "How it works",
  "layout.footer.contacto": "Contact",
  "layout.footer.linkedin": "LinkedIn",
  "layout.footer.email": "Email",
  "layout.footer.copyright": "© 2026 NegocIA+",
  "layout.footer.tagline":
    "Empowering women in tech with data-driven salary intelligence.",
  "layout.footer.privacy": "Privacy Policy",
  "layout.footer.terms": "Terms of Service",
  "layout.aria.menu": "Toggle menu",
  "layout.aria.language": "Select language",
  "layout.aria.langEs": "Spanish",
  "layout.aria.langEn": "English",

  "home.hero.title":
    "Go into your next negotiation knowing the market",
  "home.hero.subtitle":
    "NegocIA+ helps women in tech analyze their salary with real market data and negotiate with confidence.",
  "home.hero.badgeLoading": "Loading completed analyses…",
  "home.hero.badgeDone": "+{{count}} salary analyses completed",
  "home.hero.badgeMarket": "Real data from the tech market",
  "home.hero.badgeWomen": "Built for women in technology",
  "home.hero.cta": "Analyze my salary",
  "home.floating.demandTitle": "Market demand",
  "home.floating.demandSub": "+15% this month",
  "home.floating.gapTitle": "Pay gap",
  "home.floating.gapSub": "Identified",
  "home.trust.confidential": "100% confidential",
  "home.trust.womenTech": "Made for women in tech",
  "home.trust.free": "Free, no sign-up",
  "home.social.avatarAlt": "User",
  "home.social.moreThan": "More than … women in technology",
  "home.social.moreThanCount": "More than {{count}} women in technology",
  "home.social.suffix": "have already analyzed their salary with NegocIA+",
  "home.purpose.title": "Our purpose: Close the pay gap",
  "home.purpose.text":
    "In Latin America, women in tech earn on average 20% less than men for the same work. NegocIA+ exists to change that—giving you tools to communicate your value and reach agreements that grow your career.",
  "home.comparison.title": "Real comparisons in tech",
  "home.comparison.subtitle":
    "See how other women in tech are positioning their pay.",
  "home.comparison.aiBadge": "Market analysis AI",
  "home.comparison.avgLabel": "Average salary analyzed",
  "home.comparison.gapLabel": "Pay gap detected",
  "home.comparison.regionLabel": "Fastest-growing region",
  "home.comparison.loading": "Loading...",
  "home.comparison.ctaProfile": "Analyze my specific profile",
  "home.bottom.title": "Take control of your future today",
  "home.bottom.cta": "Start my free analysis",

  "heroForm.analyzing": "Analyzing your profile...",
  "heroForm.title": "AI Salary Scanner",
  "heroForm.step": "Step 1 of 4",
  "heroForm.lead":
    "Quick check: see if your pay aligns with the tech market",
  "heroForm.roleLabel": "What is your role?",
  "heroForm.rolePlaceholder": "Select your role...",
  "heroForm.other": "Other",
  "heroForm.customPlaceholder": "E.g. DevOps, QA, Product Manager...",
  "heroForm.roleError": "Enter a technology-related role.",
  "heroForm.roleHint":
    "Try: DevOps Engineer, QA Tester, Scrum Master, Data Scientist, Product Manager, IT support",
  "heroForm.roleValid": "Valid role",
  "heroForm.salaryLabel": "Current monthly salary (USD)",
  "heroForm.salaryError": "Salary must be greater than 100 USD",
  "heroForm.expLabel": "Years of experience",
  "heroForm.locationLabel": "Location",
  "heroForm.select": "Select...",
  "heroForm.exp.0-1": "0–1 years",
  "heroForm.exp.2-3": "2–3 years",
  "heroForm.exp.4-5": "4–5 years",
  "heroForm.exp.6-8": "6–8 years",
  "heroForm.exp.9+": "9+ years",
  "heroForm.loc.latam": "LatAm",
  "heroForm.loc.europe": "Europe",
  "heroForm.loc.us": "United States",
  "heroForm.loc.remote": "Global remote",
  "heroForm.submit": "Get quick estimate",
  "heroForm.disclaimer": "Free, confidential analysis. No sign-up.",
  "heroForm.time": "Only takes 3 minutes.",
  "heroForm.pending": "Analyzing your profile with AI...",
  "heroForm.resultLead": "Your estimated market salary could be between:",
  "heroForm.continue": "Continue full simulation (free)",
  "heroForm.again": "Analyze again",

  "faq.title": "Frequently asked questions",
  "faq.subtitle": "Answers to the most common questions about NegocIA+.",
  "faq.searchPlaceholder": "Search a question...",
  "faq.noResults": "No results found for your search.",
  "faq.contactTitle": "Still have questions?",
  "faq.contactText":
    "Our team is here to help. Write to us and we will reply as soon as possible.",
  "faq.emailCta": "Send an email",
  "faq.contactTeam": "Contact the team",
  "faq.q1": "What is NegocIA+ and how does it work?",
  "faq.a1":
    "NegocIA+ is a free tool that uses AI to analyze your current salary, compare it with the market, and help you prepare an effective salary negotiation. Enter your professional profile and the system gives you a full analysis with tailored strategies.",
  "faq.q2": "Is it really free?",
  "faq.a2":
    "Yes—NegocIA+ is 100% free. Our mission is to close the gender pay gap in tech, and we believe access to salary data and negotiation tools should cost nothing. We are funded through partnerships with organizations committed to equity.",
  "faq.q3": "Where does the salary data come from?",
  "faq.a3":
    "Our data comes from multiple sources: salary surveys from the LATAM tech industry, public job-platform data, reports from specialized firms, and anonymous contributions from our community. Data is updated quarterly for accuracy.",
  "faq.q4": "Is my personal data safe?",
  "faq.a4":
    "Absolutely. We do not store personally identifiable information. Your profile data is processed in real time to generate the analysis and is not kept on our servers. We comply with applicable data-protection rules in the region.",
  "faq.q5": "How can I better prepare for my negotiation?",
  "faq.a5":
    "We suggest: 1) Complete your salary analysis for market data, 2) Review the tailored strategies we provide, 3) Practice with our negotiation simulator at least 3 times, 4) Prepare your arguments using the data we share. The more you practice, the more confident you will feel.",

  "product.badge": "Our product",
  "product.hero.title": "Tools powered by",
  "product.hero.titleAccent": "artificial intelligence",
  "product.hero.subtitle":
    "Discover your real market value and negotiate with confidence. NegocIA+ combines real data with advanced AI to empower you.",
  "product.f1.title": "AI Salary Scanner",
  "product.f1.subtitle": "Find out what you should really earn.",
  "product.f1.desc":
    "Our AI analyzes thousands of data points in real time to estimate what you should earn based on role, seniority, stack, and country.",
  "product.f1.badge": "Main feature",
  "product.f2.title": "Salary Intelligence Dashboard",
  "product.f2.subtitle": "See your pay gap with clear data.",
  "product.f2.desc":
    "Visualize the gap, project future income, and compare your pay with other women in similar roles locally and internationally.",
  "product.f3.title": "Negotiation Simulator",
  "product.f3.subtitle": "Practice before the real meeting.",
  "product.f3.desc":
    "Practice your salary conversation with an AI manager. Get instant feedback on clarity, data use, and confidence before the real talk.",
  "product.f4.title": "Confidence Coaching",
  "product.f4.subtitle": "Overcome the fear of negotiating pay.",
  "product.f4.desc":
    "Psychological tools and exercises designed to tackle impostor syndrome and fear of negotiating in tech environments.",
  "product.cta.title": "Start discovering your real value",
  "product.cta.subtitle":
    "Join thousands of women in tech already negotiating with data and confidence.",
  "product.cta.button": "Get started",

  "como.badge": "Simple process",
  "como.hero.title": "How does",
  "como.hero.titleEnd": " work?",
  "como.hero.subtitle":
    "In 4 simple steps, discover your real market value and get ready to negotiate with confidence and data.",
  "como.s1.title": "Complete your profile",
  "como.s1.desc":
    "Enter your professional info: role, experience, location, technologies, and current salary. Your data stays private and secure.",
  "como.s2.title": "AI analysis",
  "como.s2.desc":
    "Our AI compares your profile against thousands of salary data points from the tech market in Latin America and worldwide.",
  "como.s3.title": "Personalized report",
  "como.s3.desc":
    "Get a detailed report with your market position, gender pay gap, growth projection, and specific recommendations.",
  "como.s4.title": "Train your negotiation",
  "como.s4.desc":
    "Practice with our AI-powered negotiation simulator. Get real-time coaching and build confidence to agree your value in the market.",
  "como.cta.title": "Ready to take the first step?",
  "como.cta.subtitle":
    "Start your free salary analysis and find out what you should be earning.",
  "como.cta.button": "Start analysis",

  "common.loading": "Loading...",

  "market.badgeLoading": "Generating market intelligence…",
  "market.badgeLive": "Recently updated data",
  "market.mainTitle": "The tech pay gap still exists",
  "market.gapLead": "Estimated pay gap for women in tech in LATAM",
  "market.gapSub": "AI estimate by role and current market",
  "market.sectionTitle": "Salary intelligence for the tech market",
  "market.sectionLead": "AI-generated data for better career decisions",
  "market.analysisSuffix": "salary analysis",
  "market.comparisonLabel": "Comparison by experience level (USD)",
  "market.trendTitle": "Salary growth",
  "market.trendSub": "Trend over the last 3 years",
  "market.tooltipAvg": "Average salary",
  "market.growthPrefix": "Average salary has grown",
  "market.workModeTitle": "Work arrangement",
  "market.workModeSub": "Average salary by modality (estimated)",
  "market.usdMonth": "USD/mo",
  "market.demand": "demand",
  "market.techPaidTitle": "Highest-paying technologies",
  "market.techPaidSub": "Ranking by demand and pay (AI)",
  "market.disclaimer":
    "* AI-generated estimates; not legal or financial advice.",
  "market.footnoteMarket": "Tech market data",
  "market.footnoteExp": "Experience level",
  "market.footnoteStack": "Tech stack",
  "market.footnoteGeo": "Geography",
  "market.referenceFrame": "Reference framework (Frontend):",
  "market.synthesis": "NegocIA+ synthesis",
};

const es: Record<string, string> = {
  ...esCore,
  ...extraEs,
  ...salaryFormEs,
};

const en: Record<string, string> = {
  ...enCore,
  ...extraEn,
  ...salaryFormEn,
};

export const dictionaries: Record<Locale, Record<string, string>> = {
  es,
  en,
};
