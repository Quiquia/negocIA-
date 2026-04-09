"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Clock, ArrowRight, Tag } from "lucide-react";
import { useTranslation } from "@/app/lib/i18n/use-translation";

type BlogCat = "neg" | "data" | "career" | "tech";

const categoryColors: Record<BlogCat, string> = {
  neg: "bg-[#FF2E93]/10 text-[#FF2E93]",
  data: "bg-[#4361EE]/10 text-[#4361EE]",
  career: "bg-emerald-50 text-emerald-600",
  tech: "bg-[#3A0CA3]/10 text-[#3A0CA3]",
};

export default function BlogPage() {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(4);

  const posts = useMemo(
    () =>
      [
        {
          titleKey: "blog.p1.title",
          excerptKey: "blog.p1.excerpt",
          image:
            "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80",
          category: "neg" as BlogCat,
          author: "Lucía Gil",
          date: "5 Mar 2026",
          readTime: "8 min",
        },
        {
          titleKey: "blog.p2.title",
          excerptKey: "blog.p2.excerpt",
          image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
          category: "data" as BlogCat,
          author: "Carolina Vargas",
          date: "28 Feb 2026",
          readTime: "6 min",
        },
        {
          titleKey: "blog.p3.title",
          excerptKey: "blog.p3.excerpt",
          image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
          category: "career" as BlogCat,
          author: "Alexandra Canchis",
          date: "20 Feb 2026",
          readTime: "5 min",
        },
        {
          titleKey: "blog.p4.title",
          excerptKey: "blog.p4.excerpt",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
          category: "tech" as BlogCat,
          author: "Vanessa Quiquia",
          date: "12 Feb 2026",
          readTime: "7 min",
        },
      ] as const,
    [],
  );

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
            {t("blog.title")}
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg text-white/80 md:text-xl"
          >
            {t("blog.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {posts.slice(0, visibleCount).map((post, i) => (
            <motion.article
              key={post.titleKey}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={t(post.titleKey)}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span
                  className={`absolute left-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[post.category] ?? "bg-gray-100 text-gray-600"}`}
                >
                  <Tag className="h-3 w-3" />
                  {t(`blog.cat.${post.category}`)}
                </span>
              </div>
              <div className="p-6">
                <h2 className="font-heading text-lg font-bold text-gray-900 line-clamp-2">
                  {t(post.titleKey)}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-3">
                  {t(post.excerptKey)}
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
            type="button"
            onClick={() => setVisibleCount((c) => c + 4)}
            className="inline-flex items-center gap-2 rounded-full border border-[#3A0CA3] px-8 py-3 font-semibold text-[#3A0CA3] transition-colors hover:bg-[#3A0CA3] hover:text-white"
          >
            {t("blog.loadMore")}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </main>
  );
}
