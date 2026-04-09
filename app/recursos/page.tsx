"use client";

import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { useTranslation } from "@/app/lib/i18n/use-translation";

type ResCat = "all" | "neg" | "career" | "conf";

const CAT_ORDER: ResCat[] = ["all", "neg", "career", "conf"];

export default function RecursosPage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<ResCat>("all");

  const articles = useMemo(
    () => [
      {
        category: "neg" as const,
        titleKey: "recursos.a1.title",
        excerptKey: "recursos.a1.excerpt",
        readTime: "8 min",
        color: "bg-primary/10 text-primary",
      },
      {
        category: "career" as const,
        titleKey: "recursos.a2.title",
        excerptKey: "recursos.a2.excerpt",
        readTime: "6 min",
        color: "bg-accent/10 text-accent",
      },
      {
        category: "conf" as const,
        titleKey: "recursos.a3.title",
        excerptKey: "recursos.a3.excerpt",
        readTime: "7 min",
        color: "bg-secondary/10 text-secondary",
      },
      {
        category: "neg" as const,
        titleKey: "recursos.a4.title",
        excerptKey: "recursos.a4.excerpt",
        readTime: "5 min",
        color: "bg-primary/10 text-primary",
      },
    ],
    [],
  );

  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <motion.span
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary"
          >
            {t("recursos.badge")}
          </motion.span>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl font-bold text-foreground md:text-6xl"
          >
            {t("recursos.title")}{" "}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              {t("recursos.titleAccent")}
            </span>
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            {t("recursos.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-3">
          {CAT_ORDER.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-secondary text-white"
                  : "bg-white/80 text-muted-foreground hover:bg-white"
              }`}
            >
              {t(`recursos.cat.${cat}`)}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.titleKey}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer rounded-[2rem] border border-white/50 bg-white/80 p-8 backdrop-blur-sm transition-shadow hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${article.color}`}
                >
                  {t(`recursos.cat.${article.category}`)}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {t(article.titleKey)}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {t(article.excerptKey)}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
                <BookOpen className="h-4 w-4" />
                {t("recursos.read")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Dark CTA */}
      <section className="px-4 pb-24">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-[2rem] bg-foreground p-10 text-center text-white md:p-16"
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            {t("recursos.cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            {t("recursos.cta.lead")}
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder={t("recursos.cta.placeholder")}
              className="flex-1 rounded-full bg-white/10 px-6 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              className="rounded-full bg-primary px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
            >
              {t("recursos.cta.btn")}
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
