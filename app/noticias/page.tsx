"use client";

import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const news = [
  {
    image:
      "https://images.unsplash.com/photo-1573164574511-73c773193279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    date: "10 Mar 2026",
    tag: "Brecha Salarial",
    tagColor: "bg-primary/10 text-primary",
    country: "Latinoamérica",
    title: "La brecha salarial de género en tech se reduce un 3% en 2025",
    excerpt:
      "Un nuevo estudio revela avances significativos en la equidad salarial dentro del sector tecnológico en la región.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    date: "5 Mar 2026",
    tag: "Negociación",
    tagColor: "bg-accent/10 text-accent",
    country: "Colombia",
    title: "Empresas colombianas adoptan políticas de transparencia salarial",
    excerpt:
      "Las principales compañías tech del país implementan bandas salariales públicas para reducir la desigualdad.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573495612937-f01934eeaaa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    date: "28 Feb 2026",
    tag: "IA & Empleo",
    tagColor: "bg-secondary/10 text-secondary",
    country: "México",
    title: "El impacto de la IA en los salarios del sector tecnológico",
    excerpt:
      "Cómo la inteligencia artificial está transformando las expectativas salariales y creando nuevas oportunidades.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573164574001-518958d9baa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    date: "20 Feb 2026",
    tag: "Tendencias",
    tagColor: "bg-green-100 text-green-700",
    country: "Perú",
    title: "Mujeres en tech: las habilidades más demandadas en 2026",
    excerpt:
      "Cloud computing, ciberseguridad y machine learning lideran las competencias con mayor impacto salarial.",
  },
];

export default function NoticiasPage() {
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
            Últimas Noticias
          </motion.span>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl font-bold text-foreground md:text-6xl"
          >
            Noticias sobre{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              equidad salarial
            </span>
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Mantente informada sobre las últimas tendencias, estudios y avances
            en equidad salarial y género en la industria tech.
          </motion.p>
        </div>
      </section>

      {/* News Grid */}
      <section className="px-4 pb-24">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {news.map((item, index) => (
            <motion.article
              key={item.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer overflow-hidden rounded-[2rem] border border-white/50 bg-white/80 backdrop-blur-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                  <MapPin className="h-3.5 w-3.5" />
                  {item.country}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.date}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {item.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
                  Leer más
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
