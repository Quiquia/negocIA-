"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Plus, Minus, Mail, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "¿Qué es NegocIA+ y cómo funciona?",
    answer:
      "NegocIA+ es una herramienta gratuita que utiliza inteligencia artificial para analizar tu salario actual, compararlo con el mercado y ayudarte a preparar una negociación salarial efectiva. Solo necesitas ingresar tu perfil profesional y nuestro sistema te proporcionará un análisis completo con estrategias personalizadas.",
  },
  {
    question: "¿Es realmente gratuito?",
    answer:
      "Sí, NegocIA+ es 100% gratuito. Nuestra misión es cerrar la brecha salarial de género en tecnología y creemos que el acceso a datos salariales y herramientas de negociación no debería tener costo. Nos financiamos a través de alianzas con organizaciones comprometidas con la equidad.",
  },
  {
    question: "¿De dónde provienen los datos salariales?",
    answer:
      "Nuestros datos provienen de múltiples fuentes: encuestas salariales de la industria tech en Latinoamérica, datos públicos de plataformas de empleo, reportes de consultoras especializadas y contribuciones anónimas de nuestra comunidad. Los datos se actualizan trimestralmente para garantizar precisión.",
  },
  {
    question: "¿Mis datos personales están seguros?",
    answer:
      "Absolutamente. No almacenamos información personal identificable. Los datos de tu perfil se procesan en tiempo real para generar el análisis y no se guardan en nuestros servidores. Cumplimos con las normativas de protección de datos aplicables en la región.",
  },
  {
    question: "¿Cómo puedo prepararme mejor para mi negociación?",
    answer:
      "Te recomendamos seguir estos pasos: 1) Completa tu análisis salarial para obtener datos de mercado, 2) Revisa las estrategias personalizadas que te ofrecemos, 3) Practica con nuestro simulador de negociación al menos 3 veces, 4) Prepara tus argumentos basándote en los datos proporcionados. Cuanto más practiques, mayor será tu confianza.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3A0CA3] to-[#4361EE] px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl font-bold md:text-5xl"
          >
            Preguntas frecuentes
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg text-white/80 md:text-xl"
          >
            Encuentra respuestas a las dudas más comunes sobre NegocIA+.
          </motion.p>
        </div>
      </section>

      {/* Search + FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        {/* Search */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar una pregunta..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIndex(null);
            }}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-[#4361EE] focus:outline-none focus:ring-2 focus:ring-[#4361EE]/20"
          />
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.question}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-4 font-heading text-base font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 shrink-0 text-[#FF2E93]" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-gray-400" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={false}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 leading-relaxed text-gray-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {filteredFaqs.length === 0 && (
            <p className="py-8 text-center text-gray-400">
              No se encontraron resultados para tu búsqueda.
            </p>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-2xl font-bold text-gray-900"
          >
            ¿Aún tienes dudas?
          </motion.h2>
          <p className="mt-3 text-gray-600">
            Nuestro equipo está disponible para ayudarte. Escríbenos y te
            responderemos lo antes posible.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:contacto@negocia.plus"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF2E93] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#e0267f]"
            >
              <Mail className="h-5 w-5" />
              Enviar un correo
            </a>
            <a
              href="mailto:contacto@negocia.plus"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            >
              <MessageCircle className="h-5 w-5" />
              Contactar al equipo
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
