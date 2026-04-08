"use client";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  detectCountryByTimezone,
  getCountryByName,
  getCurrencyOptions,
  latamCountries,
} from "../data/latam-countries";
import { isTechRole, TECH_ROLE_ERROR } from "../data/tech-roles";
import { useSalaryData } from "../providers/SalaryDataProvider";
import { submitSalaryProfile } from "./actions";

type ProfileForm = {
  role: string;
  customRole: string;
  seniority: string;
  yearsExperience: string;
  techStack: string[];
  tools: string[];
  keywords: string[];
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
  const [customTechStack, setCustomTechStack] = useState<string[]>([]);
  const [customTools, setCustomTools] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [toolInput, setToolInput] = useState("");
  const [techInputError, setTechInputError] = useState(false);
  const [toolInputError, setToolInputError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<ProfileForm>({
    mode: "onChange",
    /** Mantener valores de pasos anteriores aunque el JSX del paso se desmonte. */
    shouldUnregister: false,
    defaultValues: {
      role: prefillRole || "Frontend Developer",
      seniority: prefillSeniority || "",
      yearsExperience: "",
      techStack: [],
      tools: [],
      keywords: [],
      country: "",
      currency: "",
      englishLevel: "",
      englishUsage: "",
      otherLanguages: "",
      roleDescription: "",
      customRole: "",
      negotiationConfidence: 5,
      /** No hay control en UI; el servidor espera el campo en el submit. */
      wantsAiPractice: "No",
    },
  });

  const formValues = watch();
  const watchCountry = watch("country");
  /** Suscripción explícita al rol: evita texto/chips de otro rol (p. ej. seguir viendo Frontend con Backend elegido). */
  const watchRole = useWatch({
    control,
    name: "role",
    defaultValue: prefillRole || "Frontend Developer",
  });

  /** Suscripción explícita: watch() global a veces no re-renderiza bien con arrays de checkboxes. */
  const watchedTechStack = useWatch({ control, name: "techStack", defaultValue: [] });
  const watchedTools = useWatch({ control, name: "tools", defaultValue: [] });

  /** RHF a veces devuelve un único checkbox como string; sin esto el botón no se habilita. */
  const normalizeMulti = (val: unknown): string[] => {
    if (Array.isArray(val)) {
      return val.filter((x) => typeof x === "string" && x.trim() !== "");
    }
    if (typeof val === "string" && val.trim() !== "") return [val];
    return [];
  };

  const canProceedToNext = useMemo(() => {
    const v = formValues;
    if (currentStep === 1) {
      if (!v.seniority?.trim()) return false;
      if (!v.yearsExperience?.trim()) return false;
      const techOk = normalizeMulti(watchedTechStack ?? v.techStack).length > 0;
      const toolsOk = normalizeMulti(watchedTools ?? v.tools).length > 0;
      if (!techOk || !toolsOk) return false;
      if (!v.englishLevel?.trim()) return false;
      if (!v.englishUsage?.trim()) return false;
      if (!v.otherLanguages?.trim()) return false;
      if (!v.roleDescription?.trim()) return false;
      if (v.role === "Otro") {
        const cr = v.customRole?.trim();
        if (!cr || !isTechRole(cr)) return false;
      }
      return true;
    }
    if (currentStep === 2) {
      return !!(
        v.country?.trim() &&
        v.city?.trim() &&
        v.workMode?.trim() &&
        v.companyType?.trim() &&
        v.contractType?.trim() &&
        v.workSchedule?.trim() &&
        v.companyOrigin?.trim()
      );
    }
    if (currentStep === 3) {
      const raw = v.monthlySalary;
      const n = typeof raw === "number" ? raw : Number(raw);
      if (!Number.isFinite(n) || n < 50) return false;
      if (!v.currency?.trim() || !v.salaryType?.trim() || !v.hasBonus?.trim()) {
        return false;
      }
      return true;
    }
    return true;
  }, [
    currentStep,
    formValues,
    watchedTechStack,
    watchedTools,
  ]);

  const step1Hint = useMemo(() => {
    if (currentStep !== 1 || canProceedToNext) return undefined;
    const v = formValues;
    if (!v.seniority?.trim()) return "Falta: nivel de seniority.";
    if (!v.yearsExperience?.trim()) return "Falta: años de experiencia en el rol.";
    if (normalizeMulti(watchedTechStack ?? v.techStack).length === 0) {
      return "Falta: al menos una tecnología del stack (checkbox o campo + Enter).";
    }
    if (normalizeMulti(watchedTools ?? v.tools).length === 0) {
      return "Falta: al menos una herramienta (checkbox o campo + Enter).";
    }
    if (!v.englishLevel?.trim()) return "Falta: nivel de inglés.";
    if (!v.englishUsage?.trim()) return "Falta: uso de inglés en el trabajo.";
    if (!v.otherLanguages?.trim()) {
      return "Falta: si dominas otro idioma (Sí o No).";
    }
    if (!v.roleDescription?.trim()) {
      return "Falta: cómo describe mejor tu rol (elige una opción o escribe si es «Otro»).";
    }
    if (v.role === "Otro") {
      const cr = v.customRole?.trim();
      if (!cr) return "Falta: escribe tu rol en «Otro».";
      if (!isTechRole(cr)) return "El rol debe ser de ámbito tecnológico.";
    }
    return "Revisa los campos marcados con error.";
  }, [currentStep, canProceedToNext, formValues, watchedTechStack, watchedTools]);

  const selectedCountry = getCountryByName(watchCountry);
  const currencySymbol = selectedCountry?.currency.symbol ?? "$";
  const countryCities = selectedCountry?.cities ?? [];
  const currencyOptions = getCurrencyOptions(watchCountry);

  const roleOptions = {
    "Frontend Developer": {
      techStack: ["React", "Next.js", "Angular", "Vue", "JavaScript / TypeScript"],
      tools: ["TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Git", "Testing", "APIs REST"],
      roleDescriptions: [
        "Desarrollo de interfaces y componentes",
        "Desarrollo frontend con lógica de negocio",
        "Frontend con decisiones técnicas / arquitectura",
        "Frontend con liderazgo o mentoría",
      ],
    },
    "Backend Developer": {
      techStack: ["Node.js", "Python", "Java", "Go", ".NET / C#", "PHP"],
      tools: ["TypeScript", "SQL / NoSQL", "Docker", "AWS / GCP / Azure", "Git", "Testing", "APIs REST", "GraphQL", "CI/CD"],
      roleDescriptions: [
        "Desarrollo de APIs y microservicios",
        "Backend con lógica de negocio compleja",
        "Backend con decisiones técnicas / arquitectura",
        "Backend con liderazgo o mentoría",
      ],
    },
    "Data Analyst": {
      techStack: ["Python", "SQL", "R", "Excel avanzado", "Power BI", "Tableau"],
      tools: ["Pandas / NumPy", "SQL / NoSQL", "Google Sheets", "Looker / Metabase", "Git", "Jupyter Notebooks", "ETL / Pipelines", "APIs REST", "Estadística"],
      roleDescriptions: [
        "Análisis de datos y generación de reportes",
        "Data analysis con modelado y visualización",
        "Data analysis con decisiones estratégicas de negocio",
        "Data analysis con liderazgo o mentoría",
      ],
    },
    "UX Designer": {
      techStack: ["Figma", "Sketch", "Adobe XD", "Framer", "Webflow", "HTML / CSS"],
      tools: ["Figma", "Miro / FigJam", "Notion", "Hotjar / Analytics", "Prototyping", "Design Systems", "User Research", "Accesibilidad"],
      roleDescriptions: [
        "Diseño de interfaces y prototipado",
        "UX Research y testing con usuarios",
        "UX con decisiones de producto y estrategia",
        "UX con liderazgo de equipo o mentoría",
      ],
    },
  };

  const isOtherRole = watchRole === "Otro";
  const currentRoleOptions = isOtherRole
    ? {
        techStack: ["Python", "JavaScript / TypeScript", "SQL", "Excel avanzado", "Java", "Git", "Docker", "AWS / GCP / Azure"],
        tools: ["Jira / Trello", "Slack", "Notion", "Google Workspace", "Git", "CI/CD", "APIs REST", "Testing"],
        roleDescriptions: [] as string[],
      }
    : (roleOptions[watchRole as keyof typeof roleOptions] || roleOptions["Frontend Developer"]);

  /** Solo al cambiar de rol (no en el montaje): evita que Strict Mode / doble efecto borre stack/herramientas ya elegidas. */
  const previousRoleRef = useRef<string | null>(null);
  useEffect(() => {
    const prev = previousRoleRef.current;
    if (prev === null) {
      previousRoleRef.current = watchRole;
      return;
    }
    if (prev === watchRole) return;
    previousRoleRef.current = watchRole;
    setValue("techStack", []);
    setValue("tools", []);
    setValue("roleDescription", "" as never);
    if (watchRole !== "Otro") setValue("customRole", "");
    setCustomTechStack([]);
    setCustomTools([]);
    setTechInput("");
    setToolInput("");
    setTechInputError(false);
    setToolInputError(false);
  }, [watchRole, setValue]);

  // Detect country from browser timezone on mount
  useEffect(() => {
    const detected = detectCountryByTimezone();
    if (detected) {
      setValue("country", detected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Al cambiar de país (no en la primera asignación): vaciar ciudad y sincronizar moneda. */
  const previousCountryRef = useRef<string | null>(null);
  useEffect(() => {
    if (!watchCountry) return;
    const prev = previousCountryRef.current;
    if (prev === watchCountry) return;
    const isFirstAssignment = prev === null;
    previousCountryRef.current = watchCountry;
    const country = getCountryByName(watchCountry);
    if (country) setValue("currency", country.currency.code);
    if (!isFirstAssignment) setValue("city", "");
  }, [watchCountry, setValue]);

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
        ...(isOtherRole ? ["customRole" as const] : []),
        "seniority",
        "yearsExperience",
        "techStack",
        "tools",
        "englishLevel",
        "englishUsage",
        "otherLanguages",
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
    fd.set("roleArea", data.role === "Otro" ? data.customRole : data.role);
    fd.set("seniority", data.seniority);
    fd.set("frontendYearsExperience", data.yearsExperience);
    const techList = normalizeMulti(data.techStack);
    const toolsList = normalizeMulti(data.tools);
    fd.set("mainTechnology", techList.join(", "));
    fd.set("technicalSkills", toolsList.join(", "));
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
      const resolvedData = {
        ...data,
        role: data.role === "Otro" ? data.customRole : data.role,
      };
      setProfileData(resolvedData as any);
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

  const watchKeywords = watch("keywords") || [];
  const [keywordInput, setKeywordInput] = useState("");

  const handleAddKeyword = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newKeyword = keywordInput.trim();
      if (newKeyword && !watchKeywords.includes(newKeyword)) {
        const updated = [...watchKeywords, newKeyword];
        setValue("keywords", updated, { shouldValidate: true });
        setKeywordInput("");
      }
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    const updated = watchKeywords.filter((k) => k !== keywordToRemove);
    setValue("keywords", updated, { shouldValidate: true });
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
            initial={false}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-3 gap-2">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Mientras más detalles compartas, más preciso será tu análisis
            salarial.
          </p>
          <p className="text-xs text-muted-foreground/80 flex items-center justify-center md:justify-end gap-1.5 font-medium bg-muted/30 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            NegocIA+ utiliza datos reales del mercado tecnológico para estimar
            rangos salariales.
          </p>
        </div>
      </div>

      <motion.div
        key={currentStep}
        initial={false}
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
                    <option value="Backend Developer">
                      Backend Developer
                    </option>
                    <option value="Data Analyst">
                      Data Analyst
                    </option>
                    <option value="UX Designer">
                      UX Designer
                    </option>
                    <option value="Otro">Otro</option>
                  </select>
                  <ErrorMsg name="role" />
                  {isOtherRole && (
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder="Escribe tu rol (ej. DevOps Engineer, QA Tester, Product Manager...)"
                        {...register("customRole", {
                          validate: (value) => {
                            if (watchRole !== "Otro") return true;
                            if (!value || !value.trim()) return "Por favor escribe tu rol.";
                            if (!isTechRole(value)) return TECH_ROLE_ERROR;
                            return true;
                          },
                        })}
                        className={fieldClasses(
                          "customRole",
                          "w-full h-14 px-4 bg-muted/30 border-2 rounded-2xl outline-none focus:ring-4 transition-all",
                        )}
                      />
                      <ErrorMsg name="customRole" />
                    </div>
                  )}
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
                        className="relative flex items-center gap-3 p-4 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all bg-white group"
                      >
                        <input
                          type="radio"
                          value={opt.value}
                          {...register("seniority", { required: true })}
                          className="w-5 h-5 accent-primary"
                        />
                        <span className="font-medium group-has-[:checked]:font-bold group-has-[:checked]:text-primary">
                          {opt.label}
                        </span>
                        <CheckCircle2 className="w-5 h-5 text-primary absolute right-4 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="seniority" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Cuántos años de experiencia tienes específicamente como{" "}
                    {watchRole}? <span className="text-rose-500">*</span>
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
                        className="relative flex items-center gap-3 p-4 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all bg-white group"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("yearsExperience", { required: true })}
                          className="w-5 h-5 accent-primary"
                        />
                        <span className="font-medium group-has-[:checked]:font-bold group-has-[:checked]:text-primary">
                          {opt}
                        </span>
                        <CheckCircle2 className="w-5 h-5 text-primary absolute right-4 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
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
                  {isOtherRole && (
                    <p className="text-xs text-muted-foreground -mt-1">
                      Selecciona las que apliquen o agrega las tuyas con el campo de texto.
                    </p>
                  )}
                  <div
                    key={`tech-stack-${watchRole}`}
                    className={`flex flex-wrap gap-3 ${errors.techStack ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {currentRoleOptions.techStack.filter(t => t !== "Otro").map((tech) => (
                      <label
                        key={tech}
                        className="relative flex items-center justify-center pl-4 pr-10 py-2.5 border-2 border-border/50 rounded-full cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all select-none bg-white group"
                      >
                        <input
                          type="checkbox"
                          value={tech}
                          {...register("techStack", {
                            validate: (value) =>
                              normalizeMulti(value).length > 0 ||
                              "Selecciona al menos una tecnología.",
                          })}
                          className="hidden peer"
                        />
                        <span className="font-bold text-sm text-foreground/80 peer-checked:text-primary">
                          {tech}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-primary absolute right-3 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                      </label>
                    ))}
                    {/* Custom tech chips */}
                    {customTechStack.map((tech) => (
                      <div
                        key={tech}
                        className="relative flex items-center justify-center pl-4 pr-10 py-2.5 border-2 border-primary rounded-full bg-primary/10 select-none group"
                      >
                        <span className="font-bold text-sm text-primary">{tech}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setCustomTechStack(prev => prev.filter(t => t !== tech));
                            const current = normalizeMulti(watch("techStack"));
                            setValue("techStack", current.filter((t: string) => t !== tech), {
                              shouldValidate: true,
                            });
                          }}
                          className="absolute right-3 text-primary hover:text-rose-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {/* "Otro" input */}
                    <div className="flex flex-col gap-1">
                      <input
                        type="text"
                        value={techInput}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const filtered = raw.replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑüÜ\s/.#+\-]/g, "");
                          if (raw !== filtered) {
                            setTechInputError(true);
                          } else {
                            setTechInputError(false);
                          }
                          setTechInput(filtered);
                        }}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const val = techInput.trim();
                            if (val && !customTechStack.includes(val)) {
                              setCustomTechStack(prev => [...prev, val]);
                              const current = normalizeMulti(watch("techStack"));
                              setValue("techStack", [...current, val], { shouldValidate: true });
                              setTechInput("");
                              setTechInputError(false);
                            }
                          }
                        }}
                        placeholder={isOtherRole ? "Ej. Kotlin, Terraform..." : "Otro..."}
                        className={`h-10 px-4 border-2 border-dashed rounded-full text-sm font-medium bg-white outline-none transition-all ${isOtherRole ? "w-48" : "w-32"} ${techInputError ? "border-rose-400 focus:border-rose-500" : "border-border/50 focus:border-primary focus:bg-primary/5"}`}
                      />
                      {techInputError && (
                        <span className="text-xs text-rose-500 pl-2">Solo letras</span>
                      )}
                    </div>
                  </div>
                  <ErrorMsg name="techStack" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Con qué herramientas complementas tu trabajo en el día a
                    día? <span className="text-rose-500">*</span>
                  </label>
                  {isOtherRole && (
                    <p className="text-xs text-muted-foreground -mt-1">
                      Selecciona las que apliquen o agrega las tuyas con el campo de texto.
                    </p>
                  )}
                  <div
                    key={`tools-${watchRole}`}
                    className={`flex flex-wrap gap-3 ${errors.tools ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {currentRoleOptions.tools.filter(t => t !== "Otra").map((tool) => (
                      <label
                        key={tool}
                        className="relative flex items-center justify-center pl-4 pr-10 py-2.5 border-2 border-border/50 rounded-full cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all select-none bg-white group"
                      >
                        <input
                          type="checkbox"
                          value={tool}
                          {...register("tools", {
                            validate: (value) =>
                              normalizeMulti(value).length > 0 ||
                              "Selecciona al menos una herramienta.",
                          })}
                          className="hidden peer"
                        />
                        <span className="font-bold text-sm text-foreground/80 peer-checked:text-primary">
                          {tool}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-primary absolute right-3 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                      </label>
                    ))}
                    {/* Custom tool chips */}
                    {customTools.map((tool) => (
                      <div
                        key={tool}
                        className="relative flex items-center justify-center pl-4 pr-10 py-2.5 border-2 border-primary rounded-full bg-primary/10 select-none group"
                      >
                        <span className="font-bold text-sm text-primary">{tool}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setCustomTools(prev => prev.filter(t => t !== tool));
                            const current = normalizeMulti(watch("tools"));
                            setValue("tools", current.filter((t: string) => t !== tool), {
                              shouldValidate: true,
                            });
                          }}
                          className="absolute right-3 text-primary hover:text-rose-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {/* "Otra" input */}
                    <div className="flex flex-col gap-1">
                      <input
                        type="text"
                        value={toolInput}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const filtered = raw.replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑüÜ\s/.#+\-]/g, "");
                          if (raw !== filtered) {
                            setToolInputError(true);
                          } else {
                            setToolInputError(false);
                          }
                          setToolInput(filtered);
                        }}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const val = toolInput.trim();
                            if (val && !customTools.includes(val)) {
                              setCustomTools(prev => [...prev, val]);
                              const current = normalizeMulti(watch("tools"));
                              setValue("tools", [...current, val], { shouldValidate: true });
                              setToolInput("");
                              setToolInputError(false);
                            }
                          }
                        }}
                        placeholder={isOtherRole ? "Ej. Figma, SAP..." : "Otra..."}
                        className={`h-10 px-4 border-2 border-dashed rounded-full text-sm font-medium bg-white outline-none transition-all ${isOtherRole ? "w-48" : "w-32"} ${toolInputError ? "border-rose-400 focus:border-rose-500" : "border-border/50 focus:border-primary focus:bg-primary/5"}`}
                      />
                      {toolInputError && (
                        <span className="text-xs text-rose-500 pl-2">Solo letras</span>
                      )}
                    </div>
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
                        className="relative flex items-center gap-2 p-3 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all bg-white group"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("englishLevel", { required: true })}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="font-medium text-sm group-has-[:checked]:font-bold group-has-[:checked]:text-primary">
                          {opt}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-primary absolute right-3 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
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
                        className="relative flex-1 flex items-center justify-center gap-2 p-4 border-2 border-border/50 rounded-2xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all text-center bg-white group"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("englishUsage", { required: true })}
                          className="hidden"
                        />
                        <span className="font-bold text-sm group-has-[:checked]:text-primary">
                          {opt}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-primary absolute right-3 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="englishUsage" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Dominas algún otro idioma?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`flex gap-4 ${errors.otherLanguages ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {["Sí", "No"].map((opt) => (
                      <label
                        key={opt}
                        className="relative flex-1 flex items-center justify-center gap-2 p-4 border-2 border-border/50 rounded-2xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all text-center group"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("otherLanguages", {
                            required: "Indica si dominas otro idioma.",
                          })}
                          className="hidden"
                        />
                        <span className="font-bold text-sm group-has-[:checked]:text-primary">
                          {opt}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-primary absolute right-3 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="otherLanguages" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿Cuál describe mejor tu rol actual?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  {isOtherRole ? (
                    <input
                      type="text"
                      placeholder="Describe brevemente tu rol (ej. Gestión de proyectos tech, Soporte técnico...)"
                      {...register("roleDescription", { required: "Por favor describe tu rol." })}
                      className={fieldClasses(
                        "roleDescription",
                        "w-full h-14 px-4 bg-muted/30 border-2 rounded-2xl outline-none focus:ring-4 transition-all",
                      )}
                    />
                  ) : (
                    <div
                      key={`role-desc-${watchRole}`}
                      className={`grid grid-cols-1 gap-3 ${errors.roleDescription ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                    >
                      {currentRoleOptions.roleDescriptions.map((opt) => (
                        <label
                          key={opt}
                          className="relative flex items-start gap-3 p-4 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all bg-white group"
                        >
                          <input
                            type="radio"
                            value={opt}
                            {...register("roleDescription", { required: true })}
                            className="w-5 h-5 accent-primary mt-0.5 shrink-0"
                          />
                          <span className="font-medium text-sm leading-tight pr-6 group-has-[:checked]:font-bold group-has-[:checked]:text-primary">
                            {opt}
                          </span>
                          <CheckCircle2 className="w-5 h-5 text-primary absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                        </label>
                      ))}
                    </div>
                  )}
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
                  <select
                    {...register("country", { required: true })}
                    className={fieldClasses(
                      "country",
                      "w-full h-12 sm:h-14 px-4 text-sm sm:text-base bg-muted/30 border-2 rounded-2xl outline-none focus:ring-4 transition-all",
                    )}
                  >
                    <option value="" disabled>
                      Selecciona tu país
                    </option>
                    {latamCountries.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
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
                    {countryCities.map((c) => (
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
                        className="relative flex-1 flex items-center justify-center gap-2 p-3 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all text-center bg-white group"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("workMode", { required: true })}
                          className="hidden"
                        />
                        <span className="font-bold text-sm group-has-[:checked]:text-primary">
                          {opt}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-primary absolute right-3 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
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
                        className="relative flex items-center gap-2 p-3 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all bg-white group"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("companyType", { required: true })}
                          className="w-4 h-4 accent-primary shrink-0"
                        />
                        <span className="font-medium text-sm leading-tight group-has-[:checked]:font-bold group-has-[:checked]:text-primary">
                          {opt}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-primary absolute right-3 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
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
                        className="relative flex items-center gap-2 p-3 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all bg-white group"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("contractType", { required: true })}
                          className="w-4 h-4 accent-primary shrink-0"
                        />
                        <span className="font-medium text-sm leading-tight group-has-[:checked]:font-bold group-has-[:checked]:text-primary">
                          {opt}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-primary absolute right-3 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
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
                        className="relative flex items-center gap-2 p-3 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all bg-white group"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("workSchedule", { required: true })}
                          className="w-4 h-4 accent-primary shrink-0"
                        />
                        <span className="font-medium text-sm leading-tight group-has-[:checked]:font-bold group-has-[:checked]:text-primary">
                          {opt}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-primary absolute right-3 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
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
                    <label className="relative flex-1 flex items-center justify-center gap-2 p-4 border-2 border-border/50 rounded-2xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all bg-white group">
                      <input
                        type="radio"
                        value="Local"
                        {...register("companyOrigin", { required: true })}
                        className="w-5 h-5 accent-primary hidden"
                      />
                      <span className="font-bold group-has-[:checked]:text-primary">
                        Local
                      </span>
                      <CheckCircle2 className="w-5 h-5 text-primary absolute right-4 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                    </label>
                    <label className="relative flex-1 flex items-center justify-center gap-2 p-4 border-2 border-border/50 rounded-2xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all bg-white group">
                      <input
                        type="radio"
                        value="Internacional"
                        {...register("companyOrigin", { required: true })}
                        className="w-5 h-5 accent-primary hidden"
                      />
                      <span className="font-bold group-has-[:checked]:text-primary">
                        Internacional
                      </span>
                      <CheckCircle2 className="w-5 h-5 text-primary absolute right-4 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
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
                  <p className="text-xs text-muted-foreground mt-2">
                    Puedes ingresar una estimación aproximada. Tus datos son
                    privados y solo se utilizan para generar tu análisis
                    salarial.
                  </p>
                  <ErrorMsg name="monthlySalary" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground">
                    ¿En qué moneda recibes tu salario?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${errors.currency ? "p-2 border-2 border-rose-500/50 rounded-2xl bg-rose-50/50" : ""}`}
                  >
                    {currencyOptions.map((opt) => (
                      <label
                        key={opt.code}
                        className="relative flex-1 flex items-center justify-center gap-2 p-3 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all text-center bg-white group"
                      >
                        <input
                          type="radio"
                          value={opt.code}
                          {...register("currency", { required: true })}
                          className="hidden"
                        />
                        <span className="font-bold text-sm group-has-[:checked]:text-primary">
                          {opt.label}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-primary absolute right-3 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
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
                        className="relative flex items-center justify-center gap-2 p-4 border-2 border-border/50 rounded-2xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all bg-white group"
                      >
                        <input
                          type="radio"
                          value={type}
                          {...register("salaryType", { required: true })}
                          className="hidden"
                        />
                        <span className="font-bold group-has-[:checked]:text-primary">
                          {type}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-primary absolute right-3 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
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
                        className="relative flex-1 flex items-center justify-center gap-2 p-4 border-2 border-border/50 rounded-2xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all bg-white group"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("hasBonus", { required: true })}
                          className="hidden"
                        />
                        <span className="font-bold group-has-[:checked]:text-primary">
                          {opt}
                        </span>
                        <CheckCircle2 className="w-5 h-5 text-primary absolute right-4 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
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
                        className="relative flex items-center gap-3 p-4 border-2 border-border/50 rounded-xl cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:shadow-sm transition-all bg-white group"
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...register("lastIncrease", { required: true })}
                          className="w-5 h-5 accent-primary shrink-0"
                        />
                        <span className="font-medium text-sm group-has-[:checked]:font-bold group-has-[:checked]:text-primary">
                          {opt}
                        </span>
                        <CheckCircle2 className="w-5 h-5 text-primary absolute right-4 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                      </label>
                    ))}
                  </div>
                  <ErrorMsg name="lastIncrease" />
                </div>

                <div className="space-y-4 pt-4">
                  <label
                    id="negotiation-confidence-label"
                    className="text-sm font-bold text-foreground block mb-3"
                  >
                    ¿Qué tan segura te sientes negociando tu salario hoy?{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div
                    className="flex flex-wrap justify-center sm:justify-between gap-2 sm:gap-3 max-w-xl mx-auto sm:max-w-none"
                    role="radiogroup"
                    aria-labelledby="negotiation-confidence-label"
                  >
                    {[1, 2, 3, 4, 5].map((level) => (
                      <label
                        key={level}
                        className="flex flex-col items-center gap-2 flex-1 min-w-[3.25rem] max-w-[4.5rem] cursor-pointer group"
                      >
                        <input
                          type="radio"
                          value={level}
                          {...register("negotiationConfidence", {
                            required: true,
                            valueAsNumber: true,
                          })}
                          className="sr-only peer"
                        />
                        <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-border/60 bg-white text-base font-black text-muted-foreground shadow-sm transition-all group-hover:border-primary/40 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 peer-focus-visible:ring-offset-2">
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="flex justify-between gap-4 text-[11px] sm:text-xs font-medium text-muted-foreground max-w-xl mx-auto sm:max-w-none pt-1">
                    <span className="max-w-[48%] text-left leading-snug">
                      Muy insegura y con miedo
                    </span>
                    <span className="max-w-[48%] text-right leading-snug">
                      Muy segura y confiada
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/50 pt-3 mt-2">
                    Escala Likert del 1 al 5: el <strong className="text-foreground font-semibold">1</strong>{" "}
                    corresponde a mucha inseguridad o miedo al negociar; el{" "}
                    <strong className="text-foreground font-semibold">5</strong>, a mucha seguridad y
                    confianza. Elige el valor que mejor refleje cómo te sientes{" "}
                    <strong className="text-foreground font-semibold">hoy</strong>: no hay respuestas
                    correctas ni incorrectas, solo queremos conocer tu punto de partida.
                  </p>
                  <ErrorMsg name="negotiationConfidence" />
                </div>
                <hr />
                <div className="mt-8 p-5 bg-primary/5 border border-primary/20 rounded-2xl">
                  <h4 className="font-bold text-foreground text-sm mb-2">
                    Tu análisis incluirá:
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      Tu rango salarial estimado
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      Comparación con el mercado tecnológico
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      Recomendaciones para negociar tu salario
                    </li>
                  </ul>
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
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between pt-8 mt-8 border-t border-border/50 gap-4 sm:gap-0">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 px-6 rounded-full bg-muted text-foreground font-bold hover:bg-muted/80 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Anterior
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceedToNext}
                title={
                  currentStep === 1 && !canProceedToNext ? step1Hint : undefined
                }
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 px-8 rounded-full bg-primary text-white font-extrabold text-lg shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all sm:ml-auto disabled:opacity-45 disabled:pointer-events-none disabled:cursor-not-allowed disabled:hover:translate-y-0"
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
                  ]);
                  if (isStepValid) {
                    handleSubmit(onSubmit)();
                  }
                }}
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 px-8 rounded-full bg-gradient-to-r from-primary to-accent text-white font-extrabold text-lg shadow-[0_0_20px_rgba(255,46,147,0.4)] hover:-translate-y-0.5 transition-all sm:ml-auto disabled:opacity-60 disabled:pointer-events-none"
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
