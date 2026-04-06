"use client";

import {
  ArrowRight,
  Brain,
  FileText,
  MessagesSquare,
  UserCircle,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: UserCircle,
    title: "Completa tu perfil",
    description:
      "Ingresa tu información profesional: rol, experiencia, ubicación, tecnologías y salario actual. Toda tu data se mantiene privada y segura.",
  },
  {
    number: "02",
    icon: Brain,
    title: "Análisis con IA",
    description:
      "Nuestra inteligencia artificial analiza tu perfil contra miles de datos salariales del mercado tech en Latinoamérica y el mundo.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Reporte personalizado",
    description:
      "Recibe un reporte detallado con tu posición en el mercado, brecha salarial de género, proyección de crecimiento y recomendaciones específicas.",
  },
  {
    number: "04",
    icon: MessagesSquare,
    title: "Entrena tu negociación",
    description:
      "Practica con nuestro simulador de negociación impulsado por IA. Recibe coaching en tiempo real y desarrolla la confianza para acordar tu valor en el mercado.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <motion.span
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
          >
            Proceso Simple
          </motion.span>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl font-bold text-foreground md:text-6xl"
          >
            ¿Cómo funciona{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NegocIA+
            </span>
            ?
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            En 4 simples pasos, descubre tu valor real en el mercado y prepárate
            para negociar con confianza y datos.
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 pb-24">
        <div className="relative mx-auto max-w-3xl">
          {/* Gradient Line */}
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary via-accent to-secondary md:left-1/2 md:block md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                {/* Number circle on the line */}
                <div className="absolute left-8 hidden h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-lg md:left-1/2 md:flex md:-translate-x-1/2">
                  {step.number}
                </div>

                {/* Card */}
                <div
                  className={`w-full rounded-[2rem] border border-white/50 bg-white/80 p-8 shadow-sm backdrop-blur-sm md:w-[calc(50%-3rem)] ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 md:hidden">
                      <span className="text-sm font-bold text-primary">
                        {step.number}
                      </span>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <step.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-[2rem] bg-gradient-to-r from-primary to-accent p-10 text-center text-white md:p-16"
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            ¿Lista para dar el primer paso?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Comienza tu análisis salarial gratuito y descubre cuánto deberías
            estar ganando.
          </p>
          <Link
            href="/salary-input"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-primary transition-transform hover:scale-105"
          >
            Comenzar análisis <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
