"use client";

import type { Locale } from "@/app/providers/LanguageProvider";
import {
  getNegotiationUpliftRange,
  type SalaryEstimate,
} from "@/core/lib/salary-estimator";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  Briefcase,
  Calculator,
  CheckCircle2,
  Lightbulb,
  Loader2,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { getCurrencyDisplayForCountryAndCode } from "../data/latam-countries";
import { useSalaryData } from "../providers/SalaryDataProvider";
import { useTranslation } from "@/app/lib/i18n/use-translation";
import { analyzeProfile } from "./actions";

const SERVER_REALITY_ERR: Record<string, string> = {
  "No se proporcionó un ID de perfil.": "reality.err.noSubmissionId",
  "No se encontró el perfil.": "reality.err.profileNotFound",
  "Error al analizar el perfil.": "reality.err.analysisFailed",
  "No se encontró JSON válido en la respuesta de la IA":
    "reality.err.invalidAiJson",
};

function translateRealityServerError(
  msg: string,
  t: (key: string, vars?: Record<string, string | number>) => string,
): string {
  const key = SERVER_REALITY_ERR[msg];
  return key ? t(key) : msg;
}

function formatLocaleInteger(n: number, locale: Locale): string {
  return n.toLocaleString(locale === "en" ? "en-US" : "es-ES", {
    maximumFractionDigits: 0,
  });
}

const LAST_RAISE_NEGOTIATION_HINT = new Set([
  "Más de 2 años",
  "Nunca he recibido un aumento",
  "More than 2 years ago",
  "I have never received a raise",
]);

export default function RealityCheckPage() {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const {
    submissionId,
    profileData,
    currentSalary,
    setCurrentSalary,
    setAverageSalary,
    setGapPercentage,
  } = useSalaryData();

  const [isPending, startTransition] = useTransition();
  const [estimate, setEstimate] = useState<SalaryEstimate | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  /** Moneda guardada en Supabase (fuente de verdad si el contexto se pierde al refrescar). */
  const [salaryCurrencyFromDb, setSalaryCurrencyFromDb] = useState<string | null>(
    null
  );
  const [countryFromDb, setCountryFromDb] = useState<string | null>(null);

  // Prioridad: BD del submission > contexto del formulario > moneda del JSON de la IA
  const currencyCode =
    salaryCurrencyFromDb ??
    profileData?.currency ??
    estimate?.currency ??
    "USD";

  const countryResolved =
    countryFromDb ?? profileData?.country ?? undefined;

  const { symbol: currencySymbol, label: currencyLabel } =
    getCurrencyDisplayForCountryAndCode(countryResolved, currencyCode);

  const role = profileData?.role || "Frontend Developer";
  const seniority = profileData?.seniority || "Mid";
  const city = profileData?.city || "Lima";
  const country =
    countryResolved ||
    profileData?.country ||
    (locale === "en" ? "Peru" : "Perú");
  const techStack = profileData?.techStack?.join(" / ") || "React / TypeScript";

  // Only show real data from AI — no fake multipliers
  const hasAiData = estimate !== null;
  const averageSalary = estimate?.estimated_salary ?? 0;
  const upperSalary = Math.round(averageSalary * 1.15);
  const lowerSalary = Math.round(averageSalary * 0.85);
  const gapPercentage = estimate
    ? Math.round(Math.abs(estimate.gap_percentage))
    : 0;
  const gapDirection = estimate?.gap_direction ?? "below";

  const isBelowMarket = gapDirection === "below";
  const isAtMarket = gapDirection === "at_market";

  const needsNegotiationHelp =
    !!profileData?.lastIncrease &&
    LAST_RAISE_NEGOTIATION_HINT.has(profileData.lastIncrease);

  const rangeSpan = upperSalary - lowerSalary;
  const positionInRange = currentSalary - lowerSalary;
  const rawPercentage = (positionInRange / rangeSpan) * 100;
  const clampedPercentage = Math.max(5, Math.min(95, rawPercentage));
  const markerPosition = `${clampedPercentage}%`;

  // Fetch AI analysis on mount
  useEffect(() => {
    if (!submissionId) {
      setAiError(t("reality.errorNoId"));
      return;
    }
    startTransition(async () => {
      const result = await analyzeProfile(submissionId);
      if (result.success) {
        setEstimate(result.estimate);
        if (result.submission.salary_currency) {
          setSalaryCurrencyFromDb(result.submission.salary_currency);
        }
        if (result.submission.country) {
          setCountryFromDb(result.submission.country);
        }
        // Update context so downstream pages have AI data
        if (result.submission.monthly_salary_amount) {
          setCurrentSalary(result.submission.monthly_salary_amount);
        }
        setAverageSalary(result.estimate.estimated_salary);
        setGapPercentage(Math.round(Math.abs(result.estimate.gap_percentage)));
      } else {
        setAiError(result.error);
      }
    });
  }, [submissionId, t]);

  const fallbackInsights = useMemo(
    () => [
      t("reality.fallback.i0"),
      t("reality.fallback.i1", { techStack }),
      seniority === "Junior" || seniority === "Trainee"
        ? t("reality.fallback.i2junior")
        : t("reality.fallback.i2senior"),
    ],
    [t, techStack, seniority],
  );
  const fallbackSkills = useMemo(
    () => [
      t("reality.fallback.skill0"),
      t("reality.fallback.skill1"),
      t("reality.fallback.skill2"),
      t("reality.fallback.skill3"),
    ],
    [t],
  );

  const sourceChips = useMemo(
    () =>
      [
        {
          nameKey: "reality.source.stackoverflow" as const,
          color: "bg-orange-50 text-orange-700 border-orange-200",
        },
        {
          nameKey: "reality.source.glassdoor" as const,
          color: "bg-green-50 text-green-700 border-green-200",
        },
        {
          nameKey: "reality.source.github" as const,
          color: "bg-slate-100 text-slate-700 border-slate-300",
        },
        {
          nameKey: "reality.source.latam" as const,
          color: "bg-blue-50 text-blue-700 border-blue-200",
        },
        {
          nameKey: "reality.source.negocia" as const,
          color: "bg-primary/10 text-primary border-primary/20",
        },
      ] as const,
    [],
  );
  const fallbackTargetRole =
    seniority === "Junior"
      ? "Mid"
      : seniority === "Mid"
        ? "Senior"
        : "Lead / Staff";

  const insights = estimate?.profile_insights ?? fallbackInsights;
  const growthSkills = estimate?.growth_skills ?? fallbackSkills;
  const targetRole = estimate?.growth_target_role ?? fallbackTargetRole;

  const negotiationRange = estimate
    ? getNegotiationUpliftRange(estimate)
    : { min: 18, max: 35 };

  const roleLead = role.split(" ")[0] || role;

  const insightIcons = [
    <Lightbulb key="lb" className="w-6 h-6 text-yellow-500 mb-4" />,
    <Zap key="zp" className="w-6 h-6 text-secondary mb-4" />,
    <TrendingUp key="tu" className="w-6 h-6 text-emerald-500 mb-4" />,
  ];

  return (
    <div className="flex flex-col items-center min-h-[80vh] py-8 sm:py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full">
      {/* SCREEN HEADER */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 sm:mb-10 w-full"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary to-accent text-white mb-5 sm:mb-6 shadow-lg rotate-3">
          <BarChart3 className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-3 sm:mb-4 text-foreground">
          {t("reality.title")}
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium mb-6 sm:mb-8">
          {t("reality.subtitle")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2">
            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {role}
          </span>
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {seniority}
          </span>
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {city}, {country}
          </span>
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2">
            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{" "}
            {techStack.split(" / ")[0] || "React"}
          </span>
        </div>
      </motion.div>

      {/* AI LOADING INDICATOR */}
      {isPending && (
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          className="w-full bg-accent/5 border border-accent/20 p-6 rounded-2xl mb-8 flex items-center justify-center gap-3"
        >
          <Loader2 className="w-5 h-5 animate-spin text-accent" />
          <p className="text-accent font-semibold">{t("reality.loadingAi")}</p>
        </motion.div>
      )}

      {/* AI ERROR */}
      {aiError && (
        <div className="w-full bg-rose-50 border border-rose-200 p-4 rounded-2xl mb-8 text-rose-700 text-sm font-medium">
          {t("reality.errBanner", {
            error: translateRealityServerError(aiError, t),
          })}
        </div>
      )}

      {/* SECTION 1 — TU SALARIO VS EL MERCADO */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full bg-white border border-border p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-[2.5rem] shadow-xl shadow-primary/5 mb-6 sm:mb-8 relative overflow-visible"
      >
        <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-primary via-accent to-secondary rounded-t-[2.5rem]" />

        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold font-heading text-foreground">
            {t("reality.sectionMarketTitle")}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-medium">
            {t("reality.amountsIn", {
              currencyLabel,
              region: countryResolved ? ` · ${countryResolved}` : "",
            })}
          </p>
        </div>

        {!hasAiData && isPending ? (
          /* Skeleton while AI is loading */
          <div className="space-y-6 py-8">
            <div className="flex justify-between px-4 md:px-8">
              <div className="h-4 w-24 bg-muted/50 rounded animate-pulse" />
              <div className="h-4 w-20 bg-muted/50 rounded animate-pulse" />
              <div className="h-4 w-24 bg-muted/50 rounded animate-pulse" />
            </div>
            <div className="h-6 bg-muted/30 rounded-full animate-pulse" />
            <div className="flex justify-between px-4 md:px-8">
              <div className="h-6 w-16 bg-muted/40 rounded animate-pulse" />
              <div className="h-6 w-16 bg-muted/40 rounded animate-pulse" />
              <div className="h-6 w-16 bg-muted/40 rounded animate-pulse" />
            </div>
            <div className="flex justify-center pt-4">
              <div className="h-12 w-80 bg-muted/30 rounded-2xl animate-pulse" />
            </div>
          </div>
        ) : hasAiData ? (
          <>
            <div className="relative pt-10 sm:pt-12 pb-20 sm:pb-16 px-2 sm:px-8 md:px-12 max-w-4xl mx-auto">
              {/* Labels: Menor / Promedio / Mayor */}
              <div className="flex justify-between text-[11px] sm:text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 sm:mb-5 px-0 sm:px-0">
                <span>{t("reality.barLower")}</span>
                <span>{t("reality.barAverage")}</span>
                <span>{t("reality.barHigher")}</span>
              </div>

              {/* Salary bar */}
              <div className="relative h-7 sm:h-6 bg-muted/20 rounded-full w-full overflow-visible shadow-inner">
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-20" />
                <div className="absolute top-0 bottom-0 left-[20%] right-[20%] bg-gradient-to-r from-primary to-accent rounded-full opacity-60" />

                {/* Center marker */}
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-10 bg-secondary rounded-full z-10" />

                {/* User salary marker + tooltip */}
                <motion.div
                  initial={false}
                  animate={{ left: markerPosition }}
                  transition={{
                    duration: 1.5,
                    type: "spring",
                    bounce: 0.2,
                    delay: 0.3,
                  }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-20"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-foreground border-4 border-white shadow-lg flex items-center justify-center relative">
                    <div className="absolute -inset-2 bg-foreground/20 rounded-full animate-ping" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full" />
                  </div>

                  {/* Tooltip below the dot */}
                  <div className="absolute top-full mt-3 sm:mt-4 bg-foreground text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl whitespace-nowrap">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-foreground" />
                    <p className="text-[9px] sm:text-xs text-white/70 font-bold uppercase tracking-wider mb-0.5 sm:mb-1 text-center">
                      {t("reality.tooltipCurrentSalary")}
                    </p>
                    <p className="text-base sm:text-2xl font-black font-heading text-center">
                      {currencySymbol}
                      {formatLocaleInteger(currentSalary, locale)}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Salary values below bar */}
              <div className="flex justify-between text-[10px] sm:text-lg font-black text-foreground mt-3 sm:mt-4 px-0">
                <span className="text-muted-foreground">
                  {currencySymbol}
                  {formatLocaleInteger(lowerSalary, locale)}
                </span>
                <span className="text-secondary">
                  {currencySymbol}
                  {formatLocaleInteger(averageSalary, locale)}
                </span>
                <span className="text-muted-foreground">
                  {currencySymbol}
                  {formatLocaleInteger(upperSalary, locale)}
                </span>
              </div>
            </div>

            <div className="mt-6 sm:mt-10 text-center flex flex-col items-center gap-4">
              {isBelowMarket ? (
                <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                  <div className="w-full flex flex-col items-center gap-3 bg-rose-50 text-rose-700 px-5 py-5 sm:px-6 sm:py-5 rounded-2xl border border-rose-200 shadow-sm">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base font-semibold text-left leading-relaxed">
                        {t("reality.gapBelowIntro")}{" "}
                        <strong className="font-black">
                          {t("reality.gapBelowStrong", {
                            gapPercent: gapPercentage,
                          })}
                        </strong>{" "}
                        {t("reality.gapBelowOutro")}
                      </p>
                    </div>
                    <div className="flex flex-col items-center pt-2 border-t border-rose-200/60 w-full text-rose-800">
                      <span className="text-xs sm:text-sm font-medium mb-2">
                        {t("reality.gapBelowLead")}
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-rose-600 bg-white px-5 py-2 rounded-xl border border-rose-100 shadow-sm">
                        {t("reality.gapBelowAmount", {
                          amount: `${currencySymbol}${formatLocaleInteger(
                            averageSalary - currentSalary,
                            locale,
                          )}`,
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground max-w-md text-center leading-relaxed px-2">
                    {t("reality.gapBelowFoot")}
                  </p>
                </div>
              ) : isAtMarket ? (
                <div className="inline-flex items-center gap-2 sm:gap-3 bg-emerald-50 text-emerald-700 px-3 py-3 sm:px-6 sm:py-4 rounded-2xl border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  <p className="text-sm sm:text-lg font-semibold text-left">
                    {t("reality.gapAtMarketIntro")}{" "}
                    <strong className="font-black">
                      {t("reality.gapAtMarketStrong")}
                    </strong>{" "}
                    {t("reality.gapAtMarketOutro")}
                  </p>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 sm:gap-3 bg-purple-50 text-purple-700 px-3 py-3 sm:px-6 sm:py-4 rounded-2xl border border-purple-200">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  <p className="text-sm sm:text-lg font-semibold text-left">
                    {t("reality.gapAboveIntro")}{" "}
                    <strong className="font-black">
                      {t("reality.gapAboveStrong", {
                        gapPercent: gapPercentage,
                      })}
                    </strong>{" "}
                    {t("reality.gapAboveOutro")}
                  </p>
                </div>
              )}

              {/* Analysis Confidence Signal */}
              <div className="mt-6 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {t("reality.confidenceLabel")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-medium max-w-sm">
                  {t("reality.confidenceHint")}
                </p>
              </div>
            </div>
          </>
        ) : null}
      </motion.div>

      {/* PERSONALIZED INSIGHT */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="w-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 p-6 md:p-8 rounded-[2rem] shadow-sm mb-8 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6"
      >
        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-amber-100 flex items-center justify-center shrink-0">
          <Lightbulb className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-amber-900 mb-2 text-center md:text-left">
            {t("reality.insightTitle")}
          </h3>
          <p className="text-amber-800 font-medium leading-relaxed text-center md:text-left">
            {t("reality.insightBody", {
              roleLead,
              stack: techStack.split(" / ")[0] || "React",
              seniority,
              min: negotiationRange.min,
              max: negotiationRange.max,
            })}
          </p>
        </div>
      </motion.div>

      {/* SECTION 2 — FUENTE */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full bg-muted/20 border border-border p-6 md:p-8 rounded-[2rem] mb-8"
      >
        <h3 className="text-xl font-bold font-heading text-foreground mb-6 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-primary" />{" "}
          {t("reality.sourcesTitle")}
        </h3>
        <p className="text-muted-foreground font-medium mb-8">
          {estimate
            ? estimate.summary
            : t("reality.sourcesFallback", { country, city })}
        </p>
        <div className="flex flex-wrap gap-4">
          {sourceChips.map((source, idx) => (
            <div
              key={idx}
              className={`px-4 py-2 rounded-xl border text-sm font-bold flex items-center gap-2 ${source.color}`}
            >
              <CheckCircle2 className="w-4 h-4 opacity-50" />
              {t(source.nameKey)}
            </div>
          ))}
        </div>
      </motion.div>

      {/* SECTION 3 — INSIGHT DE IA */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full mb-8"
      >
        <h3 className="text-2xl font-bold font-heading text-foreground mb-6 flex items-center gap-3">
          <Bot className="w-6 h-6 text-primary" />{" "}
          {t("reality.aiDetectedTitle")}
        </h3>
        {isPending && !hasAiData ? (
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-border p-6 rounded-2xl shadow-sm"
              >
                <div className="w-6 h-6 bg-muted/40 rounded mb-4 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted/40 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-muted/30 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {insights.map((insight, idx) => (
              <div
                key={idx}
                className="bg-white border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                {insightIcons[idx]}
                <p className="text-sm font-medium text-foreground leading-relaxed">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* SECTION 4 — CRECIMIENTO PROFESIONAL */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 p-8 rounded-[2rem] mb-8"
      >
        <h3 className="text-xl font-bold font-heading text-foreground mb-6">
          {t("reality.growthTitle")}
        </h3>
        {isPending && !hasAiData ? (
          <div className="space-y-4">
            <div className="h-5 w-64 bg-muted/40 rounded animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 align-center">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-14 bg-white/60 rounded-xl animate-pulse border border-border/50"
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground font-medium mb-6">
              {t("reality.growthLead", { targetRole })}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {growthSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 text-center shadow-sm border border-border/50"
                >
                  <span className="font-bold text-sm text-primary">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* SECTION 5 — ALERTA DE NEGOCIACIÓN */}
      {needsNegotiationHelp && (
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full bg-rose-50 border border-rose-200 p-8 rounded-[2rem] mb-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-6 h-6 text-rose-600" />
              <h3 className="text-xl font-bold text-rose-900">
                {t("reality.negotiationAlertTitle")}
              </h3>
            </div>
            <p className="text-rose-700 font-medium text-lg">
              {t("reality.negotiationAlertBody")}
            </p>
          </div>
          <button
            onClick={() => router.push("/simulator")}
            className="shrink-0 h-12 px-6 rounded-full bg-primary text-white font-bold hover:opacity-90 transition-colors shadow-lg shadow-primary/30"
          >
            {t("reality.negotiationCta")}
          </button>
        </motion.div>
      )}

      {/* SECTION 6 — OPCIONES DE ACCIÓN */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full"
      >
        <h3 className="text-2xl font-bold font-heading text-foreground mb-6 text-center md:text-left">
          {t("reality.nextTitle")}
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Priority Action */}
          <div className="relative bg-white border-2 border-primary/50 rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(255,46,147,0.15)] flex flex-col hover:shadow-[0_8px_40px_rgba(255,46,147,0.25)] hover:border-primary/70 transition-all group overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary to-accent" />
            <div className="flex justify-between items-start mb-6 mt-2">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <MessageSquare className="w-7 h-7" />
              </div>
              <div className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {t("reality.card1Badge")}
              </div>
            </div>
            <div className="flex flex-col mb-6 mt-2">
              <h4 className="text-xl font-bold font-heading mb-3">
                {t("reality.card1Title")}
              </h4>
              <p className="text-sm font-medium text-primary">
                {t("reality.card1Highlight")}
              </p>
            </div>
            <p className="text-muted-foreground mb-4 flex-1">
              {t("reality.card1Body")}
            </p>
            <div className="mt-8">
              <button
                onClick={() => router.push("/simulator")}
                className="w-full h-14 rounded-full bg-gradient-to-r from-primary to-accent text-white font-extrabold text-lg shadow-lg shadow-primary/25 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                {t("reality.card1Btn")}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-border rounded-[2rem] p-8 shadow-sm flex flex-col hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold font-heading mb-3">
              {t("reality.card2Title")}
            </h4>
            <p className="text-muted-foreground mb-8 flex-1">
              {t("reality.card2Body")}
            </p>
            <span className="w-full h-12 rounded-full bg-muted/20 text-muted-foreground font-bold flex items-center justify-center cursor-default opacity-50">
              {t("reality.card2Soon")}
            </span>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-border rounded-[2rem] p-8 shadow-sm flex flex-col hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Calculator className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold font-heading mb-3">
              {t("reality.card3Title")}
            </h4>
            <p className="text-muted-foreground mb-8 flex-1">
              {t("reality.card3Body")}
            </p>
            <span className="w-full h-12 rounded-full bg-muted/20 text-muted-foreground font-bold flex items-center justify-center cursor-default opacity-50">
              {t("reality.card3Soon")}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
