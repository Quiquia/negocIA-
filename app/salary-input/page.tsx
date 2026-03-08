"use client";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSalaryData } from "../providers/SalaryDataProvider";
import { submitSalaryProfile } from "./actions";

type ProfileForm = {
  role: string;
  seniority: string;
  yearsExperience: string;
  techStack: string[];
  tools: string[];
  englishLevel: string;
  englishUsage: string;
  otherLanguages: string;
  roleDescription: string;
  country: string;
  city: string;
  workMode: string;
  companyType: string;
  contractType: string;
  workSchedule: string;
  companyOrigin: string;
  monthlySalary: number;
  currency: string;
  salaryType: string;
  hasBonus: string;
  lastIncrease: string;
  negotiationConfidence: number;
  wantsAiPractice: string;
};

export default function SalaryInputPage() {
  const router = useRouter();
  const {
    prefillRole,
    prefillSeniority,
    setSubmissionId,
    setProfileData,
    setCurrentSalary,
    setAverageSalary,
    setGapPercentage,
  } = useSalaryData();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<ProfileForm>({
    mode: "onChange",
    defaultValues: {
      role: prefillRole || "Frontend Developer",
      seniority: prefillSeniority || "",
      techStack: [],
      tools: [],
      negotiationConfidence: 5,
    },
  });

  const watchCountry = watch("country");
  const currencySymbol =
    watchCountry === "Perú" ? "S/" : watchCountry === "Colombia" ? "$" : "$";

  const peruCities = [
    "Lima",
    "Arequipa",
    "Trujillo",
    "Chiclayo",
    "Cusco",
    "Callao",
    "Piura",
    "Iquitos",
    "Huancayo",
    "Chimbote",
    "Tacna",
    "Pucallpa",
    "Ica",
  ];

  const colombiaCities = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Barranquilla",
    "Cartagena de Indias",
    "Bucaramanga",
    "Pereira",
    "Santa Marta",
    "Cúcuta",
    "Ibagué",
  ];

  useEffect(() => {
    const firstError = document.querySelector(".error-field");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [errors]);

  const handleNext = async () => {
    let fieldsToValidate: (keyof ProfileForm)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = [
        "role",
        "seniority",
        "yearsExperience",
        "techStack",
        "tools",
        "englishLevel",
        "englishUsage",
        "roleDescription",
      ];
    } else if (currentStep === 2) {
      fieldsToValidate = [
        "country",
        "city",
        "workMode",
        "companyType",
        "contractType",
        "workSchedule",
        "companyOrigin",
      ];
    } else if (currentStep === 3) {
      fieldsToValidate = [
        "monthlySalary",
        "currency",
        "salaryType",
        "hasBonus",
      ];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = (data: ProfileForm) => {
    setSubmitError(null);

    // Build FormData with the keys the server action expects
    const fd = new FormData();
    fd.set("acceptedTerms", "on");
    fd.set("roleArea", data.role);
    fd.set("seniority", data.seniority);
    fd.set("frontendYearsExperience", data.yearsExperience);
    fd.set("mainTechnology", data.techStack.join(", "));
    fd.set("technicalSkills", data.tools.join(", "));
    fd.set("englishLevel", data.englishLevel);
    fd.set("usesEnglishCurrentJob", data.englishUsage);
    fd.set("roleDescription", data.roleDescription);
    fd.set("country", data.country);
    fd.set("city", data.city);
    fd.set("workMode", data.workMode);
    fd.set("companyType", data.companyType);
    fd.set("employmentType", data.contractType);
    fd.set("workSchedule", data.workSchedule);
    fd.set("companyScope", data.companyOrigin);
    fd.set("monthlySalaryAmount", String(data.monthlySalary));
    fd.set("salaryCurrency", data.currency);
    fd.set("salaryType", data.salaryType);
    if (data.hasBonus === "Sí") fd.set("hasVariableCompensation", "on");
    fd.set("lastRaisePeriod", data.lastIncrease);
    fd.set("negotiationConfidence", String(data.negotiationConfidence));
    if (data.wantsAiPractice === "Sí")
      fd.set("wantsSalaryNegotiationPractice", "on");

    startTransition(async () => {
      const result = await submitSalaryProfile(fd);

      if (!result.success) {
        setSubmitError(result.error ?? "Error al guardar los datos.");
        return;
      }

      // Store submission ID and data in context for subsequent pages
      setSubmissionId(result.id!);
      setProfileData(data as any);
      const salary = Number(data.monthlySalary);
      const avg = Math.round(salary * 1.418);
      setCurrentSalary(salary);
      setAverageSalary(avg);
      setGapPercentage(Math.round(((avg - salary) / avg) * 100));
      router.push("/reality-check");
    });
  };

  const stepTitles = [
    "Tu perfil",
    "Tu trabajo actual",
    "Tu compensación",
    "Negociación",
  ];

  const ErrorMsg = ({ name }: { name: keyof ProfileForm }) => {
    const error = errors[name];
    if (!error) return null;
    return (
      <span className="text-sm text-rose-500 font-medium mt-1 inline-block error-field">
        {error.message ||
          "Por favor responde esta pregunta antes de continuar."}
      </span>
    );
  };

  const fieldClasses = (name: keyof ProfileForm, base: string = "") => {
    return `${base} ${errors[name] ? "border-rose-500 ring-rose-500/10" : "border-border/50 focus:border-primary focus:ring-primary/10"}`;
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 md:py-16 px-2 sm:px-4 max-w-3xl mx-auto w-full">
      {/* Progress Indicator */}
      <div className="w-full mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-primary uppercase tracking-wider">
            Paso {currentStep} de {totalSteps} — {stepTitles[currentStep - 1]}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-3 text-center md:text-left">
          Mientras más detalles compartas, más preciso será tu análisis
          salarial.
        </p>
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-white border border-border rounded-[2rem] p-4 sm:p-6 md:p-10 shadow-xl shadow-primary/5 relative overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-primary via-accent to-secondary" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-2">
          {/* STEP 1: TU PERFIL */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center md:text-left mb-8">
                <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-heading text-foreground mb-3">
                  Cuéntanos sobre tu perfil profesional
                </h1>
                <p className="text-sm sm:text-lg text-muted-foreground">
                  Esto nos ayudará a entender tu nivel de experiencia y tu valor
                  en el mercado.
                </p>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">
                    Área o rol <span className="text-rose-500">*</span>
                  </label>
                  <select
                    {...register("role", { required: true })}
                    className={fieldClasses(
                      "role",
                      "w-full h-14 px-4 bg-muted/30 border-2 rounded-2xl outline-none focus:ring-4 transition-all",
                    )}
                  >
                    <option value="Frontend Developer">
                      Frontend Developer
                    </option>
                  </select>
                  <ErrorMsg name="role" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    Nivel de Seniority <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${errors.seniority ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {[
                      { value: "Trainee", label: "Trainee (en formación)" },
                      { value: "Junior", label: "Junior (<2 años)" },
                      { value: "Mid", label: "Mid (2-6 años)" },
                      { value: "Senior", label: "Senior (6+ años)" },
                      { value: "Lead", label: "Lead" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center gap-3 p-4 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all bg-white"
                      >
                        <input
                          type="radio"
                          value={opt.value}
                          {...register("seniority", { required: true })}
                          className="w-5 h-5 accent-primary"
                        />
                        <span className="font-medium">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="seniority" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Cuántos años de experiencia tienes específicamente como
                    Frontend Developer? <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${errors.yearsExperience ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {[
                      "0 – 1 años",
                      "2 – 3 años",
                      "4 – 5 años",
                      "6 – 8 años",
                      "9+ años",
                    ].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-3 p-4 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all bg-white"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("yearsExperience", { required: true })}
                          className="w-5 h-5 accent-primary"
                        />
                        <span className="font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="yearsExperience" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Cuál es tu stack tecnológico principal?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`flex flex-wrap gap-3 ${errors.techStack ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {[
                      "React",
                      "Next.js",
                      "Angular",
                      "Vue",
                      "JavaScript / TypeScript",
                      "Otro",
                    ].map((tech) => (
                      <label
                        key={tech}
                        className="flex items-center justify-center px-4 py-2.5 border-2 border-border/50 rounded-full cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 transition-all select-none bg-white"
                      >
                        <input
                          type="checkbox"
                          value={tech}
                          {...register("techStack", { required: true })}
                          className="hidden"
                        />
                        <span className="font-bold text-sm text-foreground/80 peer-checked:text-primary">
                          {tech}
                        </span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="techStack" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Con qué herramientas complementas tu trabajo en el día a
                    día? <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`flex flex-wrap gap-3 ${errors.tools ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {[
                      "TypeScript",
                      "JavaScript",
                      "HTML",
                      "CSS",
                      "Tailwind CSS",
                      "Git",
                      "Testing",
                      "APIs REST",
                      "Otra",
                    ].map((tool) => (
                      <label
                        key={tool}
                        className="flex items-center justify-center px-4 py-2.5 border-2 border-border/50 rounded-full cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 transition-all select-none bg-white"
                      >
                        <input
                          type="checkbox"
                          value={tool}
                          {...register("tools", { required: true })}
                          className="hidden"
                        />
                        <span className="font-bold text-sm text-foreground/80 peer-checked:text-primary">
                          {tool}
                        </span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="tools" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Cuál es tu nivel de inglés?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${errors.englishLevel ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {[
                      "Básico",
                      "Intermedio",
                      "Intermedio alto",
                      "Avanzado",
                      "Ninguno",
                    ].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 p-3 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all bg-white"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("englishLevel", { required: true })}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="font-medium text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="englishLevel" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Usas inglés en tu trabajo actual?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`flex flex-col sm:flex-row gap-4 ${errors.englishUsage ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {["Sí, frecuentemente", "A veces", "No"].map((opt) => (
                      <label
                        key={opt}
                        className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-border/50 rounded-2xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all text-center bg-white"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("englishUsage", { required: true })}
                          className="hidden"
                        />
                        <span className="font-bold text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="englishUsage" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Dominas algún otro idioma?
                  </label>
                  <div className="flex gap-4">
                    {["Sí", "No"].map((opt) => (
                      <label
                        key={opt}
                        className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-border/50 rounded-2xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all text-center"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("otherLanguages", { required: false })}
                          className="hidden"
                        />
                        <span className="font-bold text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Cuál describe mejor tu rol actual?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`grid grid-cols-1 gap-3 ${errors.roleDescription ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {[
                      "Desarrollo de interfaces y componentes",
                      "Desarrollo frontend con lógica de negocio",
                      "Frontend con decisiones técnicas / arquitectura",
                      "Frontend con liderazgo o mentoría",
                    ].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-start gap-3 p-4 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all bg-white"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("roleDescription", { required: true })}
                          className="w-5 h-5 accent-primary mt-0.5 shrink-0"
                        />
                        <span className="font-medium text-sm leading-tight">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="roleDescription" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: TU TRABAJO ACTUAL */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="text-center md:text-left mb-8">
                <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-heading text-foreground mb-3">
                  Cuéntanos sobre tu trabajo actual
                </h1>
                <p className="text-sm sm:text-lg text-muted-foreground">
                  Esto nos ayuda a contextualizar tu salario dentro de tu
                  mercado local.
                </p>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿En qué país trabajas actualmente?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`flex gap-4 ${errors.country ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {["Perú", "Colombia"].map((opt) => (
                      <label
                        key={opt}
                        className="flex-1 flex items-center justify-center gap-2 p-3 sm:p-4 border-2 border-border/50 rounded-2xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all text-center bg-white"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("country", { required: true })}
                          className="hidden"
                        />
                        <span className="font-bold text-sm sm:text-lg">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="country" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">
                    Selecciona tu ciudad{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <select
                    {...register("city", { required: true })}
                    disabled={!watchCountry}
                    className={fieldClasses(
                      "city",
                      "w-full h-12 sm:h-14 px-4 text-sm sm:text-base bg-muted/30 border-2 rounded-2xl outline-none focus:ring-4 transition-all disabled:opacity-50",
                    )}
                  >
                    <option value="" disabled>
                      Selecciona tu ciudad
                    </option>
                    {watchCountry === "Perú" &&
                      peruCities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    {watchCountry === "Colombia" &&
                      colombiaCities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                  <ErrorMsg name="city" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Tu trabajo es remoto, híbrido o presencial?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`flex flex-col sm:flex-row gap-3 ${errors.workMode ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {["Remoto", "Híbrido", "Presencial"].map((opt) => (
                      <label
                        key={opt}
                        className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all text-center bg-white"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("workMode", { required: true })}
                          className="hidden"
                        />
                        <span className="font-bold text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="workMode" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Qué tipo de empresa es?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${errors.companyType ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {[
                      "Startup",
                      "Consultora",
                      "Agencia",
                      "Empresa de producto digital",
                      "Banco / Fintech",
                      "Empresa grande / corporativa",
                      "Otra",
                    ].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 p-3 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all bg-white"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("companyType", { required: true })}
                          className="w-4 h-4 accent-primary shrink-0"
                        />
                        <span className="font-medium text-sm leading-tight">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="companyType" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Cuál es tu tipo de vínculo laboral?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${errors.contractType ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {[
                      "Planilla / Empleado Dependiente",
                      "Contrato por Servicios / Locación",
                      "Freelancer / Autónomo",
                      "Otro",
                    ].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 p-3 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all bg-white"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("contractType", { required: true })}
                          className="w-4 h-4 accent-primary shrink-0"
                        />
                        <span className="font-medium text-sm leading-tight">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="contractType" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Cuál es tu jornada actual?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${errors.workSchedule ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {[
                      "Tiempo completo",
                      "Medio tiempo",
                      "Por horas / por proyecto",
                      "Otra",
                    ].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 p-3 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all bg-white"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("workSchedule", { required: true })}
                          className="w-4 h-4 accent-primary shrink-0"
                        />
                        <span className="font-medium text-sm leading-tight">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="workSchedule" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Tu empresa es local o internacional?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`flex flex-col sm:flex-row gap-4 ${errors.companyOrigin ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    <label className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-border/50 rounded-2xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all bg-white">
                      <input
                        type="radio"
                        value="Local"
                        {...register("companyOrigin", { required: true })}
                        className="w-5 h-5 accent-primary hidden"
                      />
                      <span className="font-bold">Local</span>
                    </label>
                    <label className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-border/50 rounded-2xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all bg-white">
                      <input
                        type="radio"
                        value="Internacional"
                        {...register("companyOrigin", { required: true })}
                        className="w-5 h-5 accent-primary hidden"
                      />
                      <span className="font-bold">Internacional</span>
                    </label>
                  </div>
                  <ErrorMsg name="companyOrigin" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TU COMPENSACIÓN */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="text-center md:text-left mb-8">
                <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-heading text-foreground mb-3">
                  Cuéntanos sobre tu compensación actual
                </h1>
                <p className="text-sm sm:text-lg text-muted-foreground">
                  Esta información nos ayudará a comparar tu salario con el
                  mercado.
                </p>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">
                    ¿Cuánto es tu salario mensual?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">
                      {currencySymbol}
                    </span>
                    <input
                      type="number"
                      {...register("monthlySalary", {
                        required: "Por favor ingresa tu salario.",
                        min: {
                          value: 50,
                          message: "El salario debe ser mayor a 50.",
                        },
                        validate: (value) =>
                          value >= 0 || "No se permiten números negativos",
                      })}
                      placeholder="Ej. 5000"
                      className={fieldClasses(
                        "monthlySalary",
                        "w-full h-14 pl-12 pr-4 bg-muted/30 border-2 rounded-2xl outline-none focus:ring-4 transition-all text-xl font-bold",
                      )}
                    />
                  </div>
                  <ErrorMsg name="monthlySalary" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿En qué moneda recibes tu salario?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-3 gap-3 ${errors.currency ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {["PEN", "COP", "USD"].map((opt) => (
                      <label
                        key={opt}
                        className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all text-center bg-white"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("currency", { required: true })}
                          className="hidden"
                        />
                        <span className="font-bold text-sm">
                          {opt === "PEN"
                            ? "Soles (PEN)"
                            : opt === "COP"
                              ? "Pesos (COP)"
                              : "Dólares (USD)"}
                        </span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="currency" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-bold text-foreground">
                      ¿Es sueldo bruto o neto?{" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <div className="group relative cursor-help">
                      <AlertCircle className="w-4 h-4 text-muted-foreground" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        <strong>Sueldo neto:</strong> lo que realmente recibes
                        en tu cuenta después de descuentos.
                        <br />
                        <br />
                        <strong>Sueldo bruto:</strong> el monto total antes de
                        descuentos.
                      </div>
                    </div>
                  </div>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${errors.salaryType ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {["Bruto", "Neto", "No estoy segura"].map((type) => (
                      <label
                        key={type}
                        className="flex items-center justify-center gap-2 p-4 border-2 border-border/50 rounded-2xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all bg-white"
                      >
                        <input
                          type="radio"
                          value={type}
                          {...register("salaryType", { required: true })}
                          className="hidden"
                        />
                        <span className="font-bold">{type}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="salaryType" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-bold text-foreground">
                      ¿Recibes bono o compensación variable?{" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <div className="group relative cursor-help">
                      <AlertCircle className="w-4 h-4 text-muted-foreground" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        Ingreso adicional a tu sueldo fijo, como bonos,
                        comisiones o incentivos.
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex flex-col sm:flex-row gap-4 ${errors.hasBonus ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {["Sí", "No"].map((opt) => (
                      <label
                        key={opt}
                        className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-border/50 rounded-2xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all bg-white"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("hasBonus", { required: true })}
                          className="hidden"
                        />
                        <span className="font-bold">{opt}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="hasBonus" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: NEGOCIACIÓN */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="text-center md:text-left mb-8">
                <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-heading text-foreground mb-3">
                  Negociación y crecimiento
                </h1>
                <p className="text-sm sm:text-lg text-muted-foreground">
                  Queremos ayudarte a negociar con mayor confianza.
                </p>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Hace cuánto fue tu último aumento salarial o ascenso?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${errors.lastIncrease ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {[
                      "Menos de 6 meses",
                      "Entre 6 y 12 meses",
                      "Entre 1 y 2 años",
                      "Más de 2 años",
                      "Nunca he recibido un aumento",
                    ].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-3 p-4 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all bg-white"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("lastIncrease", { required: true })}
                          className="w-5 h-5 accent-primary shrink-0"
                        />
                        <span className="font-medium text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="lastIncrease" />
                </div>

                <div className="space-y-4 pt-4">
                  <label className="text-sm font-bold text-foreground block mb-2">
                    ¿Qué tan segura te sientes negociando tu salario hoy?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    {...register("negotiationConfidence")}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs font-semibold text-muted-foreground mt-2">
                    <span>Muy insegura y con miedo</span>
                    <span>Muy segura y confiada</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/50">
                  <label className="text-sm font-bold text-foreground">
                    ¿Te gustaría practicar una negociación salarial con IA?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`flex flex-col sm:flex-row gap-4 ${errors.wantsAiPractice ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {["Sí", "No"].map((opt) => (
                      <label
                        key={opt}
                        className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-border/50 rounded-2xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all bg-white"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("wantsAiPractice", { required: true })}
                          className="hidden"
                        />
                        <span className="font-bold">{opt}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="wantsAiPractice" />
                </div>
              </div>
            </div>
          )}

          {/* Error message */}
          {submitError && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm font-medium">
              {submitError}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-border/50">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex h-14 items-center justify-center gap-2 px-4 md:px-8 rounded-full bg-muted text-foreground font-bold hover:bg-muted/80 transition-all text-xs sm:text-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                Anterior
              </button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-14 items-center justify-center gap-2 px-4 md:px-8 text-xs sm:text-lg rounded-full bg-primary text-white font-extrabold  shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all ml-auto"
              >
                Siguiente
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isPending}
                onClick={async (e) => {
                  e.preventDefault();
                  const isStepValid = await trigger([
                    "lastIncrease",
                    "negotiationConfidence",
                    "wantsAiPractice",
                  ]);
                  if (isStepValid) {
                    handleSubmit(onSubmit)();
                  }
                }}
                className="text-sm md:text-lg inline-flex h-14 items-center justify-center gap-2 px-4 md:px-8 rounded-full bg-gradient-to-r from-primary to-accent text-white font-extrabold  shadow-[0_0_20px_rgba(255,46,147,0.4)] hover:-translate-y-0.5 transition-all ml-auto disabled:opacity-60 disabled:pointer-events-none"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    Analizar mi salario
                    <CheckCircle2 className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
