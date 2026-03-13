"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { Clock, ArrowRight, Tag } from "lucide-react";

const posts = [
  {
    title: "Cómo negociar tu salario en tech: guía completa para mujeres",
    excerpt:
      "Aprende las estrategias más efectivas para preparar y ejecutar una negociación salarial exitosa en el sector tecnológico.",
    image:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80",
    category: "Negociación",
    author: "Lucía Gil",
    date: "5 Mar 2026",
    readTime: "8 min",
  },
  {
    title: "Brecha salarial en Latinoamérica: datos actualizados 2026",
    excerpt:
      "Analizamos los últimos datos sobre la brecha salarial de género en el sector tecnológico de la región.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    category: "Datos",
    author: "Carolina Vargas",
    date: "28 Feb 2026",
    readTime: "6 min",
  },
  {
    title: "5 señales de que estás siendo subvalorada en tu trabajo",
    excerpt:
      "Identifica las señales clave que indican que tu compensación no refleja tu verdadero valor en el mercado.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    category: "Carrera",
    author: "Alexandra Canchis",
    date: "20 Feb 2026",
    readTime: "5 min",
  },
  {
    title: "Inteligencia artificial al servicio de la equidad salarial",
    excerpt:
      "Descubre cómo la IA está transformando la forma en que las profesionales acceden a datos salariales y negocian.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    category: "Tecnología",
    author: "Vanessa Quiquia",
    date: "12 Feb 2026",
    readTime: "7 min",
  },
];

const categoryColors: Record<string, string> = {
  Negociación: "bg-[#FF2E93]/10 text-[#FF2E93]",
  Datos: "bg-[#4361EE]/10 text-[#4361EE]",
  Carrera: "bg-emerald-50 text-emerald-600",
  Tecnología: "bg-[#3A0CA3]/10 text-[#3A0CA3]",
};

export default function BlogPage() {
  const [visibleCount, setVisibleCount] = useState(4);

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
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg text-white/80 md:text-xl"
          >
            Recursos, datos y consejos para cerrar la brecha salarial en tech.
          </motion.p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {posts.slice(0, visibleCount).map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span
                  className={`absolute left-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[post.category] ?? "bg-gray-100 text-gray-600"}`}
                >
                  <Tag className="h-3 w-3" />
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <h2 className="font-heading text-lg font-bold text-gray-900 line-clamp-2">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                  <span>
                    {post.author} &middot; {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setVisibleCount((c) => c + 4)}
            className="inline-flex items-center gap-2 rounded-full border border-[#3A0CA3] px-8 py-3 font-semibold text-[#3A0CA3] transition-colors hover:bg-[#3A0CA3] hover:text-white"
          >
            Cargar más artículos
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </main>
  );
}
