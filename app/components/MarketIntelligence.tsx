"use client";

import {
  AlertCircle,
  Briefcase,
  LineChart as ChartIcon,
  Code2,
  Database,
  Globe2,
  RefreshCw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatEsInteger } from "@/app/lib/format-es";
import { useTranslation } from "@/app/lib/i18n/use-translation";
import {
  fetchMarketIntelligenceSnapshot,
  type MarketIntelligenceSnapshot,
} from "./market-intelligence-actions";
import { MARKET_REFERENCE_SOURCES } from "./market-intelligence-sources";

function pickTechIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("type") || n.includes("sql")) return Database;
  if (
    n.includes("next") ||
    n.includes("node") ||
    n.includes("vue") ||
    n.includes("angular") ||
    n.includes("react")
  )
    return Code2;
  return Globe2;
}

function AnimatedCounter({
  end,
  duration = 2,
}: {
  end: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <>{count}</>;
}

export function MarketIntelligence() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"latam" | "global">("latam");
  const [snapshot, setSnapshot] = useState<MarketIntelligenceSnapshot | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const data = await fetchMarketIntelligenceSnapshot();
      if (!cancelled) {
        setSnapshot(data);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const data = snapshot;

  const barRows = useMemo(() => {
    if (!data) return [];
    return activeTab === "latam" ? data.bar_latam : data.bar_global;
  }, [data, activeTab]);

  const techRanking = useMemo(() => {
    if (!data?.tech_stack_ranking?.length) return [];
    return data.tech_stack_ranking.map((tech) => ({
      ...tech,
      icon: pickTechIcon(tech.name),
    }));
  }, [data]);

  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-[#080B1A] relative z-20 overflow-hidden text-white font-sans">
      <div className="absolute top-40 left-0 w-96 h-96 bg-[#FF2E93]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-[#4361EE]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-24">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#F1E9FF]"
          >
            <span
              className={`w-2 h-2 rounded-full bg-[#FF2E93] ${isLive ? "animate-pulse" : ""}`}
            />
            {loading
              ? t("market.badgeLoading")
              : t("market.badgeLive")}
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-white">
            {t("market.mainTitle")}
          </h2>

          <div className="relative p-10 md:p-16 w-full max-w-4xl mx-auto bg-gradient-to-br from-[#3A0CA3]/20 to-[#FF2E93]/10 border border-white/10 rounded-[3rem] backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <AlertCircle className="w-64 h-64" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-left flex-1">
                <p className="text-lg md:text-xl text-[#F1E9FF]/80 font-medium mb-2">
                  {t("market.gapLead")}
                </p>
                <p className="text-[#F1E9FF]/60 text-sm">
                  {t("market.gapSub")}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center min-h-[5rem] min-w-[8rem]">
                {loading || !data ? (
                  <div className="h-16 w-28 rounded-xl bg-white/10 animate-pulse" />
                ) : (
                  <div className="text-7xl md:text-8xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E93] to-[#4361EE] drop-shadow-lg">
                    <AnimatedCounter
                      key={data.pay_gap_women_percent}
                      end={data.pay_gap_women_percent}
                    />
                    %
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-xl md:text-2xl font-medium text-white text-center">
                {loading || !data ? (
                  <span className="inline-block h-8 w-full max-w-2xl mx-auto rounded-lg bg-white/10 animate-pulse" />
                ) : (
                  <>
                    <span className="text-[#FF2E93] font-bold">
                      &quot;{data.pay_gap_quote}&quot;
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-white">
              {t("market.sectionTitle")}
            </h2>
            <p className="text-xl text-[#F1E9FF]/70">
              {t("market.sectionLead")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-bold font-heading flex items-center gap-3">
                    <ChartIcon className="w-6 h-6 text-[#4361EE]" />
                    {loading || !data ? (
                      <span className="inline-block h-8 w-64 rounded-lg bg-white/10 animate-pulse" />
                    ) : (
                      `${data.role_title} — ${t("market.analysisSuffix")}`
                    )}
                  </h3>
                  <p className="text-[#F1E9FF]/60 mt-1">
                    {t("market.comparisonLabel")}
                  </p>
                </div>
                <div className="flex items-center  justify-center gap-2 bg-[#3A0CA3]/30 p-1.5 rounded-lg border border-[#4361EE]/30">
                  <button
                    type="button"
                    onClick={() => setActiveTab("latam")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors w-[50%] ${
                      activeTab === "latam"
                        ? "bg-[#4361EE] text-white shadow-lg"
                        : "text-[#F1E9FF]/60 hover:text-white"
                    }`}
                  >
                    LATAM
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("global")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors w-[50%] ${
                      activeTab === "global"
                        ? "bg-[#4361EE] text-white shadow-lg"
                        : "text-[#F1E9FF]/60 hover:text-white"
                    }`}
                  >
                    Global
                  </button>
                </div>
              </div>
              <div className="w-full min-h-[300px]">
                {loading || !data ? (
                  <div className="h-[300px] rounded-2xl bg-white/5 animate-pulse" />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      id="market-salary-bar"
                      data={barRows}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      accessibilityLayer={false}
                    >
                      <CartesianGrid
                        key="grid"
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.05)"
                        vertical={false}
                      />
                      <XAxis
                        key="xaxis"
                        dataKey="level"
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: "rgba(255,255,255,0.7)" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        key="yaxis"
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: "rgba(255,255,255,0.7)" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip
                        key="tooltip"
                        cursor={{ fill: "rgba(255,255,255,0.02)" }}
                        contentStyle={{
                          backgroundColor: "#0F172A",
                          borderColor: "rgba(255,255,255,0.1)",
                          borderRadius: "12px",
                          color: "#fff",
                        }}
                        itemStyle={{ color: "#fff", fontWeight: "bold" }}
                      />
                      <Bar
                        key="bar-v1"
                        dataKey="v1"
                        name={data.bar_series_label_1}
                        fill="#4361EE"
                        radius={[4, 4, 0, 0]}
                        animationDuration={2000}
                      />
                      <Bar
                        key="bar-v2"
                        dataKey="v2"
                        name={data.bar_series_label_2}
                        fill="#FF2E93"
                        radius={[4, 4, 0, 0]}
                        animationDuration={2000}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-[#FF2E93]" />
                  {t("market.trendTitle")}
                </h3>
                <p className="text-[#F1E9FF]/60 text-sm mt-1">
                  {t("market.trendSub")}
                </p>
              </div>
              <div className="flex-1 w-full relative min-h-[150px]">
                {loading || !data ? (
                  <div className="h-[150px] rounded-xl bg-white/5 animate-pulse" />
                ) : (
                  <ResponsiveContainer width="100%" height={150}>
                    <AreaChart
                      id="market-trend-area"
                      data={data.salary_trend}
                      margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                      accessibilityLayer={false}
                    >
                      <defs key="defs">
                        <linearGradient
                          id="colorSalary"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#4361EE"
                            stopOpacity={0.5}
                          />
                          <stop
                            offset="95%"
                            stopColor="#4361EE"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        key="grid"
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.05)"
                        vertical={false}
                      />
                      <XAxis
                        key="xaxis"
                        dataKey="year"
                        stroke="rgba(255,255,255,0.5)"
                        tick={{
                          fill: "rgba(255,255,255,0.7)",
                          fontSize: 12,
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        key="tooltip"
                        contentStyle={{
                          backgroundColor: "#0F172A",
                          borderColor: "rgba(255,255,255,0.1)",
                          borderRadius: "12px",
                        }}
                        formatter={(value: number) => [
                          `$${value}`,
                          t("market.tooltipAvg"),
                        ]}
                      />
                      <Area
                        key="area"
                        type="monotone"
                        dataKey="salary"
                        stroke="#4361EE"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorSalary)"
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="mt-4 p-4 bg-[#4361EE]/10 border border-[#4361EE]/20 rounded-xl">
                {loading || !data ? (
                  <div className="h-12 rounded-lg bg-white/10 animate-pulse" />
                ) : (
                  <p className="text-sm text-white/90">
                    <span className="font-bold text-[#4361EE]">
                      {t("market.growthPrefix")} {data.growth_narrative_percent}%
                    </span>{" "}
                    {data.growth_narrative_suffix}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-[#3A0CA3]" />
                  {t("market.workModeTitle")}
                </h3>
                <p className="text-[#F1E9FF]/60 text-sm mt-1">
                  {t("market.workModeSub")}
                </p>
              </div>
              <div className="space-y-4">
                {loading || !data ? (
                  <>
                    <div className="h-24 rounded-2xl bg-white/5 animate-pulse" />
                    <div className="h-24 rounded-2xl bg-white/5 animate-pulse" />
                  </>
                ) : (
                  data.work_modes.map((wm, idx) => (
                    <div
                      key={`${wm.label}-${idx}`}
                      className={`p-4 bg-white/5 rounded-2xl border relative overflow-hidden group transition-colors ${
                        wm.highlight
                          ? "border-[#4361EE]/40 hover:border-[#4361EE]/80"
                          : "border-white/10 hover:border-[#FF2E93]/50"
                      }`}
                    >
                      <div
                        className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -mr-10 -mt-10 ${
                          wm.highlight
                            ? "bg-[#4361EE]/20"
                            : "bg-[#FF2E93]/10"
                        }`}
                      />
                      <p
                        className={`text-sm mb-1 relative z-10 ${
                          wm.highlight
                            ? "text-[#4361EE] font-medium"
                            : "text-white/60"
                        }`}
                      >
                        {wm.label}
                      </p>
                      <p className="text-2xl font-bold text-white relative z-10">
                        ${formatEsInteger(wm.salary_usd)}{" "}
                        <span className="text-sm font-normal text-white/50">
                          {t("market.usdMonth")}
                        </span>
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 flex items-start gap-3">
                <div className="p-1.5 bg-[#FF2E93]/20 rounded-md shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4 text-[#FF2E93]" />
                </div>
                {loading || !data ? (
                  <div className="h-14 flex-1 rounded-lg bg-white/10 animate-pulse" />
                ) : (
                  <p className="text-sm text-[#F1E9FF]/80">{data.work_modes_insight}</p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-gradient-to-br from-[#3A0CA3]/20 to-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-bold font-heading flex items-center gap-3">
                    <Code2 className="w-6 h-6 text-[#FF2E93]" />
                    {t("market.techPaidTitle")}
                  </h3>
                  <p className="text-[#F1E9FF]/60 mt-1">
                    {t("market.techPaidSub")}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4361EE]/20 border border-[#4361EE]/30 text-[#4361EE] text-sm font-medium">
                  <RefreshCw
                    className={`w-3 h-3 ${isLive ? "animate-spin" : ""}`}
                    style={{ animationDuration: "3s" }}
                  />
                  {loading || !data ? "…" : data.demand_headline}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {loading || !data ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-36 rounded-2xl bg-white/5 animate-pulse"
                    />
                  ))
                ) : (
                  techRanking.map((tech, i) => (
                    <div
                      key={`${tech.name}-${i}`}
                      className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden group"
                    >
                      <div
                        className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-xl -mr-8 -mt-8 transition-opacity ${
                          i === 0 || i === 1
                            ? "bg-[#FF2E93]/30 opacity-100"
                            : "bg-[#4361EE]/20 opacity-0 group-hover:opacity-100"
                        }`}
                      />
                      <div className="w-12 h-12 rounded-full bg-black/30 border border-white/10 flex items-center justify-center relative z-10 shadow-inner">
                        <span className="font-bold text-white/50 absolute -top-2 -left-2 text-xs">
                          #{i + 1}
                        </span>
                        <tech.icon
                          className={`w-5 h-5 ${
                            i === 0
                              ? "text-[#FF2E93]"
                              : i === 1
                                ? "text-[#4361EE]"
                                : "text-white/70"
                          }`}
                        />
                      </div>
                      <div className="relative z-10">
                        <p className="font-bold text-white mb-1">{tech.name}</p>
                        <p className="text-xs font-medium text-green-400">
                          {tech.demand_growth} {t("market.demand")}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col items-center text-center mt-4 space-y-2">
            <p className="text-xs text-[#F1E9FF]/50">
              {t("market.disclaimer")}
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-[11px] text-[#F1E9FF]/40">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#FF2E93]" />
                {t("market.footnoteMarket")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#4361EE]" />
                {t("market.footnoteExp")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#FF2E93]" />
                {t("market.footnoteStack")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#4361EE]" />
                {t("market.footnoteGeo")}
              </span>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left text-sm text-[#F1E9FF]/40 border-t border-white/5">
            <span className="font-semibold uppercase tracking-wider text-white/50 shrink-0">
              {t("market.referenceFrame")}
            </span>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
              {MARKET_REFERENCE_SOURCES.map((name, i) => (
                <span key={name} className="inline-flex items-center gap-x-4">
                  {i > 0 && (
                    <span className="hidden md:inline opacity-50">•</span>
                  )}
                  <span className="hover:text-white/70 transition-colors cursor-default">
                    {name}
                  </span>
                </span>
              ))}
              <span className="hidden md:inline opacity-50">•</span>
              <span className="flex items-center gap-1 text-[#FF2E93]/80 font-medium">
                <Sparkles className="w-3 h-3" />
                {t("market.synthesis")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
