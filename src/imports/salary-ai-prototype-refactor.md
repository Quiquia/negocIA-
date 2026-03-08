Continue refining the Salary Sister AI prototype.

Improve the multi-step form validation, field behavior, and conditional logic to make the experience feel like a real production-ready application.

All interface text must remain in Spanish.

The form must guide users clearly and prevent them from continuing if required fields are not completed.

The experience should feel supportive and intuitive, especially for users who may feel uncertain or insecure about discussing salary.

---

FORM VALIDATION BEHAVIOR

All questions must be mandatory except one.

If the user clicks “Siguiente” without completing required fields, the system must display validation messages.

Do NOT allow silent failure.

Required fields must show a red asterisk (*) next to the question label.

Example:

Nivel de Seniority *

---

ERROR FEEDBACK

If the user tries to continue without answering required fields:

Display inline error messages below the question.

Example message:

“Por favor responde esta pregunta antes de continuar.”

Highlight the field border in red.

Scroll automatically to the first missing field.

---

OPTIONAL QUESTION

The question:

“¿Dominas algún otro idioma?”

must NOT be required.

This question should not show a red asterisk.

Users may skip it.

---

UPDATE EMPLOYMENT TYPE OPTIONS

In the section:

“¿Cuál es tu tipo de vínculo laboral?”

Update options to:

• Planilla / Empleado Dependiente
• Contrato por Servicios / Locación
• Freelancer / Autónomo
• Otro

---

SALARY INPUT IMPROVEMENTS

In the compensation section improve the field:

“¿Cuánto es tu salario mensual?”

Add dynamic currency symbol based on selected country.

If country = Perú

Show currency prefix:

S/

If country = Colombia

Show currency prefix:

$

---

SALARY INPUT VALIDATION

The salary field must enforce validation rules.

Restrictions:

• Do not allow negative numbers
• Do not allow numbers lower than 50

If the user enters an invalid number display an inline message.

Example:

“El salario debe ser mayor a 50.”

Prevent form continuation until the value is valid.

---

NEGOTIATION BRANCHING LOGIC

In the section:

“¿Te gustaría practicar una negociación salarial con IA?”

Options:

Sí
No

If the user selects “Sí”:

Continue the flow to the AI negotiation simulator after the salary analysis.

If the user selects “No”:

End the experience after the salary analysis screen.

Before finishing, show a friendly optional prompt:

Title:

“¿Te gustaría practicar una negociación salarial real con IA?”

Message:

“Podemos simular una conversación real con un gerente para ayudarte a mejorar tu seguridad al negociar.”

Buttons:

“Sí, quiero practicar”
“Tal vez después”

If the user selects “Sí”, redirect to the negotiation simulator.

---

LANDING PAGE INTERACTIVE DEMO UPDATE

Update the interactive AI teaser on the landing page.

Replace the previous simplified questions with the new, more detailed questions from the form.

However, do not show the full form immediately.

Instead show a lightweight preview interaction.

---

LANDING MINI INTERACTION FLOW

The landing page demo should show only the first two questions.

Example:

¿A qué te dedicas?
Frontend Developer

Nivel de Seniority
Trainee / Junior / Mid / Senior / Lead

When the user selects answers and clicks “Continuar análisis”, the system should transition into the full form interface.

This transition should feel natural and seamless.

Display message:

“Genial. Para darte un análisis más preciso necesitamos algunos detalles adicionales.”

Then open the complete multi-step form starting from Step 1.

The previous answers should remain pre-filled.

---

UX GOAL

The experience should feel:

supportive
clear
trustworthy
professional

Users should never feel confused about why the form is not progressing.

Validation feedback must guide them step by step.

The landing interaction should spark curiosity and smoothly transition users into the full salary analysis experience.
