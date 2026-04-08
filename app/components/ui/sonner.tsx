"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

/** Tema fijo: evita desajuste de hidratación si se usa sin ThemeProvider (useTheme variaba SSR vs cliente). */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
