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
import { useMemo } from "react";
import { useTranslation } from "@/app/lib/i18n/use-translation";

export default function ProductoPage() {
  const { t } = useTranslation();
  const features = useMemo(
    () => [
      {
        icon: Brain,
        title: t("product.f1.title"),
        subtitle: t("product.f1.subtitle"),
        description: t("product.f1.desc"),
        iconBg: "bg-[#FCE4EC]",
        iconColor: "text-[#FF2E93]",
        badge: t("product.f1.badge"),
      },
      {
        icon: LineChart,
        title: t("product.f2.title"),
        subtitle: t("product.f2.subtitle"),
        description: t("product.f2.desc"),
        iconBg: "bg-[#EDE7F6]",
        iconColor: "text-[#4361EE]",
        badge: null as string | null,
      },
      {
        icon: MessageSquare,
        title: t("product.f3.title"),
        subtitle: t("product.f3.subtitle"),
        description: t("product.f3.desc"),
        iconBg: "bg-[#E8EAF6]",
        iconColor: "text-[#4361EE]",
        badge: null as string | null,
      },
      {
        icon: Heart,
        title: t("product.f4.title"),
        subtitle: t("product.f4.subtitle"),
        description: t("product.f4.desc"),
        iconBg: "bg-[#FCE4EC]",
        iconColor: "text-[#FF2E93]",
        badge: null as string | null,
      },
    ],
    [t],
  );
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
            {t("product.badge")}
          </motion.span>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl font-bold text-foreground md:text-6xl"
          >
            {t("product.hero.title")}{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("product.hero.titleAccent")}
            </span>
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            {t("product.hero.subtitle")}
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
            {t("product.cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            {t("product.cta.subtitle")}
          </p>
          <Link
            href="/salary-input"
            className="mt-8 inline-flex items-center gap-2 rounded-full text-white  bg-[#FF2E93] px-8 py-3.5 font-semibold  transition-transform hover:scale-105"
          >
            {t("product.cta.button")} <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
