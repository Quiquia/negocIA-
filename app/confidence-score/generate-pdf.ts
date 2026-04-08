import jsPDF from "jspdf";
import type { ConfidenceResult } from "./actions";

type PdfData = {
  result: ConfidenceResult;
  profile: {
    role: string;
    seniority: string;
    techStack: string;
    country: string;
    currentSalary: string;
    marketSalary: string;
    gapPercentage: number;
  };
};

export function generateNegotiationPDF({ result, profile }: PdfData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // --- Colors ---
  const pink: [number, number, number] = [255, 46, 147];
  const purple: [number, number, number] = [58, 12, 163];
  const indigo: [number, number, number] = [67, 97, 238];
  const dark: [number, number, number] = [30, 30, 40];
  const gray: [number, number, number] = [100, 116, 139];
  const green: [number, number, number] = [22, 163, 74];
  const amber: [number, number, number] = [217, 119, 6];

  // --- Header bar ---
  doc.setFillColor(...pink);
  doc.rect(0, 0, pageWidth, 8, "F");

  // Gradient-like accent line
  doc.setFillColor(...indigo);
  doc.rect(pageWidth / 2, 0, pageWidth / 2, 8, "F");

  y = 24;

  // --- Title ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(...purple);
  doc.text("NegocIA+", margin, y);

  doc.setFontSize(10);
  doc.setTextColor(...gray);
  doc.text("Tu plan personalizado de negociación salarial", margin, y + 8);

  const today = new Date().toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  doc.setFontSize(9);
  doc.text(today, pageWidth - margin, y + 8, { align: "right" });

  y += 20;

  // --- Separator ---
  doc.setDrawColor(230, 230, 235);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // --- Profile section ---
  doc.setFillColor(248, 247, 255);
  doc.roundedRect(margin, y, contentWidth, 42, 4, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...purple);
  doc.text("Tu perfil profesional", margin + 8, y + 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...dark);

  const profileLines = [
    `Rol: ${profile.role} ${profile.seniority}    |    Stack: ${profile.techStack}`,
    `País: ${profile.country}    |    Salario actual: ${profile.currentSalary}    |    Mercado: ${profile.marketSalary}`,
    `Brecha salarial: ${profile.gapPercentage}% ${profile.gapPercentage > 0 ? "por debajo del mercado" : "al nivel del mercado"}`,
  ];

  profileLines.forEach((line, i) => {
    doc.text(line, margin + 8, y + 20 + i * 7);
  });

  y += 52;

  // --- Overall Score ---
  doc.setFillColor(...pink);
  doc.roundedRect(margin, y, contentWidth, 30, 4, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("Nivel de preparación general", margin + 10, y + 13);

  doc.setFontSize(28);
  doc.text(`${result.overall_score}%`, pageWidth - margin - 10, y + 20, {
    align: "right",
  });

  y += 40;

  // --- Score breakdown ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...dark);
  doc.text("Desglose de puntuación", margin, y);
  y += 10;

  const scoreItems = [
    { label: "Confianza al negociar", score: result.confidence_score, color: pink },
    { label: "Claridad al comunicar valor", score: result.clarity_score, color: purple },
    { label: "Posicionamiento salarial", score: result.positioning_score, color: indigo },
  ];

  scoreItems.forEach((item) => {
    // Background bar
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, y, contentWidth, 14, 3, 3, "F");

    // Progress bar
    const barWidth = (item.score / 100) * (contentWidth - 50);
    doc.setFillColor(...item.color);
    doc.roundedRect(margin, y, Math.max(barWidth, 8), 14, 3, 3, "F");

    // Label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(item.label, margin + 6, y + 9);

    // Score
    doc.setTextColor(...dark);
    doc.text(`${item.score}%`, pageWidth - margin - 4, y + 9, {
      align: "right",
    });

    y += 19;
  });

  y += 5;

  // --- AI Summary ---
  doc.setFillColor(255, 244, 249);
  const summaryLines = doc.splitTextToSize(result.summary, contentWidth - 16);
  const summaryHeight = summaryLines.length * 6 + 14;
  doc.roundedRect(margin, y, contentWidth, summaryHeight, 4, 4, "F");

  doc.setFillColor(...pink);
  doc.rect(margin, y, 4, summaryHeight, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...pink);
  doc.text("Mensaje de tu coach IA", margin + 10, y + 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...dark);
  doc.text(summaryLines, margin + 10, y + 18);

  y += summaryHeight + 8;

  // --- Strengths & Improvements side by side ---
  const colWidth = (contentWidth - 8) / 2;
  /** Altura de línea coherente con helvetica 9 (~4.5–5 mm entre baselines). */
  const lineH = 5;
  /** Espacio bajo el último renglón dentro de la caja (antes casi no había). */
  const padBottom = 18;
  /** Desde el borde superior de la caja hasta la baseline del primer bullet. */
  const contentTop = 20;

  const strengthTexts = result.strengths.map((s) =>
    doc.splitTextToSize(`• ${s}`, colWidth - 14)
  );
  const strengthTotalLines = strengthTexts.reduce(
    (acc, lines) => acc + lines.length,
    0
  );

  const improvTexts = result.improvements.map((s) =>
    doc.splitTextToSize(`• ${s}`, colWidth - 14)
  );
  const improvTotalLines = improvTexts.reduce(
    (acc, lines) => acc + lines.length,
    0
  );

  const strengthHeight = contentTop + strengthTotalLines * lineH + padBottom;
  const improvHeight = contentTop + improvTotalLines * lineH + padBottom;
  const boxHeight = Math.max(strengthHeight, improvHeight);

  const pageH = doc.internal.pageSize.getHeight();
  /** Zona reservada: línea + texto pie + hueco + barra (evita cajas pegadas al footer). */
  const footerZone = 32;
  if (y + boxHeight + footerZone > pageH) {
    doc.addPage();
    y = margin;
  }

  doc.setFillColor(240, 253, 244);
  doc.roundedRect(margin, y, colWidth, boxHeight, 4, 4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...green);
  doc.text("Fortalezas", margin + 8, y + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(30, 80, 30);
  let sy = y + contentTop;
  strengthTexts.forEach((lines) => {
    doc.text(lines, margin + 8, sy);
    sy += lines.length * lineH;
  });

  const rightX = margin + colWidth + 8;
  doc.setFillColor(255, 251, 235);
  doc.roundedRect(rightX, y, colWidth, boxHeight, 4, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...amber);
  doc.text("Áreas de mejora", rightX + 8, y + 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120, 70, 0);
  let iy = y + contentTop;
  improvTexts.forEach((lines) => {
    doc.text(lines, rightX + 8, iy);
    iy += lines.length * lineH;
  });

  y += boxHeight + 14;

  // --- Footer ---
  doc.setDrawColor(230, 230, 235);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(...gray);
  doc.text(
    "Generado por NegocIA+ — Tu herramienta de negociación salarial con IA",
    pageWidth / 2,
    y,
    { align: "center" }
  );

  doc.setFillColor(...indigo);
  doc.rect(0, pageH - 8, pageWidth, 4, "F");

  // --- Download ---
  doc.save("mi-plan-de-negociacion-negocia.pdf");
}
