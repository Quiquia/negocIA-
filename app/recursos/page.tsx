"use client";

import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const categories = ["Todos", "Negociación", "Desarrollo de Carrera", "Confianza"];

const articles = [
  {
    category: "Negociación",
    title: "5 técnicas de negociación salarial respaldadas por la ciencia",
    excerpt:
      "Aprende las estrategias más efectivas para tu próxima negociación, desde el anclaje hasta el encuadre positivo.",
    readTime: "8 min",
    color: "bg-primary/10 text-primary",
  },
  {
    category: "Desarrollo de Carrera",
    title: "Cómo identificar tu valor real en el mercado tech",
    excerpt:
      "Guía paso a paso para evaluar tu compensación total y compararla con estándares de la industria.",
    readTime: "6 min",
    color: "bg-accent/10 text-accent",
  },
  {
    category: "Confianza",
    title: "Superando el síndrome del impostor en negociaciones",
    excerpt:
      "Estrategias prácticas para combatir la inseguridad y presentarte con confianza en conversaciones salariales.",
    readTime: "7 min",
    color: "bg-secondary/10 text-secondary",
  },
  {
    category: "Negociación",
    title: "Errores comunes que debes evitar al negociar tu salario",
    excerpt:
      "Descubre los 7 errores más frecuentes y cómo evitarlos para maximizar tu compensación.",
    readTime: "5 min",
    color: "bg-primary/10 text-primary",
  },
];

export default function RecursosPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredArticles =
    activeCategory === "Todos"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary"
          >
            Centro de Recursos
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl font-bold text-foreground md:text-6xl"
          >
            Recursos para{" "}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              tu crecimiento
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Artículos, guías y herramientas para ayudarte a negociar mejor y
            avanzar en tu carrera profesional.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-secondary text-white"
                  : "bg-white/80 text-muted-foreground hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer rounded-[2rem] border border-white/50 bg-white/80 p-8 backdrop-blur-sm transition-shadow hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${article.color}`}
                >
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
                <BookOpen className="h-4 w-4" />
                Leer artículo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Dark CTA */}
      <section className="px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-[2rem] bg-foreground p-10 text-center text-white md:p-16"
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            ¿Quieres recibir recursos exclusivos?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Suscríbete a nuestro newsletter y recibe guías, plantillas y
            consejos directamente en tu inbox.
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 rounded-full bg-white/10 px-6 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="rounded-full bg-primary px-6 py-3 font-semibold text-white transition-transform hover:scale-105">
              Suscribirme
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
