"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Star,
  Quote,
  ArrowRight,
  Building,
  Award,
  CheckCircle2,
  TrendingUp,
  DollarSign,
} from "lucide-react";

const cases = [
  {
    name: "Laura G.",
    role: "Senior Frontend Developer",
    company: "Startup Fintech — Ciudad de México",
    increase: "+35%",
    quote:
      "Gracias a NegocIA+ descubrí que estaba ganando un 35% menos que el promedio del mercado. Con los datos y el simulador de negociación, preparé mi caso y logré un ajuste salarial en menos de un mes.",
    highlights: [
      "Identificó brecha salarial con análisis de IA",
      "Practicó con el simulador 5 veces antes de negociar",
      "Obtuvo aumento del 35% más beneficios adicionales",
    ],
    rating: 5,
  },
  {
    name: "Sofía M.",
    role: "Data Engineer",
    company: "Empresa Multinacional — Bogotá",
    increase: "+42%",
    quote:
      "Nunca había negociado mi salario. NegocIA+ me dio la confianza y las herramientas para hacerlo. El resultado superó mis expectativas: un 42% de aumento al cambiar de empresa.",
    highlights: [
      "Primera negociación salarial exitosa",
      "Usó datos de mercado para respaldar su solicitud",
      "Consiguió 42% más en su nueva posición",
    ],
    rating: 5,
  },
  {
    name: "Andrea C.",
    role: "DevOps Engineer",
    company: "Consultora Tecnológica — Lima",
    increase: "+28%",
    quote:
      "El análisis de brecha salarial me abrió los ojos. Llevaba 3 años sin aumento y no sabía cómo abordarlo. Con la estrategia que armé usando NegocIA+, logré un 28% de incremento.",
    highlights: [
      "Detectó 3 años de estancamiento salarial",
      "Construyó argumentos basados en datos del mercado",
      "Negoció aumento del 28% en su empresa actual",
    ],
    rating: 5,
  },
];

const globalStats = [
  {
    icon: TrendingUp,
    value: "+32%",
    label: "Aumento promedio obtenido",
  },
  {
    icon: Award,
    value: "1,200+",
    label: "Casos de éxito",
  },
  {
    icon: DollarSign,
    value: "$4.5M",
    label: "Brecha salarial cerrada",
  },
];

export default function CasosDeExitoPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3A0CA3] to-[#4361EE] px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl font-bold md:text-5xl"
          >
            Casos de éxito
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg text-white/80 md:text-xl"
          >
            Historias reales de mujeres que transformaron su carrera negociando
            con datos.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {globalStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm"
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

      {/* Cases */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-5xl space-y-12">
          {cases.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left: increase badge */}
                <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#FF2E93] to-[#FF6BB5] p-8 text-white md:w-56">
                  <span className="font-heading text-5xl font-bold">
                    {item.increase}
                  </span>
                  <span className="mt-1 text-sm font-medium text-white/80">
                    de aumento
                  </span>
                  <div className="mt-4 flex gap-1">
                    {Array.from({ length: item.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-white text-white"
                      />
                    ))}
                  </div>
                </div>
                {/* Right: content */}
                <div className="flex-1 p-8">
                  <div className="mb-4 flex items-start gap-3">
                    <Quote className="mt-1 h-6 w-6 shrink-0 text-[#FF2E93]/40" />
                    <p className="italic leading-relaxed text-gray-700">
                      {item.quote}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-heading text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.role}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-400">
                      <Building className="h-4 w-4" />
                      {item.company}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {item.highlights.map((hl) => (
                      <li
                        key={hl}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        {hl}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl font-bold"
          >
            Tu historia de éxito comienza aquí
          </motion.h2>
          <p className="mt-3 text-gray-400">
            Únete a miles de mujeres que ya están cerrando la brecha salarial
            con datos e inteligencia artificial.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/salary-input"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF2E93] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#e0267f]"
            >
              Analizar mi salario
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/simulator"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Probar el simulador
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
