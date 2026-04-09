"use client";

import { useCallback } from "react";
import { useLanguage } from "@/app/providers/LanguageProvider";
import { getMessage } from "./get-message";

export function useTranslation() {
  const { locale } = useLanguage();
  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) =>
      getMessage(locale, key, vars),
    [locale],
  );
  return { t, locale };
}
