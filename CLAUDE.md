# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NegocIA+ is a Spanish-language salary negotiation tool targeting women in tech. Originally generated from Figma Make, it provides AI-powered salary analysis, pay gap visualization, and negotiation simulation.

## Commands

- `npm run dev` — Start Next.js dev server (Turbopack)
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run Next.js linter
- Install deps with `npm install --legacy-peer-deps` (needed for React 19 peer dep conflicts)

## Architecture

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Radix UI primitives

**Routing:** Next.js file-based routing under `app/`. Each route has its own folder with a `page.tsx`.

**Route flow:** `/` (Home) → `/salary-input` → `/reality-check` → `/professional-comparison` → `/career-growth` → `/pay-gap` → `/salary-impact` → `/negotiation-strategy` → `/simulator` → `/confidence-score`

**Layout:** `app/layout.tsx` (server component, root HTML) → `app/LayoutShell.tsx` (client component with header, footer, animated route transitions via Framer Motion).

**Shared state:** `app/providers/SalaryDataProvider.tsx` — React Context that replaces the old React Router `location.state` pattern. Stores profile form data, salary calculations, and gap percentages across pages. All interactive pages use `useSalaryData()` hook.

**UI components:** `app/components/ui/` contains shadcn/ui-style components built on Radix primitives. These are standard and rarely need modification.

**Styling:**
- Tailwind v4 with `@tailwindcss/postcss` plugin
- All styles consolidated in `app/globals.css` (fonts, Tailwind config, theme variables)
- Key colors: primary (`#FF2E93` Electric Magenta), secondary (`#3A0CA3` Deep Purple), accent (`#4361EE` Indigo)
- Fonts: Inter (body via `font-sans`), Sora (headings via `font-heading`)
- The `@` alias maps to project root (configured in `tsconfig.json`)

**Animations:** Uses `motion` (Framer Motion) extensively for page transitions and micro-interactions.

**Key conventions:**
- All UI text is in Spanish
- All page components are client components (`"use client"`) with default exports
- The simulator page (`/simulator`) gets full-height layout treatment without footer
- The old `src/` directory contains legacy Vite/React Router code (excluded from tsconfig)
