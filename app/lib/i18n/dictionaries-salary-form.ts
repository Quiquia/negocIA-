/** Formulario /salary-input: valores enviados al backend siguen en español; solo UI traducida. */

export const salaryFormEs: Record<string, string> = {
  "salary.progress":
    "Paso {{current}} de {{total}} — {{stepTitle}}",
  "salary.detailHint":
    "Mientras más detalles compartas, más preciso será tu análisis salarial.",
  "salary.sparkleNote":
    "NegocIA+ utiliza datos reales del mercado tecnológico para estimar rangos salariales.",

  "salary.step1": "Tu perfil",
  "salary.step2": "Tu trabajo actual",
  "salary.step3": "Tu compensación",
  "salary.step4": "Negociación",

  "salary.s1.title": "Cuéntanos sobre tu perfil profesional",
  "salary.s1.subtitle":
    "Esto nos ayudará a entender tu nivel de experiencia y tu valor en el mercado.",
  "salary.label.roleArea": "Área o rol",
  "salary.role.frontend": "Frontend Developer",
  "salary.role.backend": "Backend Developer",
  "salary.role.dataAnalyst": "Data Analyst",
  "salary.role.ux": "UX Designer",
  "salary.role.other": "Otro",
  "salary.customRole.placeholder":
    "Escribe tu rol (ej. DevOps Engineer, QA Tester, Product Manager...)",
  "salary.err.writeRole": "Por favor escribe tu rol.",
  "salary.techRoleError":
    "Este rol no parece estar relacionado con tecnología. Ejemplos: DevOps Engineer, QA Tester, Data Analyst, Scrum Master, Soporte técnico...",

  "salary.label.seniority": "Nivel de Seniority",
  "salary.sen.trainee": "Trainee (en formación)",
  "salary.sen.junior": "Junior (<2 años)",
  "salary.sen.mid": "Mid (2-6 años)",
  "salary.sen.senior": "Senior (6+ años)",
  "salary.sen.lead": "Lead",

  "salary.label.yearsExp":
    "¿Cuántos años de experiencia tienes específicamente como {{role}}?",
  "salary.years.0": "0 – 1 años",
  "salary.years.1": "2 – 3 años",
  "salary.years.2": "4 – 5 años",
  "salary.years.3": "6 – 8 años",
  "salary.years.4": "9+ años",

  "salary.label.stack": "¿Cuál es tu stack tecnológico principal?",
  "salary.stackHintDesktop":
    "Elige las que te representen. ¿Quieres sumar algo más? Escríbelo y pulsa Intro o Enter: se convierte en etiqueta y puedes seguir añadiendo.",
  "salary.stackHintMobile":
    "Elige las que te representen. Para sumar algo más, escribe y pulsa Intro o Retorno en el teclado (a veces «Ir» o «Hecho»): se crea la etiqueta y puedes seguir.",
  "salary.toolsHintDesktop":
    "Marca las que uses cada día. ¿Falta alguna? Escríbela y pulsa Intro o Enter para añadirla.",
  "salary.toolsHintMobile":
    "Marca las que uses cada día. ¿Falta alguna? Escríbela y pulsa Intro o Retorno en el teclado; es lo mismo que Enter.",
  "salary.err.selectTech": "Selecciona al menos una tecnología.",
  "salary.ph.techShort": "Otro...",
  "salary.ph.techOther": "Ej. Kotlin, Terraform...",
  "salary.err.lettersOnly": "Solo letras",

  "salary.label.tools":
    "¿Con qué herramientas complementas tu trabajo en el día a día?",
  "salary.err.selectTool": "Selecciona al menos una herramienta.",
  "salary.ph.toolShort": "Otra...",
  "salary.ph.toolOther": "Ej. Figma, SAP...",

  "salary.label.enLevel": "¿Cuál es tu nivel de inglés?",
  "salary.enlev.0": "Básico",
  "salary.enlev.1": "Intermedio",
  "salary.enlev.2": "Intermedio alto",
  "salary.enlev.3": "Avanzado",
  "salary.enlev.4": "Ninguno",

  "salary.label.enUsage": "¿Usas inglés en tu trabajo actual?",
  "salary.enuse.0": "Sí, frecuentemente",
  "salary.enuse.1": "A veces",
  "salary.enuse.2": "No",

  "salary.label.otherLang": "¿Dominas algún otro idioma?",
  "salary.opt.si": "Sí",
  "salary.opt.no": "No",
  "salary.err.otherLangRequired": "Indica si dominas otro idioma.",

  "salary.label.roleDesc": "¿Cuál describe mejor tu rol actual?",
  "salary.roleDesc.placeholderOther":
    "Describe brevemente tu rol (ej. Gestión de proyectos tech, Soporte técnico...)",
  "salary.err.describeRole": "Por favor describe tu rol.",

  "salary.rd.fe.0": "Desarrollo de interfaces y componentes",
  "salary.rd.fe.1": "Desarrollo frontend con lógica de negocio",
  "salary.rd.fe.2": "Frontend con decisiones técnicas / arquitectura",
  "salary.rd.fe.3": "Frontend con liderazgo o mentoría",
  "salary.rd.be.0": "Desarrollo de APIs y microservicios",
  "salary.rd.be.1": "Backend con lógica de negocio compleja",
  "salary.rd.be.2": "Backend con decisiones técnicas / arquitectura",
  "salary.rd.be.3": "Backend con liderazgo o mentoría",
  "salary.rd.da.0": "Análisis de datos y generación de reportes",
  "salary.rd.da.1": "Data analysis con modelado y visualización",
  "salary.rd.da.2": "Data analysis con decisiones estratégicas de negocio",
  "salary.rd.da.3": "Data analysis con liderazgo o mentoría",
  "salary.rd.ux.0": "Diseño de interfaces y prototipado",
  "salary.rd.ux.1": "UX Research y testing con usuarios",
  "salary.rd.ux.2": "UX con decisiones de producto y estrategia",
  "salary.rd.ux.3": "UX con liderazgo de equipo o mentoría",

  "salary.s2.title": "Cuéntanos sobre tu trabajo actual",
  "salary.s2.subtitle":
    "Esto nos ayuda a contextualizar tu salario dentro de tu mercado local.",
  "salary.label.country": "¿En qué país trabajas actualmente?",
  "salary.ph.country": "Selecciona tu país",
  "salary.label.city": "Selecciona tu ciudad",
  "salary.ph.city": "Selecciona tu ciudad",
  "salary.label.workMode": "¿Tu trabajo es remoto, híbrido o presencial?",
  "salary.wm.0": "Remoto",
  "salary.wm.1": "Híbrido",
  "salary.wm.2": "Presencial",
  "salary.label.companyType": "¿Qué tipo de empresa es?",
  "salary.ct.0": "Startup",
  "salary.ct.1": "Consultora",
  "salary.ct.2": "Agencia",
  "salary.ct.3": "Empresa de producto digital",
  "salary.ct.4": "Banco / Fintech",
  "salary.ct.5": "Empresa grande / corporativa",
  "salary.ct.6": "Otra",
  "salary.label.contract": "¿Cuál es tu tipo de vínculo laboral?",
  "salary.ctrt.0": "Planilla / Empleado Dependiente",
  "salary.ctrt.1": "Contrato por Servicios / Locación",
  "salary.ctrt.2": "Freelancer / Autónomo",
  "salary.ctrt.3": "Otro",
  "salary.label.schedule": "¿Cuál es tu jornada actual?",
  "salary.ws.0": "Tiempo completo",
  "salary.ws.1": "Medio tiempo",
  "salary.ws.2": "Por horas / por proyecto",
  "salary.ws.3": "Otra",
  "salary.label.companyOrigin": "¿Tu empresa es local o internacional?",
  "salary.co.local": "Local",
  "salary.co.intl": "Internacional",

  "salary.s3.title": "Cuéntanos sobre tu compensación actual",
  "salary.s3.subtitle":
    "Esta información nos ayudará a comparar tu salario con el mercado.",
  "salary.label.monthly": "¿Cuánto es tu salario mensual?",
  "salary.ph.salary": "Ej. 5000",
  "salary.salaryPrivacy":
    "Puedes ingresar una estimación aproximada. Tus datos son privados y solo se utilizan para generar tu análisis salarial.",
  "salary.err.salaryRequired": "Por favor ingresa tu salario.",
  "salary.err.salaryMin": "El salario debe ser mayor a 50.",
  "salary.err.salaryNegative": "No se permiten números negativos",
  "salary.label.currency": "¿En qué moneda recibes tu salario?",
  "salary.label.salaryType": "¿Es sueldo bruto o neto?",
  "salary.tooltip.salaryTypeNet":
    "Sueldo neto: lo que realmente recibes en tu cuenta después de descuentos.",
  "salary.tooltip.salaryTypeGross":
    "Sueldo bruto: el monto total antes de descuentos.",
  "salary.st.0": "Bruto",
  "salary.st.1": "Neto",
  "salary.st.2": "No estoy segura",
  "salary.label.hasBonus": "¿Recibes bono o compensación variable?",
  "salary.tooltip.bonus":
    "Ingreso adicional a tu sueldo fijo, como bonos, comisiones o incentivos.",

  "salary.s4.title": "Negociación y crecimiento",
  "salary.s4.subtitle": "Queremos ayudarte a negociar con mayor confianza.",
  "salary.label.lastRaise": "¿Hace cuánto fue tu último aumento salarial o ascenso?",
  "salary.li.0": "Menos de 6 meses",
  "salary.li.1": "Entre 6 y 12 meses",
  "salary.li.2": "Entre 1 y 2 años",
  "salary.li.3": "Más de 2 años",
  "salary.li.4": "Nunca he recibido un aumento",
  "salary.label.confidence":
    "¿Qué tan segura te sientes negociando tu salario hoy?",
  "salary.conf.scaleLow": "Muy insegura y con miedo",
  "salary.conf.scaleHigh": "Muy segura y confiada",
  "salary.conf.help":
    "Escala Likert del 1 al 5: el 1 corresponde a mucha inseguridad o miedo al negociar; el 5, a mucha seguridad y confianza. Elige el valor que mejor refleje cómo te sientes hoy: no hay respuestas correctas ni incorrectas, solo queremos conocer tu punto de partida.",

  "salary.includes.title": "Tu análisis incluirá:",
  "salary.includes.1": "Tu rango salarial estimado",
  "salary.includes.2": "Comparación con el mercado tecnológico",
  "salary.includes.3": "Recomendaciones para negociar tu salario",

  "salary.btn.back": "Anterior",
  "salary.btn.next": "Siguiente",
  "salary.btn.submit": "Analizar mi salario",
  "salary.btn.saving": "Guardando...",
  "salary.err.save": "Error al guardar los datos.",
  "salary.err.answerFirst": "Por favor responde esta pregunta antes de continuar.",

  "salary.hint.seniority": "Falta: nivel de seniority.",
  "salary.hint.years": "Falta: años de experiencia en el rol.",
  "salary.hint.tech": "Falta: al menos una tecnología del stack (checkbox o campo + Enter).",
  "salary.hint.tools": "Falta: al menos una herramienta (checkbox o campo + Enter).",
  "salary.hint.en": "Falta: nivel de inglés.",
  "salary.hint.enUse": "Falta: uso de inglés en el trabajo.",
  "salary.hint.lang": "Falta: si dominas otro idioma (Sí o No).",
  "salary.hint.roleDesc":
    "Falta: cómo describe mejor tu rol (elige una opción o escribe si es «Otro»).",
  "salary.hint.customRoleEmpty": "Falta: escribe tu rol en «Otro».",
  "salary.hint.customRoleTech": "El rol debe ser de ámbito tecnológico.",
  "salary.hint.reviewFields": "Revisa los campos marcados con error.",
};

export const salaryFormEn: Record<string, string> = {
  "salary.progress": "Step {{current}} of {{total}} — {{stepTitle}}",
  "salary.detailHint":
    "The more detail you share, the more accurate your salary analysis will be.",
  "salary.sparkleNote":
    "NegocIA+ uses real tech market data to estimate salary ranges.",

  "salary.step1": "Your profile",
  "salary.step2": "Your current job",
  "salary.step3": "Your compensation",
  "salary.step4": "Negotiation",

  "salary.s1.title": "Tell us about your professional profile",
  "salary.s1.subtitle":
    "This helps us understand your experience level and your value in the market.",
  "salary.label.roleArea": "Area or role",
  "salary.role.frontend": "Frontend Developer",
  "salary.role.backend": "Backend Developer",
  "salary.role.dataAnalyst": "Data Analyst",
  "salary.role.ux": "UX Designer",
  "salary.role.other": "Other",
  "salary.customRole.placeholder":
    "Enter your role (e.g. DevOps Engineer, QA Tester, Product Manager...)",
  "salary.err.writeRole": "Please enter your role.",
  "salary.techRoleError":
    "This role does not look tech-related. Examples: DevOps Engineer, QA Tester, Data Analyst, Scrum Master, IT support...",

  "salary.label.seniority": "Seniority level",
  "salary.sen.trainee": "Trainee (in training)",
  "salary.sen.junior": "Junior (<2 years)",
  "salary.sen.mid": "Mid (2–6 years)",
  "salary.sen.senior": "Senior (6+ years)",
  "salary.sen.lead": "Lead",

  "salary.label.yearsExp":
    "How many years of experience do you have specifically as {{role}}?",
  "salary.years.0": "0 – 1 years",
  "salary.years.1": "2 – 3 years",
  "salary.years.2": "4 – 5 years",
  "salary.years.3": "6 – 8 years",
  "salary.years.4": "9+ years",

  "salary.label.stack": "What is your main tech stack?",
  "salary.stackHintDesktop":
    "Pick what fits you. Want to add something else? Type it and press Enter — it becomes a tag and you can keep going.",
  "salary.stackHintMobile":
    "Pick what fits you. To add something else, type it and tap Return or Enter on the keyboard (sometimes labeled Go or Done).",
  "salary.toolsHintDesktop":
    "Check the tools you use daily. Missing one? Type it and press Enter to add it.",
  "salary.toolsHintMobile":
    "Check the tools you use daily. Missing one? Type it and tap Return on the keyboard — same as Enter.",
  "salary.err.selectTech": "Select at least one technology.",
  "salary.ph.techShort": "Other...",
  "salary.ph.techOther": "e.g. Kotlin, Terraform...",
  "salary.err.lettersOnly": "Letters only",

  "salary.label.tools": "What tools do you use day to day?",
  "salary.err.selectTool": "Select at least one tool.",
  "salary.ph.toolShort": "Other...",
  "salary.ph.toolOther": "e.g. Figma, SAP...",

  "salary.label.enLevel": "What is your English level?",
  "salary.enlev.0": "Basic",
  "salary.enlev.1": "Intermediate",
  "salary.enlev.2": "Upper intermediate",
  "salary.enlev.3": "Advanced",
  "salary.enlev.4": "None",

  "salary.label.enUsage": "Do you use English in your current job?",
  "salary.enuse.0": "Yes, frequently",
  "salary.enuse.1": "Sometimes",
  "salary.enuse.2": "No",

  "salary.label.otherLang": "Do you speak any other language?",
  "salary.opt.si": "Yes",
  "salary.opt.no": "No",
  "salary.err.otherLangRequired": "Please indicate whether you speak another language.",

  "salary.label.roleDesc": "Which best describes your current role?",
  "salary.roleDesc.placeholderOther":
    "Briefly describe your role (e.g. tech project management, IT support...)",
  "salary.err.describeRole": "Please describe your role.",

  "salary.rd.fe.0": "Building interfaces and components",
  "salary.rd.fe.1": "Frontend development with business logic",
  "salary.rd.fe.2": "Frontend with technical / architecture decisions",
  "salary.rd.fe.3": "Frontend with leadership or mentoring",
  "salary.rd.be.0": "Building APIs and microservices",
  "salary.rd.be.1": "Backend with complex business logic",
  "salary.rd.be.2": "Backend with technical / architecture decisions",
  "salary.rd.be.3": "Backend with leadership or mentoring",
  "salary.rd.da.0": "Data analysis and reporting",
  "salary.rd.da.1": "Data analysis with modeling and visualization",
  "salary.rd.da.2": "Data analysis with strategic business decisions",
  "salary.rd.da.3": "Data analysis with leadership or mentoring",
  "salary.rd.ux.0": "Interface design and prototyping",
  "salary.rd.ux.1": "UX research and user testing",
  "salary.rd.ux.2": "UX with product and strategy decisions",
  "salary.rd.ux.3": "UX with team leadership or mentoring",

  "salary.s2.title": "Tell us about your current job",
  "salary.s2.subtitle":
    "This helps us place your salary in your local market context.",
  "salary.label.country": "Which country do you work in?",
  "salary.ph.country": "Select your country",
  "salary.label.city": "Select your city",
  "salary.ph.city": "Select your city",
  "salary.label.workMode": "Is your job remote, hybrid, or on-site?",
  "salary.wm.0": "Remote",
  "salary.wm.1": "Hybrid",
  "salary.wm.2": "On-site",
  "salary.label.companyType": "What type of company is it?",
  "salary.ct.0": "Startup",
  "salary.ct.1": "Consulting firm",
  "salary.ct.2": "Agency",
  "salary.ct.3": "Digital product company",
  "salary.ct.4": "Bank / Fintech",
  "salary.ct.5": "Large / corporate company",
  "salary.ct.6": "Other",
  "salary.label.contract": "What is your employment arrangement?",
  "salary.ctrt.0": "Payroll / permanent employee",
  "salary.ctrt.1": "Contract / professional services",
  "salary.ctrt.2": "Freelancer / self-employed",
  "salary.ctrt.3": "Other",
  "salary.label.schedule": "What is your current schedule?",
  "salary.ws.0": "Full time",
  "salary.ws.1": "Part time",
  "salary.ws.2": "Hourly / per project",
  "salary.ws.3": "Other",
  "salary.label.companyOrigin": "Is your employer local or international?",
  "salary.co.local": "Local",
  "salary.co.intl": "International",

  "salary.s3.title": "Tell us about your current compensation",
  "salary.s3.subtitle":
    "This helps us compare your pay with the market.",
  "salary.label.monthly": "What is your monthly salary?",
  "salary.ph.salary": "e.g. 5000",
  "salary.salaryPrivacy":
    "You can enter an approximate figure. Your data is private and only used to generate your salary analysis.",
  "salary.err.salaryRequired": "Please enter your salary.",
  "salary.err.salaryMin": "Salary must be greater than 50.",
  "salary.err.salaryNegative": "Negative numbers are not allowed",
  "salary.label.currency": "Which currency are you paid in?",
  "salary.label.salaryType": "Is this gross or net pay?",
  "salary.tooltip.salaryTypeNet":
    "Net pay: what you actually receive in your account after deductions.",
  "salary.tooltip.salaryTypeGross":
    "Gross pay: the total amount before deductions.",
  "salary.st.0": "Gross",
  "salary.st.1": "Net",
  "salary.st.2": "I’m not sure",
  "salary.label.hasBonus": "Do you receive a bonus or variable pay?",
  "salary.tooltip.bonus":
    "Income on top of your fixed salary, such as bonuses, commissions, or incentives.",

  "salary.s4.title": "Negotiation and growth",
  "salary.s4.subtitle": "We want to help you negotiate with more confidence.",
  "salary.label.lastRaise": "When was your last raise or promotion?",
  "salary.li.0": "Less than 6 months ago",
  "salary.li.1": "Between 6 and 12 months ago",
  "salary.li.2": "Between 1 and 2 years ago",
  "salary.li.3": "More than 2 years ago",
  "salary.li.4": "I have never received a raise",
  "salary.label.confidence":
    "How confident do you feel negotiating your salary today?",
  "salary.conf.scaleLow": "Very insecure or afraid",
  "salary.conf.scaleHigh": "Very confident",
  "salary.conf.help":
    "Likert scale 1–5: 1 means a lot of insecurity or fear about negotiating; 5 means a lot of confidence. Pick the value that best reflects how you feel today—there are no right or wrong answers, we just want your starting point.",

  "salary.includes.title": "Your analysis will include:",
  "salary.includes.1": "Your estimated salary range",
  "salary.includes.2": "Comparison with the tech market",
  "salary.includes.3": "Recommendations to negotiate your salary",

  "salary.btn.back": "Back",
  "salary.btn.next": "Next",
  "salary.btn.submit": "Analyze my salary",
  "salary.btn.saving": "Saving...",
  "salary.err.save": "Could not save your data.",
  "salary.err.answerFirst": "Please answer this question before continuing.",

  "salary.hint.seniority": "Missing: seniority level.",
  "salary.hint.years": "Missing: years of experience in the role.",
  "salary.hint.tech":
    "Missing: at least one technology in your stack (checkbox or field + Enter).",
  "salary.hint.tools":
    "Missing: at least one tool (checkbox or field + Enter).",
  "salary.hint.en": "Missing: English level.",
  "salary.hint.enUse": "Missing: English usage at work.",
  "salary.hint.lang": "Missing: whether you speak another language (Yes or No).",
  "salary.hint.roleDesc":
    "Missing: how best to describe your role (choose an option or write if you picked “Other”).",
  "salary.hint.customRoleEmpty": "Missing: enter your role under “Other”.",
  "salary.hint.customRoleTech": "The role must be in a tech-related field.",
  "salary.hint.reviewFields": "Check the fields marked with errors.",
};
