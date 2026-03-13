"use client";

import {
  AlertCircle,
  ArrowRight,
  Bot,
  Briefcase,
  DollarSign,
  MapPin,
  TrendingUp,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { getQuickSalaryEstimate, type QuickEstimate } from "./hero-actions";
import { isTechRole } from "../data/tech-roles";

export function HeroSalaryForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<QuickEstimate | null>(null);
  const [aiMessage, setAiMessage] = useState("Analizando tu perfil...");
  const [roleError, setRoleError] = useState("");
  const [formData, setFormData] = useState({
    role: "Frontend Developer",
    customRole: "",
    salary: "",
    experience: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numSalary = parseInt(formData.salary, 10);
    if (isNaN(numSalary) || numSalary < 100) return;
    const resolvedRole = formData.role === "Otro" ? formData.customRole : formData.role;
    if (!resolvedRole || !formData.salary || !formData.experience || !formData.location) return;
    if (formData.role === "Otro" && !isTechRole(formData.customRole)) {
      setRoleError("Ingresa un rol relacionado con tecnología.");
      return;
    }
    setRoleError("");

    startTransition(async () => {
      setAiMessage("Analizando tu perfil...");
      const estimate = await getQuickSalaryEstimate({
        role: resolvedRole,
        experience: formData.experience,
        location: formData.location,
        currentSalary: numSalary,
      });
      setResult(estimate);
    });
  };

  const resolvedRole = formData.role === "Otro" ? formData.customRole.trim() : formData.role;
  const isFormValid =
    resolvedRole &&
    (formData.role !== "Otro" || isTechRole(formData.customRole)) &&
    formData.salary &&
    formData.experience &&
    formData.location &&
    parseInt(formData.salary, 10) >= 100;
  const showSalaryError =
    formData.salary !== "" && parseInt(formData.salary, 10) < 100;
  const fmt = (n: number) => `$${n.toLocaleString()}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(58,12,163,0.4)] relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF2E93]/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#4361EE]/30 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start md:items-center gap-3 mb-6 ">
          <div className="p-2 bg-gradient-to-br from-[#FF2E93] to-[#3A0CA3] rounded-xl shadow-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-xl font-black font-heading text-white">
                AI Salary Scanner
              </h3>
              <span className="w-[100px]  text-xs font-bold px-2 py-1 bg-white/10 rounded-full text-white/80">
                Paso 1 de 4
              </span>
            </div>
            <p className="text-sm font-medium text-white/70 mt-1">
              Prueba rápida: descubre si tu salario está alineado con el mercado
              tecnológico
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!result && !isPending ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-white/90 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#4361EE]" />
                  ¿Cuál es tu rol?
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => {
                    setFormData({ ...formData, role: e.target.value, customRole: "" });
                    setRoleError("");
                  }}
                  className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-xl text-sm text-white focus:outline-none transition-all duration-300 [&>option]:text-black ${
                    formData.role
                      ? "border-[#4361EE]/50 shadow-[0_0_15px_rgba(67,97,238,0.2)] bg-white/10"
                      : "border-white/10"
                  } focus:border-[#FF2E93] focus:shadow-[0_0_20px_rgba(255,46,147,0.4)] focus:bg-white/10`}
                >
                  <option value="" disabled>
                    Selecciona tu rol...
                  </option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="UX Designer">UX Designer</option>
                  <option value="Otro">Otro</option>
                </select>
                {formData.role === "Otro" && (
                  <>
                    <input
                      type="text"
                      required
                      placeholder="Ej: DevOps, QA, Product Manager..."
                      value={formData.customRole}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData({ ...formData, customRole: val });
                        if (val.trim().length >= 3 && !isTechRole(val)) {
                          setRoleError("Ingresa un rol relacionado con tecnología.");
                        } else {
                          setRoleError("");
                        }
                      }}
                      className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-xl text-sm text-white focus:outline-none transition-all duration-300 placeholder-white/30 mt-2 ${
                        roleError
                          ? "border-[#FF2E93]/70 shadow-[0_0_15px_rgba(255,46,147,0.3)]"
                          : formData.customRole && isTechRole(formData.customRole)
                            ? "border-green-400/50 shadow-[0_0_15px_rgba(74,222,128,0.2)] bg-white/10"
                            : formData.customRole
                              ? "border-[#4361EE]/50 shadow-[0_0_15px_rgba(67,97,238,0.2)] bg-white/10"
                              : "border-white/10"
                      } focus:border-[#FF2E93] focus:shadow-[0_0_20px_rgba(255,46,147,0.4)] focus:bg-white/10`}
                    />
                    {roleError ? (
                      <p className="text-xs font-semibold text-[#FF2E93] mt-1 ml-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {roleError}
                      </p>
                    ) : formData.customRole && isTechRole(formData.customRole) ? (
                      <p className="text-xs font-semibold text-green-400 mt-1 ml-1">
                        Rol válido
                      </p>
                    ) : formData.customRole ? (
                      <p className="text-xs font-medium text-white/50 mt-1 ml-1">
                        Ej: DevOps Engineer, QA Tester, Scrum Master, Soporte técnico...
                      </p>
                    ) : null}
                  </>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-white/90 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#FF2E93]" />
                  Salario Mensual Actual (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    required
                    min="100"
                    placeholder="Ej: 2200"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    className={`w-full pl-8 pr-4 py-3 bg-white/5 backdrop-blur-sm border rounded-xl text-sm text-white focus:outline-none transition-all duration-300 placeholder-white/30 ${
                      formData.salary
                        ? "border-[#4361EE]/50 shadow-[0_0_15px_rgba(67,97,238,0.2)] bg-white/10"
                        : "border-white/10"
                    } focus:border-[#FF2E93] focus:shadow-[0_0_20px_rgba(255,46,147,0.4)] focus:bg-white/10`}
                  />
                </div>
                {showSalaryError && (
                  <p className="text-xs font-semibold text-[#FF2E93] mt-1 ml-1 animate-pulse flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    El salario debe ser mayor a 100 USD
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-white/90 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#4361EE]" />
                    Años de experiencia
                  </label>
                  <select
                    required
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-xl text-sm text-white focus:outline-none transition-all duration-300 [&>option]:text-black ${
                      formData.experience
                        ? "border-[#4361EE]/50 shadow-[0_0_15px_rgba(67,97,238,0.2)] bg-white/10"
                        : "border-white/10"
                    } focus:border-[#FF2E93] focus:shadow-[0_0_20px_rgba(255,46,147,0.4)] focus:bg-white/10`}
                  >
                    <option value="" disabled>
                      Selecciona...
                    </option>
                    <option value="0-1">0-1 años</option>
                    <option value="2-3">2-3 años</option>
                    <option value="4-5">4-5 años</option>
                    <option value="6-8">6-8 años</option>
                    <option value="9+">9+ años</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-white/90 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#4361EE]" />
                    Ubicación
                  </label>
                  <select
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-xl text-sm text-white focus:outline-none transition-all duration-300 [&>option]:text-black ${
                      formData.location
                        ? "border-[#4361EE]/50 shadow-[0_0_15px_rgba(67,97,238,0.2)] bg-white/10"
                        : "border-white/10"
                    } focus:border-[#FF2E93] focus:shadow-[0_0_20px_rgba(255,46,147,0.4)] focus:bg-white/10`}
                  >
                    <option value="" disabled>
                      Selecciona...
                    </option>
                    <option value="LatAm">LatAm</option>
                    <option value="Europa">Europa</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="Remoto global">Remoto global</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full mt-4 h-14 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  isFormValid
                    ? "bg-gradient-to-r from-[#FF2E93] to-[#3A0CA3] hover:scale-[1.02] text-white shadow-[0_8px_30px_rgba(255,46,147,0.4)] cursor-pointer"
                    : "bg-white/5 border border-white/10 text-white/40 cursor-not-allowed"
                }`}
              >
                Ver estimación rápida
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-3 text-center flex flex-col gap-1">
                <p className="text-xs text-white/60 font-medium">
                  Análisis gratuito, confidencial y sin registro.
                </p>
                <p className="text-xs text-[#FF2E93] font-semibold">
                  Solo toma 3 minutos.
                </p>
              </div>
            </motion.form>
          ) : isPending ? (
            <motion.div
              key="calculating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-16 space-y-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[inset_0_0_30px_rgba(255,46,147,0.1)]"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E93] to-[#4361EE] blur-xl rounded-full opacity-60 animate-pulse" />
                <Bot className="w-12 h-12 text-white relative z-10 animate-bounce" />
                <div className="w-16 h-16 border-t-2 border-r-2 border-[#FF2E93] rounded-full animate-spin absolute -inset-2 opacity-80" />
                <div className="w-16 h-16 border-b-2 border-l-2 border-[#4361EE] rounded-full animate-[spin_1.5s_linear_reverse_infinite] absolute -inset-2 opacity-80" />
              </div>

              <div className="w-full max-w-[200px] h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-[#FF2E93] to-[#4361EE]"
                />
              </div>

              <p className="text-sm font-semibold text-white animate-pulse text-center px-4">
                Analizando tu perfil con IA...
              </p>
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-[inset_0_0_30px_rgba(67,97,238,0.1)] text-center relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF2E93]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#4361EE]/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <p className="text-sm font-medium text-white/80 mb-2">
                  Tu salario estimado de mercado podría estar entre:
                </p>
                <div className="text-4xl font-black font-heading text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] mb-4">
                  {fmt(result.min_salary)} – {fmt(result.max_salary)}
                </div>

                <div className="p-3 bg-[#FF2E93]/10 border border-[#FF2E93]/30 rounded-xl mb-6">
                  <p className="text-sm font-bold text-white flex items-center justify-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#FF2E93]" />
                    {result.insight}
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push("/salary-input")}
                className="relative z-10 w-full py-4 px-4 bg-white hover:bg-[#F1E9FF] text-[#3A0CA3] rounded-xl font-black text-sm transition-all shadow-[0_4px_25px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group"
              >
                Continuar simulación completa (Gratis)
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#FF2E93]" />
              </button>

              <button
                type="button"
                onClick={() => setResult(null)}
                className="relative z-10 w-full py-3 px-4 bg-transparent hover:bg-white/10 border border-white/20 text-white/80 hover:text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                Volver a analizar
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
