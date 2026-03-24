"use client";

import { cn } from "@/app/components/ui/utils";
import { useLanguage, type Locale } from "../providers/LanguageProvider";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "es", label: "ES" },
  { value: "en", label: "EN" },
];

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn("inline-flex items-center gap-2", className)}
      role="group"
      aria-label="Seleccionar idioma"
    >
    
      <div className="flex rounded-full p-1 bg-muted/60 border border-border/80 shadow-inner">
        {OPTIONS.map(({ value, label }) => {
          const active = locale === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setLocale(value)}
              className={cn(
                "relative min-w-[2.75rem] h-9 px-3 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200",
                active
                  ? "bg-foreground text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-pressed={active}
              aria-label={value === "es" ? "Español" : "English"}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
