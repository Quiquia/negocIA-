import type { Locale } from "@/app/providers/LanguageProvider";
import { dictionaries } from "./dictionaries";

export function getMessage(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const raw = dictionaries[locale][key] ?? dictionaries.es[key] ?? key;
  if (!vars) return raw;
  let out = raw;
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{{${k}}}`).join(String(v));
  }
  return out;
}
