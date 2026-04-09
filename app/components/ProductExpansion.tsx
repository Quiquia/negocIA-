"use client";

import {
  ArrowRight,
  Bot,
  Check,
  Sparkles,
  Star,
  Target
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslation } from "@/app/lib/i18n/use-translation";

// const plans = [
// {
//   name: "Free",
//   subtitle: "Explora el mercado",
//   price: "$0",
//   period: "",
//   features: [
//     "Reality Check salarial",
//     "Análisis básico de mercado tecnológico",
//     "1 simulación de negociación por mes",
//     "2 intentos de simulación por voz (demo)",
//   ],
//   cta: "Comenzar gratis",
//   highlighted: false,
// },
// {
//   name: "Pro",
//   subtitle: "Entrena tu negociación",
//   price: "$15",
//   period: "/ mes",
//   features: [
//     "Simulaciones de negociación ilimitadas",
//     "Simulación completa por voz",
//     "Feedback avanzado de IA",
//     "Evaluación de tono, claridad y seguridad",
//     "Análisis salarial completo",
//   ],
//   cta: "Empezar con Pro",
//   highlighted: true,
// },
// {
//   name: "Premium",
//   subtitle: "Acompañamiento experto",
//   price: "$49",
//   period: "/ mes",
//   features: [
//     "Todo lo incluido en Pro",
//     "Coaching personalizado",
//     "Preparación para negociación real",
//     "Mentoría profesional",
//     "Revisión de estrategia salarial",
//   ],
//   cta: "Ir Premium",
//   highlighted: false,
// },
// ];

const testimonials = [
  {
    name: "Carolina M.",
    role: "Frontend Developer Senior",
    company: "Startup fintech, Colombia",
    quote:
      "Gracias al simulador de NegocIA+, practiqué mi negociación antes de la reunión. Logré un aumento del 22% y mejores beneficios. La preparación con datos reales hizo toda la diferencia.",
    increase: "+22%",
  },
  {
    name: "Valentina R.",
    role: "Full Stack Developer",
    company: "Empresa de software, Perú",
    quote:
      "Siempre sentía que ganaba menos que mis compañeros pero no sabía cómo abordarlo. NegocIA+ me dio los datos y la confianza para tener la conversación. Ahora gano lo que merezco.",
    increase: "+18%",
  },
];

export function ProductExpansion() {
  const { t } = useTranslation();
  const [demoStep, setDemoStep] = useState(0);

  const demoSteps = useMemo(
    () => [
      {
        messages: [
          { role: "ai" as const, text: t("expand.demoAi1") },
        ],
        button: t("expand.btnReply"),
      },
      {
        messages: [
          { role: "ai" as const, text: t("expand.demoAi1") },
          { role: "user" as const, text: t("expand.demoUser1") },
        ],
        button: t("expand.btnFeedback"),
      },
      {
        messages: [
          { role: "ai" as const, text: t("expand.demoAi1") },
          { role: "user" as const, text: t("expand.demoUser1") },
        ],
        feedback: {
          positive: t("expand.demoFbPos"),
          warning: t("expand.demoFbWarn"),
          suggestion: t("expand.demoFbSug"),
        },
        button: t("expand.btnRestart"),
      },
    ],
    [t],
  );

  const confidenceCards = useMemo(
    () => [
      { icon: Bot, title: t("expand.card1") },
      { icon: Target, title: t("expand.card2") },
      { icon: Star, title: t("expand.card3") },
    ],
    [t],
  );

  const currentStep = demoSteps[demoStep];

  const handleDemoClick = () => {
    if (demoStep >= demoSteps.length - 1) {
      setDemoStep(0);
    } else {
      setDemoStep(demoStep + 1);
    }
  };

  return (
    <div className="w-full bg-[#080B1A] text-white font-sans">
      {/* Negotiation Simulator Demo */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-[#FF2E93]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-[#4361EE]/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-4 mb-16">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#F1E9FF]"
            >
              <Bot className="w-4 h-4 text-[#FF2E93]" />
              {t("expand.badge")}
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading">
              {t("expand.title")}
            </h2>
            <p className="text-xl text-[#F1E9FF]/70 max-w-2xl mx-auto">
              {t("expand.subtitle")}
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-[#131832]/90 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/40">
              {/* AI Manager header */}
              <div className="flex items-center gap-3 px-6 pt-6 pb-4">
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white/80" />
                </div>
                <div>
                  <p className="font-bold text-base text-white">
                    {t("expand.managerTitle")}
                  </p>
                  <p className="text-xs text-[#F1E9FF]/50 font-medium">
                    {t("expand.simProgress")}
                  </p>
                </div>
              </div>

              {/* Chat messages */}
              <div className="px-6 pb-2 space-y-3 min-h-[120px]">
                {currentStep.messages.map((msg, i) => (
                  <motion.div
                    key={`${demoStep}-${i}`}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.3 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#FF2E93] text-white font-medium"
                          : "bg-white/8 border border-white/10 text-[#F1E9FF]/90"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* AI Feedback card (step 3) */}
                {"feedback" in currentStep && currentStep.feedback && (
                  <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="bg-gradient-to-br from-[#1E1145] to-[#1A1040] border border-[#4361EE]/30 rounded-2xl p-4 space-y-2.5"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-[#FF2E93]" />
                      <span className="font-bold text-sm text-white">
                        {t("expand.feedbackLabel")}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-[#F1E9FF]/80">
                        {currentStep.feedback.positive}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-amber-400 shrink-0 mt-0.5 text-sm">
                        &#9650;
                      </span>
                      <span className="text-sm text-[#F1E9FF]/80">
                        {currentStep.feedback.warning}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-300 shrink-0 mt-0.5 text-sm">
                        &#128161;
                      </span>
                      <span className="text-sm text-[#FF2E93] italic">
                        {currentStep.feedback.suggestion}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Action button */}
              <div className="px-6 pt-3 pb-6">
                <button
                  onClick={handleDemoClick}
                  className="w-full py-3.5 rounded-xl font-bold text-sm transition-all bg-white/10 border border-white/15 text-white hover:bg-white/15 active:scale-[0.98]"
                >
                  {currentStep.button}
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/simulator"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF2E93] to-[#3A0CA3] text-white font-bold rounded-full hover:shadow-lg hover:shadow-[#FF2E93]/25 transition-all text-lg"
              >
                {t("expand.ctaFull")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Confidence Support — light bg */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#F3F0FF] to-white text-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold font-heading text-[#0F172A] mb-4"
          >
            {t("expand.emotionalTitle")}
          </motion.h2>
          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#64748B] max-w-2xl mx-auto mb-14 leading-relaxed"
          >
            {t("expand.emotionalText")}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {confidenceCards.map((card, i) => (
              <motion.div
                key={i}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-[#E2E8F0] rounded-2xl px-6 py-8 flex flex-col items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-[#F1F5F9] flex items-center justify-center">
                  <card.icon className="w-6 h-6 text-[#3a0ca3] " />
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">
                  {card.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans — light bg */}
      {/* <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-white text-foreground">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <motion.h2
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-extrabold font-heading text-[#0F172A] mb-4"
            >
              Planes de NegocIA+
            </motion.h2>
            <motion.p
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#64748B]"
            >
              Elige el nivel de acompañamiento que necesitas.
            </motion.p>
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl p-7 flex flex-col ${
                  plan.highlighted
                    ? "bg-[#1E293B] text-white shadow-xl shadow-[#1E293B]/20 -mt-2 md:-mt-4 pb-9"
                    : "bg-white border border-[#E2E8F0] text-[#0F172A]"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF2E93] rounded-full text-xs font-bold text-white tracking-wide">
                    Recomendado
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-extrabold font-heading leading-tight mb-1">
                    {plan.name} — {plan.subtitle}
                  </h3>
                  <div className="flex items-baseline gap-1.5 mt-3">
                    <span className="text-4xl font-black font-heading">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        className={
                          plan.highlighted
                            ? "text-white/50 text-sm"
                            : "text-[#94A3B8] text-sm"
                        }
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-1 space-y-3.5 mb-8">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          plan.highlighted ? "text-[#FF2E93]" : "text-green-500"
                        }`}
                      />
                      <span
                        className={`text-sm leading-snug ${
                          plan.highlighted ? "text-white/80" : "text-[#475569]"
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/salary-input"
                  className={`w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all block ${
                    plan.highlighted
                      ? "bg-[#FF2E93] text-white hover:bg-[#FF2E93]/90 shadow-lg shadow-[#FF2E93]/25"
                      : "bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0] border border-[#E2E8F0]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div> */}
        {/* </div> */}
      {/* </section> */}

      {/* Success Stories */}
      {/* <section className="w-full py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-4 mb-16">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#F1E9FF]"
            >
              <Star className="w-4 h-4 text-[#FF2E93]" />
              Historias reales
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading">
              Mujeres que ya negociaron con éxito
            </h2>
            <p className="text-xl text-[#F1E9FF]/70 max-w-2xl mx-auto">
              Sus historias pueden ser tu inspiración.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden"
              >
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-16 h-16" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-[#FF2E93] fill-[#FF2E93]"
                      />
                    ))}
                  </div>
                  <p className="text-[#F1E9FF]/80 leading-relaxed mb-6 italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div>
                      <p className="font-bold text-white">{testimonial.name}</p>
                      <p className="text-sm text-[#F1E9FF]/60">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-[#F1E9FF]/40 mt-0.5">
                        {testimonial.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E93] to-[#4361EE]">
                        {testimonial.increase}
                      </p>
                      <p className="text-xs text-[#F1E9FF]/50">de aumento</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/salary-input"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-[#FF2E93] to-[#3A0CA3] text-white font-bold rounded-full hover:shadow-lg hover:shadow-[#FF2E93]/25 transition-all text-lg"
            >
              Comienza tu análisis salarial
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}
