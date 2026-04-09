/** Mismo resultado en SSR (Node) y en el navegador — evita errores de hidratación. */
export function formatEsInteger(n: number): string {
  return n.toLocaleString("es-ES", { maximumFractionDigits: 0 });
}

/** Gráficas / tooltips con posibles decimales. */
export function formatEsNumber(n: number): string {
  return n.toLocaleString("es-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
