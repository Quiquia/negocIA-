"use client";

import { formatEsInteger } from "@/app/lib/format-es";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  MessageSquare,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useSalaryData } from "../providers/SalaryDataProvider";
import {
  analyzeNegotiationPerformance,
  type ConfidenceResult,
} from "./actions";
import { generateNegotiationPDF } from "./generate-pdf";

export default function ConfidenceScorePage() {
  const {
    simulationChat,
    profileData,
    currentSalary,
    averageSalary,
    gapPercentage,
  } = useSalaryData();

  const [result, setResult] = useState<ConfidenceResult | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (simulationChat.length === 0) return;

    startTransition(async () => {
      const currency = profileData?.currency || "USD";
      const symbol =
        currency === "USD" ? "$" : currency === "COP" ? "COL$" : "S/";

      const analysis = await analyzeNegotiationPerformance(simulationChat, {
        role: profileData?.role || "Developer",
        seniority: profileData?.seniority || "Mid",
        techStack: profileData?.techStack?.join(", ") || "General",
        country: profileData?.country || "Latinoamérica",
        currentSalary: `${symbol}${formatEsInteger(currentSalary)}`,
        marketSalary: `${symbol}${formatEsInteger(averageSalary)}`,
        gapPercentage,
      });
      setResult(analysis);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const overallScore = result?.overall_score ?? 0;
  const circumference = 2 * Math.PI * 45; // ~282.74
  const dashArray = `${(overallScore / 100) * circumference} ${circumference}`;

  const scores = result
    ? [
        {
          label: "Confianza al negociar",
          score: result.confidence_score,
          icon: Trophy,
          color: "text-primary",
          bg: "bg-primary/10",
        },
        {
          label: "Claridad al comunicar valor",
          score: result.clarity_score,
          icon: MessageSquare,
          color: "text-secondary",
          bg: "bg-secondary/10",
        },
        {
          label: "Posicionamiento salarial",
          score: result.positioning_score,
          icon: Target,
          color: "text-accent",
          bg: "bg-accent/10",
        },
      ]
    : [];

  // No chat data available
  if (simulationChat.length === 0 && !isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 max-w-4xl mx-auto w-full min-h-[70vh]">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-6" />
          <h1 className="text-3xl font-extrabold font-heading text-slate-900 mb-4">
            No hay datos de simulación
          </h1>
          <p className="text-lg text-slate-500 mb-8">
            Primero necesitas completar una simulación de negociación para
            obtener tu análisis personalizado.
          </p>
          <Link
            href="/simulator"
            className="inline-flex h-14 px-8 rounded-full bg-gradient-to-r from-primary to-accent text-white font-extrabold text-lg items-center justify-center gap-3 shadow-lg hover:scale-105 transition-transform"
          >
            <RotateCcw className="w-5 h-5" />
            Ir al simulador
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-2 sm:px-4 max-w-4xl mx-auto w-full min-h-[70vh]">
      <motion.div
        initial={false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full bg-white border border-border rounded-[2rem] sm:rounded-[3rem] p-4 sm:p-8 md:p-14 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />

        <div className="text-center mb-8 sm:mb-12 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-[#FF5EAB] rounded-2xl sm:rounded-3xl mb-5 sm:mb-8 shadow-[0_0_20px_rgba(255,46,147,0.3)] rotate-3">
            <TrendingUp className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 mb-3 sm:mb-4 tracking-tight">
            Tu nivel de preparación para negociar
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-slate-500 max-w-xl mx-auto font-medium">
            Basado en tu simulación y análisis, este es tu progreso actual para
            conseguir el salario que mereces.
          </p>
        </div>

        {isPending || !result ? (
          /* Skeleton loading */
          <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center justify-center mb-12 relative z-10 animate-pulse">
            <div className="w-56 h-56 rounded-full bg-slate-100" />
            <div className="flex flex-col gap-4 w-full max-w-sm">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[72px] bg-slate-100 rounded-2xl" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-16 items-center justify-center mb-8 sm:mb-12 relative z-10">
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative flex flex-col items-center justify-center w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-white shadow-xl border border-slate-100"
              >
                <svg
                  className="absolute inset-0 w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="8"
                  />
                  <motion.circle
                    initial={false}
                    animate={{ strokeDasharray: dashArray }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#FF2E93" />
                      <stop offset="100%" stopColor="#4361EE" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-4xl sm:text-6xl font-black font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  {overallScore}%
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1 sm:mt-2 text-center leading-tight">
                  Preparada
                </span>
              </motion.div>

              <div className="flex flex-col gap-4 w-full max-w-sm">
                {scores.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-white p-3 sm:p-4 rounded-2xl flex items-center justify-between border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${item.bg} group-hover:scale-110 transition-transform shrink-0`}
                      >
                        <item.icon
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`}
                        />
                      </div>
                      <span className="font-bold text-sm sm:text-base text-slate-700">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-black text-xl sm:text-2xl font-heading text-slate-900 shrink-0 ml-2">
                      {item.score}%
                    </span>
                  </motion.div>
                ))}
                <motion.div
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 bg-amber-50 border border-amber-200 p-5 rounded-3xl flex gap-4 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-amber-200 flex items-center justify-center shrink-0 shadow-sm">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <span className="text-[13px] font-extrabold text-amber-800 uppercase tracking-wider block mb-1">
                      Oportunidad de mejora
                    </span>
                    <p className="text-[15px] font-medium text-amber-900 leading-relaxed">
                      {result.improvements.length > 0 ? (
                        <>
                          {result.improvements[0].replace(/\.$/, "")}{" "}
                          <strong className="font-extrabold bg-amber-200/50 px-1 rounded">
                            {result.improvements.length > 1
                              ? result.improvements[1].toLowerCase()
                              : "claridad al comunicar el valor que aportas al negocio"}
                          </strong>
                          .
                        </>
                      ) : (
                        <>
                          Para alcanzar el rango sugerido, necesitas fortalecer
                          tu{" "}
                          <strong className="font-extrabold bg-amber-200/50 px-1 rounded">
                            claridad al comunicar el valor
                          </strong>{" "}
                          que aportas al negocio.
                        </>
                      )}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* AI Summary */}
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-primary/5 rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 mb-8 sm:mb-12 flex items-start gap-3 sm:gap-4 max-w-2xl mx-auto border border-primary/10 shadow-inner"
            >
              <div className="bg-white p-2 rounded-full shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <p className="text-secondary font-bold text-sm sm:text-lg leading-relaxed">
                {result.summary}
              </p>
            </motion.div>
          </>
        )}

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-6 relative z-10 w-full max-w-3xl mx-auto"
        >
          <div className="w-full flex flex-col sm:flex-row items-stretch justify-center gap-4">
            <div className="flex flex-col w-full sm:w-auto">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-t-3xl border-b-0">
                <span className="font-extrabold text-slate-800 block mb-3 text-[15px]">
                  Tu plan personalizado incluye:
                </span>
                <ul className="flex flex-col gap-2.5 text-[15px] font-medium text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />{" "}
                    <span className="leading-tight">
                      Argumentos clave para negociar
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />{" "}
                    <span className="leading-tight">
                      Datos del mercado tecnológico
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />{" "}
                    <span className="leading-tight">
                      Estrategia táctica personalizada
                    </span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  if (!result) return;
                  const currency = profileData?.currency || "USD";
                  const symbol =
                    currency === "USD"
                      ? "$"
                      : currency === "COP"
                        ? "COL$"
                        : "S/";
                  generateNegotiationPDF({
                    result,
                    profile: {
                      role: profileData?.role || "Developer",
                      seniority: profileData?.seniority || "Mid",
                      techStack:
                        profileData?.techStack?.join(", ") || "General",
                      country: profileData?.country || "Latinoamérica",
                      currentSalary: `${symbol}${formatEsInteger(currentSalary)}`,
                      marketSalary: `${symbol}${formatEsInteger(averageSalary)}`,
                      gapPercentage,
                    },
                  });
                }}
                disabled={!result}
                className="h-14 sm:h-16 px-8 rounded-b-3xl rounded-t-none bg-gradient-to-r from-primary to-accent text-white font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,46,147,0.3)] hover:brightness-110 transition-all w-full relative overflow-hidden group disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Download className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
                <span className="relative z-10">Descargar mi plan</span>
              </button>
            </div>

            <div className="flex flex-col justify-end w-full sm:w-auto mt-4 sm:mt-0">
              <Link
                href="/simulator"
                aria-disabled={!result}
                onClick={(e) => {
                  if (!result) e.preventDefault();
                }}
                className={`h-14 sm:h-16 px-8 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 transition-colors w-full ${!result ? "opacity-50 pointer-events-none" : "hover:bg-slate-50"}`}
              >
                <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
                Volver a practicar
              </Link>
            </div>
          </div>

          {/* <div className="w-full mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-slate-100 flex flex-col items-center">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-800 mb-2">
                ¿Quieres seguir mejorando?
              </h3>
              <p className="text-sm sm:text-base text-slate-500 font-medium">
                Continúa entrenando tus habilidades de negociación con NegocIA+
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
              <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-200 flex flex-col">
                <div className="font-extrabold text-lg sm:text-xl text-slate-800 mb-1">
                  Free — Descubre tu valor
                </div>
                <div className="text-slate-500 text-sm font-medium mb-6">
                  Para empezar con seguridad
                </div>
                <ul className="text-sm text-slate-600 flex flex-col gap-3 mb-6 flex-1">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />{" "}
                    <span className="leading-snug">Reality Check salarial</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />{" "}
                    <span className="leading-snug">
                      Análisis básico de mercado tecnológico
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />{" "}
                    <span className="leading-snug">
                      1 simulación de negociación por mes
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />{" "}
                    <span className="leading-snug">
                      2 intentos de simulación por voz (demo)
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />{" "}
                    <span className="leading-snug">
                      Feedback básico de comunicación
                    </span>
                  </li>
                </ul>
                <div className="text-center font-bold text-slate-400 text-sm py-2">
                  Plan actual
                </div>
              </div>
              <div className="bg-gradient-to-b from-primary/[0.08] to-transparent rounded-3xl p-6 border-2 border-primary/20 relative overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-accent text-white text-[10px] font-black px-3 py-1 rounded-bl-xl tracking-wider uppercase">
                  RECOMENDADO
                </div>
                <div className="font-extrabold text-lg sm:text-xl text-primary mb-1">
                  Pro — Domina la negociación
                </div>
                <div className="text-slate-600 text-sm font-medium mb-6">
                  Para practicar cualquier escenario
                </div>
                <ul className="text-sm text-slate-700 flex flex-col gap-3 mb-6 flex-1">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                    <span className="leading-snug">
                      Simulaciones de negociación ilimitadas
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                    <span className="leading-snug">
                      Simulación completa por voz
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                    <span className="leading-snug">
                      Feedback avanzado de IA
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                    <span className="leading-snug">
                      Evaluación de tono, claridad y seguridad
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                    <span className="leading-snug">
                      Análisis salarial completo
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                    <span className="leading-snug">
                      Escenarios reales adaptados a tu rol
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                    <span className="leading-snug">
                      Plan de crecimiento profesional
                    </span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-white text-primary font-bold rounded-xl border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm mt-auto">
                  Probar Pro
                </button>
              </div>
            </div>
          </div> */}
        </motion.div>
      </motion.div>
    </div>
  );
}
