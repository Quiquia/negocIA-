"use client";

import {
  ArrowRight,
  Brain,
  Heart,
  LineChart,
  MessageSquare,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const features = [
  {
    icon: Brain,
    title: "AI Salary Scanner",
    subtitle: "Descubre cuánto deberías ganar realmente.",
    description:
      "Nuestra IA analiza miles de puntos de datos en tiempo real para determinar exactamente cuánto deberías ganar basándose en tu rol, seniority, stack tecnológico y país.",
    iconBg: "bg-[#FCE4EC]",
    iconColor: "text-[#FF2E93]",
    badge: "Feature principal",
  },
  {
    icon: LineChart,
    title: "Salary Intelligence Dashboard",
    subtitle: "Visualiza tu brecha salarial con datos claros.",
    description:
      "Visualiza la brecha salarial, proyecta tus ingresos futuros y compara tu compensación con otras mujeres en roles similares a nivel local e internacional.",
    iconBg: "bg-[#EDE7F6]",
    iconColor: "text-[#4361EE]",
    badge: null,
  },
  {
    icon: MessageSquare,
    title: "Negotiation Simulator",
    subtitle: "Practica tu negociación antes de la reunión real.",
    description:
      "Practica tu conversación salarial con un manager de IA. Recibe feedback inmediato sobre tu claridad, uso de datos y nivel de confianza antes de la reunión real.",
    iconBg: "bg-[#E8EAF6]",
    iconColor: "text-[#4361EE]",
    badge: null,
  },
  {
    icon: Heart,
    title: "Confidence Coaching",
    subtitle: "Supera el miedo a negociar tu salario.",
    description:
      "Herramientas psicológicas y ejercicios diseñados específicamente para superar el síndrome del impostor y el miedo a negociar en entornos tecnológicos.",
    iconBg: "bg-[#FCE4EC]",
    iconColor: "text-[#FF2E93]",
    badge: null,
  },
];

export default function ProductoPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <motion.span
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          >
            Nuestro Producto
          </motion.span>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl font-bold text-foreground md:text-6xl"
          >
            Herramientas potenciadas por{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              inteligencia artificial
            </span>
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Descubre tu verdadero valor en el mercado y negocia con confianza.
            NegocIA+ combina datos reales con IA avanzada para empoderarte.
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative rounded-4xl bg-white border border-[#E2E8F0] p-8 md:p-9 shadow-sm hover:shadow-lg hover:border-[#CBD5E1] transition-all duration-300 cursor-default"
            >
              {feature.badge && (
                <div className="absolute top-6 right-6 px-3.5 py-1 bg-[#FF2E93] rounded-full text-xs font-bold text-white">
                  {feature.badge}
                </div>
              )}

              <div
                className={`mb-8 flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg}`}
              >
                <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
              </div>

              <h3 className="font-heading text-2xl font-extrabold text-[#0F172A]">
                {feature.title}
              </h3>

              <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-[#FF2E93]">
                <ArrowRight className="h-3.5 w-3.5" />
                {feature.subtitle}
              </p>

              <p className="mt-4 text-[#64748B] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-[2rem] bg-gradient-to-r from-secondary to-accent p-10 text-center text-white md:p-16"
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Empieza a descubrir tu verdadero valor
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Únete a miles de mujeres en tech que ya están negociando con datos y
            confianza.
          </p>
          <Link
            href="/salary-input"
            className="mt-8 inline-flex items-center gap-2 rounded-full text-white  bg-[#FF2E93] px-8 py-3.5 font-semibold  transition-transform hover:scale-105"
          >
            Comenzar ahora <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
