"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ArrowRight, Users, CheckCircle2, TrendingUp, Award } from "lucide-react";
import { formatEsInteger } from "@/app/lib/format-es";
import { useSalaryData } from "../providers/SalaryDataProvider";

export default function ProfessionalComparisonPage() {
  const { currentSalary, averageSalary } = useSalaryData();
  const seniorSalary = Math.round(averageSalary * 1.4);

  const data = [
    { id: "current", name: "Tu Perfil", value: currentSalary, fill: "#FF6B6B" },
    { id: "market", name: "Mayor Salario", value: averageSalary, fill: "#E9D8F1" },
    { id: "senior", name: "Cargos Superiores", value: seniorSalary, fill: "#4B1D3F" },
  ];

  const topSkills = [
    "Gestión de proyectos",
    "Análisis de datos",
    "Liderazgo de equipos",
    "Comunicación estratégica",
  ];

  return (
    <div className="flex flex-col items-center py-12 px-4 max-w-5xl mx-auto w-full min-h-[70vh]">
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center p-3 bg-secondary/30 rounded-2xl mb-6 text-primary">
          <Users className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-heading text-primary tracking-tight mb-4">
          Comparación con otros perfiles
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Entiende dónde te ubicas respecto a otros profesionales en tu área y qué los diferencia.
        </p>
      </motion.div>

      <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <motion.div
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-card border border-border/60 rounded-[2.5rem] p-6 md:p-10 shadow-lg shadow-primary/5 w-full flex flex-col justify-center h-full min-h-[400px]"
        >
          <h3 className="text-xl font-bold font-heading text-primary mb-6 text-center">
            Salario Mensual Estimado
          </h3>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 30, right: 0, left: -20, bottom: 20 }} barSize={60}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 13, fontWeight: 500 }} dy={16} />
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
                    fontSize: 14,
                    formatter: (val: number) => `S/ ${(val / 1000).toFixed(1)}k`,
                    dy: -10,
                  }}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col gap-6 h-full"
        >
          <div className="bg-secondary/20 border border-secondary/50 rounded-3xl p-6 md:p-8">
            <h3 className="text-xl font-bold font-heading text-primary mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-accent" /> Insights de la industria
            </h3>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-primary font-semibold">Experiencia:</strong> Profesionales con roles senior en tu área suelen tener entre 4 y 6 años más de experiencia.
              </p>
              <div className="w-full h-px bg-border/50" />
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-primary font-semibold">Responsabilidades:</strong> También tienden a tener habilidades adicionales en liderazgo y gestión directa de proyectos.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 flex-1">
            <h3 className="text-xl font-bold font-heading text-primary mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-accent" /> Habilidades mejor pagadas
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Habilidades que suelen tener los perfiles mejor remunerados en tu área:
            </p>
            <ul className="space-y-3 mb-8">
              {topSkills.map((skill, index) => (
                <li key={index} className="flex items-center gap-3 text-primary font-medium">
                  <CheckCircle2 className="w-5 h-5 text-secondary" fill="currentColor" />
                  {skill}
                </li>
              ))}
            </ul>

            <Link
              href="/career-growth"
              className="w-full h-14 rounded-full bg-primary text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all mt-auto"
            >
              Ver cómo mejorar mi perfil
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
