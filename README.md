# NegocIA+

<img width="1886" height="867" alt="image" src="https://github.com/user-attachments/assets/7a3f1716-31fa-4422-9dde-98f0e6b8b876" />


Herramienta de negociación salarial impulsada por IA, diseñada para mujeres en tecnología en Latinoamérica. Analiza perfiles profesionales, compara salarios con el mercado y simula negociaciones con un gerente virtual.

## Stack tecnologico

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Estilos:** Tailwind CSS v4 + Radix UI primitives
- **Base de datos:** Supabase (PostgreSQL + RLS)
- **IA:** OpenAI GPT-4o-mini (estimaciones salariales, coach de negociacion, analisis)
- **Animaciones:** Framer Motion
- **PDF:** jsPDF (generacion de reportes)

## Requisitos previos

- Node.js 20+
- Cuenta de [Supabase](https://supabase.com) (plan gratuito)
- API key de [OpenAI](https://platform.openai.com)

## Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/Quiquia/negocIA-.git
cd negocIA-

# Instalar dependencias (flag necesario por conflictos de peer deps con React 19)
npm install --legacy-peer-deps

# Copiar variables de entorno
cp .env.example .env.local
```

## Variables de entorno

Edita `.env.local` con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu-anon-key
SUPABASE_SECRET_KEY=tu-service-role-key
OPENAI_API_KEY=tu-openai-api-key
```

| Variable | Descripcion | Donde obtenerla |
|----------|------------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase | Supabase Dashboard > Settings > API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Anon/public key (respeta RLS) | Supabase Dashboard > Settings > API |
| `SUPABASE_SECRET_KEY` | Service role key (solo para admin) | Supabase Dashboard > Settings > API |
| `OPENAI_API_KEY` | API key de OpenAI | platform.openai.com/api-keys |

## Base de datos (Supabase)

### Tabla: `salary_submissions`

Crea la tabla en el SQL Editor de Supabase:

```sql
create table public.salary_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  accepted_terms boolean not null,
  role_area text,
  seniority text,
  frontend_years_experience text,
  main_technology text,
  technical_skills text,
  english_level text,
  uses_english_current_job text,
  role_description text,
  country text,
  city text,
  work_mode text,
  company_type text,
  employment_type text,
  work_schedule text,
  company_scope text,
  monthly_salary_amount numeric,
  salary_currency text,
  salary_type text,
  has_variable_compensation boolean,
  last_raise_period text,
  negotiation_confidence text,
  wants_salary_negotiation_practice boolean
);
```

### Politicas RLS

RLS debe estar habilitado en la tabla. Crea estas politicas:

```sql
-- Permitir inserciones anonimas
create policy "allow anon insert"
  on public.salary_submissions for insert
  to anon with check (true);

-- Permitir lectura por ID
create policy "allow select by id"
  on public.salary_submissions for select
  to anon using (true);
```

## Comandos

```bash
npm run dev      # Servidor de desarrollo (Turbopack)
npm run build    # Build de produccion
npm run start    # Servidor de produccion
npm run lint     # Linter de Next.js
```

## Estructura del proyecto

```
app/
├── page.tsx                    # Landing page
├── salary-input/               # Formulario de perfil (4 pasos)
│   ├── page.tsx
│   └── actions.ts              # Server action: guardar en Supabase
├── reality-check/              # Analisis salarial con IA
│   ├── page.tsx
│   └── actions.ts              # Server action: consultar + analizar
├── professional-comparison/    # Comparacion profesional
├── career-growth/              # Crecimiento profesional
├── pay-gap/                    # Brecha salarial
├── salary-impact/              # Impacto salarial
├── negotiation-strategy/       # Estrategia de negociacion
├── simulator/                  # Simulador de negociacion con IA
│   ├── page.tsx
│   └── actions.ts              # Server actions: coach + gerente virtual
├── confidence-score/           # Puntaje de confianza + PDF
│   ├── page.tsx
│   ├── actions.ts
│   └── generate-pdf.ts
├── providers/
│   └── SalaryDataProvider.tsx  # Context global (perfil, salarios, chat)
├── components/ui/              # Componentes shadcn/ui + Radix
├── globals.css                 # Tailwind config, temas, fuentes
├── layout.tsx                  # Root layout (server component)
└── LayoutShell.tsx             # Client shell (header, footer, transiciones)

core/
├── lib/
│   ├── supabase.ts             # Cliente Supabase (anon key, respeta RLS)
│   └── salary-estimator.ts     # Estimador de salario via OpenAI
└── types/
    └── database.ts             # Tipos de la tabla salary_submissions
```

## Flujo de la aplicacion

1. **Home** (`/`) — Landing con CTAs
2. **Salary Input** (`/salary-input`) — Formulario de 4 pasos: perfil, trabajo, compensacion, negociacion
3. **Reality Check** (`/reality-check`) — IA analiza el perfil y compara con el mercado
4. **Professional Comparison** (`/professional-comparison`) — Comparacion con perfiles similares
5. **Career Growth** (`/career-growth`) — Ruta de crecimiento profesional
6. **Pay Gap** (`/pay-gap`) — Visualizacion de brecha salarial de genero
7. **Salary Impact** (`/salary-impact`) — Impacto acumulado de la brecha
8. **Negotiation Strategy** (`/negotiation-strategy`) — Estrategia personalizada
9. **Simulator** (`/simulator`) — Chat con gerente virtual + coach de IA en tiempo real
10. **Confidence Score** (`/confidence-score`) — Puntaje final + descarga de PDF

## Seguridad

- El cliente Supabase usa la **anon key** (respeta RLS) — no la service role key
- Las queries filtran por `id` especifico, nunca exponen datos de otros usuarios
- Todas las operaciones de base de datos se ejecutan en **Server Actions** (`"use server"`)
- Las API keys nunca se exponen al cliente
- RLS habilitado con politicas de INSERT y SELECT

## Despliegue

El proyecto esta configurado para desplegarse en **Vercel**:

1. Conecta el repositorio en [vercel.com](https://vercel.com)
2. Agrega las variables de entorno en Settings > Environment Variables
3. Deploy automatico en cada push a `main`
