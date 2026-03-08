Continue refining the Salary Sister AI prototype.

All interface text must remain in Spanish.

Improve the experience of the form “Cuéntanos sobre tu perfil” and the results screen “Verificación de la realidad salarial”.

The goal is to collect a much more detailed professional profile so the AI can generate a highly personalized salary analysis and negotiation guidance.

The platform is designed for professionals from Trainee level and above. It is not targeted at university students or interns.

Design the form as a guided multi-step experience that feels supportive, professional, and empowering.

Avoid overwhelming the user with a long static form.

Instead create a step-by-step wizard with clear progress indicators.

The form should have four steps.

---

GLOBAL FORM EXPERIENCE

Add a progress indicator at the top.

Example:

Paso 1 de 4 — Tu perfil
Paso 2 de 4 — Tu trabajo actual
Paso 3 de 4 — Tu compensación
Paso 4 de 4 — Negociación

Include a small encouraging message below the progress indicator.

Example:

“Mientras más detalles compartas, más preciso será tu análisis salarial.”

Each step should appear inside a structured card layout.

Use clear spacing and readable typography.

Buttons at the bottom:

“Anterior”
“Siguiente”

Final step button:

“Analizar mi salario”

---

STEP 1 — TU PERFIL

Title:

“Cuéntanos sobre tu perfil profesional”

Subtitle:

“Esto nos ayudará a entender tu nivel de experiencia y tu valor en el mercado.”

Questions:

Área o rol:
Dropdown.

For the prototype include only one option:

Frontend Developer

---

Nivel de Seniority:

• Trainee (en formación)
• Junior (<2 años)
• Mid (2-6 años)
• Senior (6+ años)
• Lead

---

¿Cuántos años de experiencia tienes específicamente como Frontend Developer?

• 0 – 1 años
• 2 – 3 años
• 4 – 5 años
• 6 – 8 años
• 9+ años

---

¿Cuál es tu stack tecnológico principal?

Multi-select options:

• React
• Next.js
• Angular
• Vue
• JavaScript / TypeScript
• Otro (campo para especificar)

---

¿Con qué herramientas complementas tu trabajo en el día a día?

Multi-select:

• TypeScript
• JavaScript
• HTML
• CSS
• Tailwind CSS
• Git
• Testing
• APIs REST
• Otra

---

¿Cuál es tu nivel de inglés?

• Básico
• Intermedio
• Intermedio alto
• Avanzado
• Ninguno

---

¿Usas inglés en tu trabajo actual?

• Sí, frecuentemente
• A veces
• No

---

¿Dominas algún otro idioma?

• Sí (campo para especificar idioma y nivel)
• No

---

¿Cuál describe mejor tu rol actual?

• Desarrollo de interfaces y componentes
• Desarrollo frontend con lógica de negocio
• Frontend con decisiones técnicas / arquitectura
• Frontend con liderazgo o mentoría

---

STEP 2 — TU TRABAJO ACTUAL

Title:

“Cuéntanos sobre tu trabajo actual”

Subtitle:

“Esto nos ayuda a contextualizar tu salario dentro de tu mercado local.”

---

¿En qué país trabajas actualmente?

• Perú
• Colombia

---

Selecciona tu ciudad.

If Perú selected show:

Lima
Arequipa
Trujillo
Chiclayo
Cusco
Callao
Piura
Iquitos
Huancayo
Chimbote
Tacna
Pucallpa
Ica

If Colombia selected show:

Bogotá
Medellín
Cali
Barranquilla
Cartagena de Indias
Bucaramanga
Pereira
Santa Marta
Cúcuta
Ibagué

---

¿Tu trabajo es remoto, híbrido o presencial?

• Remoto
• Híbrido
• Presencial

---

¿Qué tipo de empresa es?

• Startup
• Consultora
• Agencia
• Empresa de producto digital
• Banco / Fintech
• Empresa grande / corporativa
• Otra

---

¿Cuál es tu tipo de vínculo laboral?

• Planilla
• Contractor / por servicios
• Freelance
• Otro

---

¿Cuál es tu jornada actual?

• Tiempo completo
• Medio tiempo
• Por horas / por proyecto
• Otra

---

¿Tu empresa es local o internacional?

• Local
• Internacional

---

STEP 3 — TU COMPENSACIÓN

Title:

“Cuéntanos sobre tu compensación actual”

Subtitle:

“Esta información nos ayudará a comparar tu salario con el mercado.”

---

¿Cuánto es tu salario mensual?

Numeric input field.

---

¿En qué moneda recibes tu salario?

• Soles peruanos (PEN)
• Pesos colombianos (COP)
• Dólares estadounidenses (USD)

---

¿Es sueldo bruto o neto?

Add an information icon with tooltip:

“Sueldo neto: lo que realmente recibes en tu cuenta después de descuentos.
Sueldo bruto: el monto total antes de descuentos.”

Options:

• Bruto
• Neto
• No estoy segura

---

¿Recibes bono o compensación variable?

Add information tooltip explaining:

“Ingreso adicional a tu sueldo fijo, como bonos, comisiones o incentivos.”

Options:

• Sí
• No

---

STEP 4 — NEGOCIACIÓN

Title:

“Negociación y crecimiento profesional”

Subtitle:

“Queremos ayudarte a negociar con mayor confianza.”

---

¿Hace cuánto fue tu último aumento salarial o ascenso?

• Menos de 6 meses
• Entre 6 y 12 meses
• Entre 1 y 2 años
• Más de 2 años
• Nunca he recibido un aumento

---

¿Qué tan segura te sientes negociando tu salario hoy?

Display a scale slider from:

“Muy insegura y con miedo”

to

“Muy segura y confiada”

---

¿Te gustaría practicar una negociación salarial con IA?

• Sí
• No

---

SALARY REALITY CHECK SCREEN

After completing the form, create a detailed analysis screen called:

“Verificación de la realidad salarial”

This screen should feel analytical, trustworthy, and insightful.

---

DATA TRANSPARENCY SECTION

At the top show where the salary estimate comes from.

Title:

“¿De dónde provienen estos datos?”

Display filters used:

País
Ciudad
Seniority
Stack tecnológico
Tipo de empresa

Include explanatory text:

“Este rango se basa en datos agregados del mercado tecnológico en Perú y Colombia, considerando perfiles similares al tuyo.”

---

SALARY RANGE ANALYSIS

Display:

Rango salarial estimado

Example:

S/7,200 — S/9,100

Promedio del mercado:

S/8,100

Highlight the numbers visually.

---

PERSONALIZED INSIGHTS

Generate personalized messages based on the user's profile.

Examples:

If Junior:

“Según tu perfil, estás en una etapa donde muchas profesionales comienzan a avanzar hacia roles Mid.”

If Mid:

“Tu experiencia te posiciona cerca de roles Senior en algunos mercados.”

---

CAREER PROGRESSION PROMPTS

Ask reflective questions:

“¿Te gustaría avanzar hacia un rol Mid o Senior?”

Show skill suggestions if relevant.

Example:

“Para avanzar al siguiente nivel, podrías fortalecer áreas como arquitectura frontend, testing o liderazgo técnico.”

---

FREELANCE VS EMPLOYMENT INSIGHTS

Ask:

“¿Te gustaría ganar más manteniendo tu empleo actual o explorando oportunidades freelance?”

Offer options.

---

NEGOTIATION ALERT

If the user indicates long time without salary increase, show a supportive alert:

“Muchas profesionales permanecen años sin renegociar su salario.
Esto no significa que tu trabajo valga menos.”

Add suggestion:

“Podríamos ayudarte a preparar una conversación de negociación salarial.”

Button:

“Practicar negociación con IA”

---

EMOTIONAL UX GOAL

The user should feel:

understood
supported
empowered

The tone should feel similar to a mentor or career coach that understands the challenges women face when negotiating salary.

The platform should feel intelligent, empathetic, and trustworthy.
