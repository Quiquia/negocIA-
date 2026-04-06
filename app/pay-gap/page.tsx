"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ArrowRight, Lightbulb, TrendingUp } from "lucide-react";
import { formatEsInteger } from "@/app/lib/format-es";
import { useSalaryData } from "../providers/SalaryDataProvider";

export default function PayGapVisualizationPage() {
  const { currentSalary, averageSalary, gapPercentage } = useSalaryData();

  const data = [
    { id: "current", name: "Tu Salario", value: currentSalary, fill: "#FF6B6B" },
    { id: "average", name: "Promedio del Mercado", value: averageSalary, fill: "#4B1D3F" },
  ];

  return (
    <div className="flex flex-col items-center py-12 px-4 max-w-4xl mx-auto w-full min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center p-3 bg-secondary/30 rounded-2xl mb-6 text-primary">
          <TrendingUp className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-heading text-primary tracking-tight mb-4">
          Comparación de salarios
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Visualizar la brecha salarial es el primer paso para tomar decisiones informadas sobre tu crecimiento profesional.
        </p>
      </motion.div>

      <div className="w-full grid md:grid-cols-5 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="md:col-span-3 bg-card border border-border/60 rounded-[2.5rem] p-6 md:p-10 shadow-lg shadow-primary/5 h-[400px] md:h-[500px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 40, right: 20, left: -20, bottom: 20 }} barSize={80}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 14, fontWeight: 500 }} dy={16} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 13 }} tickFormatter={(val) => `S/ ${val / 1000}k`} />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border border-border/50 p-4 rounded-xl shadow-xl">
                        <p className="font-medium text-muted-foreground mb-1">{payload[0].payload.name}</p>
                        <p className="text-2xl font-bold text-primary font-heading">
                          S/ {formatEsInteger(Number(payload[0].value))}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="value"
                radius={[12, 12, 0, 0]}
                animationDuration={1500}
                label={{
                  position: "top",
                  fill: "#1E2A38",
                  fontWeight: 600,
                  fontSize: 16,
                  formatter: (val: number) => `S/ ${formatEsInteger(val)}`,
                  dy: -10,
                }}
              >
                {data.map((entry) => (
                  <Cell key={`cell-${entry.id}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="md:col-span-2 flex flex-col gap-6"
        >
          <div className="bg-secondary/20 border border-secondary/50 rounded-3xl p-8 relative overflow-hidden group hover:bg-secondary/30 transition-colors">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            <Lightbulb className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold font-heading text-primary mb-3">El poder de los datos</h3>
            <p className="text-muted-foreground leading-relaxed">
              Muchas mujeres descubren que están subpagadas solo después de ver datos como estos. La transparencia es tu mejor herramienta.
            </p>
          </div>

          <div className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <h3 className="text-4xl font-bold font-heading text-secondary mb-2">{gapPercentage}%</h3>
            <p className="text-primary-foreground/90 font-medium text-lg mb-6">
              Esta es tu brecha salarial actual. Es hora de cerrarla.
            </p>

            <Link
              href="/negotiation-strategy"
              className="w-full h-14 rounded-full bg-accent text-accent-foreground font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all relative z-10"
            >
              Aprender a negociar
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
