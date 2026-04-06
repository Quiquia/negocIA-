"use client";

import {
  ArrowRight,
  BrainCircuit,
  Globe,
  HeartHandshake,
  Lightbulb,
  Linkedin,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getSalarySubmissionsCount } from "../home-actions";

const teamMembers = [
  {
    name: "Rosmery Fabián Escandon",
    role: "UX/UI Designer",
    specialties: "Product Design • UX Research",
    description: "Diseña experiencias digitales intuitivas centradas en las necesidades reales de mujeres en tecnología.",
    image: "/assets/photo-rosmery.webp",
    linkedin: "https://www.linkedin.com/in/rosmery-fabian-escandon",
  },
  {
    name: "Vanessa Quiquia",
    role: "Full Stack Developer",
    specialties: "AI Systems • Platform Engineering",
    description: "Construye plataformas escalables integrando IA y datos para resolver problemas del mercado laboral.",
    image: "/assets/photo-vanessa.webp",
    linkedin: "https://www.linkedin.com/in/bequidev",
  },
  {
    name: "Carolina Vargas",
    role: "Full Stack Developer",
    specialties: "Software Architecture • Backend Engineering",
    description: "Arquitecta de soluciones eficientes que impulsan las funcionalidades clave y el rendimiento de NegocIA+.",
    image: "/assets/photo-carolina.webp",
    linkedin: "https://www.linkedin.com/in/carolinavargasjaramillo-analyst",
  },
  {
    name: "Alexandra Canchis",
    role: "Communications Strategist",
    specialties: "Storytelling • Community Strategy",
    description: "Amplifica el impacto de la plataforma, conectando nuestra misión con la comunidad tecnológica.",
    image: "/assets/photo-alexandra.webp",
    linkedin: "https://www.linkedin.com/in/alexandra-canchis-angulo-b2340b2a0",
  },
  {
    name: "Lucía Gil",
    role: "Product Strategist",
    specialties: "Product Vision • Market Strategy",
    description: "Lidera la visión estratégica para consolidar una herramienta de inteligencia salarial líder en Latam.",
    image: "/assets/photo-lucia.webp",
    linkedin: "https://www.linkedin.com/in/luciagilv",
  },
];

const problems = [
  {
    icon: TrendingUp,
    title: "Brecha salarial persistente",
    description:
      "Las mujeres en tecnología ganan en promedio un 20-30% menos que sus pares masculinos en roles equivalentes.",
  },
  {
    icon: ShieldCheck,
    title: "Falta de transparencia salarial",
    description:
      "La mayoría de empresas no publican rangos salariales, dejando a las candidatas sin información para negociar.",
  },
  {
    icon: BrainCircuit,
    title: "Sesgos inconscientes",
    description:
      "Los procesos de negociación están plagados de sesgos que penalizan a las mujeres que negocian activamente.",
  },
  {
    icon: HeartHandshake,
    title: "Falta de preparación",
    description:
      "Muchas profesionales no cuentan con herramientas ni datos concretos para respaldar sus solicitudes salariales.",
  },
  {
    icon: Users,
    title: "Ausencia de referentes",
    description:
      "Pocas mujeres comparten abiertamente sus experiencias de negociación, creando un vacío de conocimiento colectivo.",
  },
];

const roadmap = [
  {
    year: "2026",
    title: "Lanzamiento y validación",
    items: [
      "MVP con análisis salarial basado en IA",
      "Simulador de negociación interactivo",
      "Comunidad inicial de 5,000 usuarias",
    ],
  },
  {
    year: "2027",
    title: "Expansión regional",
    items: [
      "Cobertura en 10+ países de Latinoamérica",
      "Alianzas con empresas comprometidas con equidad",
      "Reportes de industria y benchmarks salariales",
    ],
  },
  {
    year: "2028",
    title: "Impacto a escala",
    items: [
      "Integración con plataformas de empleo",
      "Certificación de equidad salarial para empresas",
      "Red de mentoría y negociación colectiva",
    ],
  },
];

function formatEsInteger(n: number) {
  return new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(n);
}

export default function SobreNosotrosPage() {
  const [submissionCount, setSubmissionCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const count = await getSalarySubmissionsCount();
      if (!cancelled) setSubmissionCount(count);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(
    () => [
      {
        value:
          submissionCount === null
            ? "…"
            : `+${formatEsInteger(submissionCount)}`,
        label: "Análisis realizados",
        icon: Users,
      },
      { value: "Latam", label: "Cobertura regional", icon: Globe },
      { value: "100%", label: "Gratuito y accesible", icon: Sparkles },
    ],
    [submissionCount],
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3A0CA3] to-[#4361EE] py-20 px-6 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl font-bold md:text-5xl"
          >
            Sobre NegocIA+
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg text-white/80 md:text-xl"
          >
            Empoderamos a mujeres en tecnología con datos e inteligencia
            artificial para cerrar la brecha salarial en Latinoamérica.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF2E93]/10">
              <Target className="h-6 w-6 text-[#FF2E93]" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-gray-900">
              Nuestra Misión
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Proporcionar a las mujeres en tecnología herramientas basadas en
              datos e inteligencia artificial que les permitan negociar salarios
              justos y cerrar la brecha salarial de género en Latinoamérica.
            </p>
          </motion.div>
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#4361EE]/10">
              <Lightbulb className="h-6 w-6 text-[#4361EE]" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-gray-900">
              Nuestra Visión
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Un futuro donde cada mujer profesional en tecnología tenga acceso
              a información transparente y herramientas que garanticen equidad
              salarial, sin importar su país o nivel de experiencia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* El verdadero problema */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-heading text-3xl font-bold text-gray-900"
          >
            El verdadero problema
          </motion.h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
            La brecha salarial de género no es solo un número: es un sistema de
            barreras que enfrentan las mujeres cada día.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem, i) => (
              <motion.div
                key={problem.title}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300"
              >
                <problem.icon className="mb-3 h-8 w-8 text-[#FF2E93]" />
                <h3 className="font-heading text-lg font-semibold text-gray-900">
                  {problem.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gradient-to-b from-[#F3F0FF] to-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-heading text-3xl md:text-4xl font-bold text-[#0F172A]"
          >
            Nuestro equipo
          </motion.h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[#64748B]">
            Un equipo multidisciplinario comprometido con la equidad salarial.
          </p>

          {/* Top row — 3 cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.slice(0, 3).map((member, i) => (
              <motion.div
                key={member.name}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col rounded-2xl border border-[#E2E8F0] bg-white text-center shadow-sm hover:shadow-lg hover:border-[#CBD5E1] transition-all duration-300 overflow-hidden"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F8FAFC]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="px-6 pt-5 pb-2">
                  <h3 className="font-heading text-lg font-bold text-[#0F172A]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#FF2E93]">
                    {member.role}
                  </p>
                  <p className="mt-1 text-xs text-[#94A3B8]">
                    {member.specialties}
                  </p>
                  <p className="mt-3 text-sm text-[#64748B] leading-relaxed">
                    {member.description}
                  </p>
                </div>
                <div className="mt-auto px-6 pt-3 pb-5">
                  <div className="border-t border-[#F1F5F9] pt-4 flex justify-end">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#94A3B8] hover:text-[#4361EE] transition-colors duration-200"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom row — 2 cards centered */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 max-w-2xl lg:max-w-[calc(66.666%+0.75rem)] mx-auto">
            {teamMembers.slice(3).map((member, i) => (
              <motion.div
                key={member.name}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i + 3) * 0.1 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col rounded-2xl border border-[#E2E8F0] bg-white text-center shadow-sm hover:shadow-lg hover:border-[#CBD5E1] transition-all duration-300 overflow-hidden"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F8FAFC]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="px-6 pt-5 pb-2">
                  <h3 className="font-heading text-lg font-bold text-[#0F172A]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#FF2E93]">
                    {member.role}
                  </p>
                  <p className="mt-1 text-xs text-[#94A3B8]">
                    {member.specialties}
                  </p>
                  <p className="mt-3 text-sm text-[#64748B] leading-relaxed">
                    {member.description}
                  </p>
                </div>
                <div className="mt-auto px-6 pt-3 pb-5">
                  <div className="border-t border-[#F1F5F9] pt-4 flex justify-end">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#94A3B8] hover:text-[#4361EE] transition-colors duration-200"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-gradient-to-br from-[#3A0CA3] to-[#4361EE] px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-heading text-3xl font-bold"
          >
            Hoja de ruta del producto
          </motion.h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {roadmap.map((phase, i) => (
              <motion.div
                key={phase.year}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm"
              >
                <span className="inline-block rounded-full bg-[#FF2E93] px-4 py-1 text-sm font-bold">
                  {phase.year}
                </span>
                <h3 className="mt-4 font-heading text-xl font-semibold">
                  {phase.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-white/80"
                    >
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#FF2E93]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={false}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300"
            >
              <stat.icon className="mb-3 h-10 w-10 text-[#FF2E93]" />
              <span className="font-heading text-4xl font-bold text-[#3A0CA3]">
                {stat.value}
              </span>
              <span className="mt-1 text-gray-500">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl font-bold text-gray-900"
          >
            Comienza a negociar con datos a tu favor
          </motion.h2>
          <p className="mt-3 text-gray-600">
            Descubre cuánto deberías ganar y prepárate para tu próxima
            negociación salarial con el respaldo de la inteligencia artificial.
          </p>
          <Link
            href="/salary-input"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FF2E93] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#e0267f]"
          >
            Analizar mi salario
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
