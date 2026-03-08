---
name: supabase
description: Skill for managing Supabase integration — database schemas, queries, server actions, RLS policies, and client configuration in this Next.js project.
---

# Supabase Management

Manage all Supabase-related code and database operations for Salary Sister AI.

## Scope

**Use for:** Database schema changes, server actions with Supabase, RLS policies, migrations, client setup, queries, type definitions, and debugging Supabase errors.

**Not for:** UI/form design (use `/interface-design`), general Next.js routing, or non-database logic.

---

# Project Setup

## Client Configuration

- **File:** `src/lib/supabase.ts`
- **Client type:** Server-side only (uses `SUPABASE_SECRET_KEY`)
- **Usage:** Import in server actions and API routes only — never in client components

## Environment Variables

Defined in `.env.local`, template in `.env.example`:

| Variable | Usage |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (public) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Anon/publishable key (unused currently) |
| `SUPABASE_SECRET_KEY` | Service role key — server-side only |

## Type Definitions

- **File:** `src/types/database.ts`
- All database types live here
- Export both the full interface and an `Insert` type (omitting `id` and `created_at`)

---

# Database Schema

## Table: `salary_submissions`

Primary table for salary survey data. See `FIELD_MAPPING.md` for field details.

| Column | Type | Nullable | Default |
|---|---|---|---|
| `id` | uuid | NO | `gen_random_uuid()` |
| `created_at` | timestamptz | NO | `now()` |
| `accepted_terms` | boolean | NO | `false` |
| `role_area` | text | YES | — |
| `seniority` | text | YES | — |
| `frontend_years_experience` | text | YES | — |
| `main_technology` | text | YES | — |
| `technical_skills` | text | YES | — |
| `english_level` | text | YES | — |
| `uses_english_current_job` | text | YES | — |
| `role_description` | text | YES | — |
| `country` | text | YES | — |
| `city` | text | YES | — |
| `work_mode` | text | YES | — |
| `company_type` | text | YES | — |
| `employment_type` | text | YES | — |
| `work_schedule` | text | YES | — |
| `company_scope` | text | YES | — |
| `monthly_salary_amount` | numeric(12,2) | YES | — |
| `salary_currency` | text | YES | — |
| `salary_type` | text | YES | — |
| `has_variable_compensation` | boolean | YES | — |
| `last_raise_period` | text | YES | — |
| `negotiation_confidence` | text | YES | — |
| `wants_salary_negotiation_practice` | boolean | YES | — |

---

# Conventions

## Server Actions

- All Supabase operations go in `actions.ts` files inside the relevant route folder
- Always use `"use server"` directive
- Return `{ success: boolean; error?: string }` from mutation actions
- Use `FormData` for form submissions, converting values with proper null handling
- For nullable fields: `(formData.get("field") as string) || null`
- For booleans from checkboxes: `formData.get("field") === "on"`
- For numbers: check existence before `Number()`, otherwise `null`

```typescript
// Pattern for server actions
"use server";
import { supabase } from "@/lib/supabase";
import type { SomeInsertType } from "@/types/database";

export async function submitData(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const data: SomeInsertType = {
    // map fields...
  };

  const { error } = await supabase.from("table_name").insert(data);

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
```

## Type Definitions

- One interface per table, named in PascalCase matching the table concept
- Create `Insert` type using `Omit<T, "id" | "created_at">`
- Nullable columns use `type | null`
- Auto-generated columns (`id`, `created_at`) use `?` optional modifier

```typescript
export interface TableName {
  id?: string;
  created_at?: string;
  required_field: string;
  optional_field: string | null;
}

export type TableNameInsert = Omit<TableName, "id" | "created_at">;
```

## Queries

- Always destructure `{ data, error }` from Supabase calls
- Handle errors explicitly — never silently ignore
- Use `.select()` to specify columns when reading
- Use `.single()` when expecting exactly one row

---

# Adding a New Table

1. Create the table in Supabase dashboard or via SQL
2. Add the interface and insert type in `src/types/database.ts`
3. Create the server action in the appropriate route's `actions.ts`
4. Update this skill's schema section

---

# Common Queries

```typescript
// Insert
const { error } = await supabase.from("table").insert(data);

// Select all
const { data, error } = await supabase.from("table").select("*");

// Select with filter
const { data, error } = await supabase
  .from("table")
  .select("column1, column2")
  .eq("column", value);

// Select single row
const { data, error } = await supabase
  .from("table")
  .select("*")
  .eq("id", id)
  .single();

// Update
const { error } = await supabase
  .from("table")
  .update({ column: newValue })
  .eq("id", id);

// Delete
const { error } = await supabase.from("table").delete().eq("id", id);

// Aggregation / count
const { count, error } = await supabase
  .from("table")
  .select("*", { count: "exact", head: true });
```

---

# Debugging

- **"relation does not exist"** → Table name mismatch. Check Supabase dashboard.
- **"permission denied"** → RLS is enabled but no policy allows the operation. Use service role key or add a policy.
- **"null value in column violates not-null constraint"** → A required field is missing. Check the `NOT NULL` columns.
- **"invalid input syntax for type numeric"** → Passing a string to a numeric column. Use `Number()` conversion.
- **Insert succeeds but data doesn't appear** → Check if RLS `SELECT` policy exists.

---

# Commands

- `/supabase:schema` — Show current database schema
- `/supabase:types` — Regenerate TypeScript types from current schema
- `/supabase:action` — Scaffold a new server action for a table
- `/supabase:debug` — Diagnose a Supabase error
