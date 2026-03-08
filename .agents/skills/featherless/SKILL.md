---
name: featherless
description: Skill for using Featherless AI — an OpenAI-compatible API that serves 6,700+ open-source models from Hugging Face. Use for LLM integration, model selection, and API configuration.
---

# Featherless AI

Manage all Featherless AI integration in Salary Sister AI.

## Scope

**Use for:** LLM API calls, model selection, prompt engineering, debugging AI responses.

**Not for:** Database operations (use `/supabase`), UI design (use `/interface-design`).

---

# What is Featherless AI?

Featherless is a serverless LLM hosting platform that provides access to 6,700+ open-source models from Hugging Face through an **OpenAI-compatible API**. This means you can use the standard OpenAI SDK — just change the base URL and API key.

---

# Project Setup

## Client Configuration

- **File:** `src/lib/featherless.ts`
- **Client:** Uses OpenAI SDK with custom `baseURL`
- **Pattern:** Lazy singleton via `getFeatherless()` (avoids build errors when key is missing)
- **Usage:** Server-side only — never import in `"use client"` components

```typescript
import { getFeatherless } from "@/lib/featherless";

const response = await getFeatherless().chat.completions.create({
  model: "deepseek-ai/DeepSeek-R1",
  messages: [{ role: "user", content: "Hola" }],
});
```

## Environment Variable

| Variable | Value |
|---|---|
| `FEATHERLESS_API_KEY` | Your API key from https://featherless.ai |

Add to `.env.local`. Template in `.env.example`.

---

# API Reference

## Base URL

```
https://api.featherless.ai/v1
```

## Authentication

Bearer token via `apiKey` in the OpenAI SDK constructor. The SDK handles the `Authorization: Bearer <key>` header automatically.

## Endpoints (OpenAI-compatible)

| Endpoint | Method | Description |
|---|---|---|
| `/chat/completions` | POST | Chat completions (main endpoint) |
| `/completions` | POST | Text completions |
| `/models` | GET | List available models |

## Request Parameters

Same as OpenAI:
- `model` — Model ID (Hugging Face format: `org/model-name`)
- `messages` — Array of `{ role, content }` objects
- `temperature` — 0.0 to 2.0 (lower = more consistent)
- `max_tokens` — Maximum tokens in response
- `top_p` — Nucleus sampling
- `stream` — Boolean for streaming responses

---

# Models

## Current Model in Use

**`deepseek-ai/DeepSeek-R1`** — 671B parameters, the most advanced open-source model.

### DeepSeek-R1 Quirks

- May include `<think>...</think>` blocks before the actual response (chain of thought)
- Our `salary-estimator.ts` strips these automatically
- Good at following JSON output instructions
- Slower than smaller models but more accurate

## Alternative Models (if you need speed)

| Model ID | Parameters | Best for |
|---|---|---|
| `Qwen/Qwen2.5-72B-Instruct` | 72B | Fast, great with JSON, good Spanish |
| `meta-llama/Llama-3.3-70B-Instruct` | 70B | Strong reasoning, good instructions |
| `Qwen/Qwen2.5-7B-Instruct` | 7B | Very fast, good for simple tasks |

To change the model, edit the `MODEL` constant in `src/lib/salary-estimator.ts`.

## Model ID Format

Featherless uses Hugging Face model IDs: `organization/model-name`

Browse all models at: https://featherless.ai/models

---

# Usage in This Project

## Salary Estimator

- **File:** `src/lib/salary-estimator.ts`
- **Function:** `estimateSalary(profile: SalarySubmission): Promise<SalaryEstimate>`
- **Returns:** `{ estimated_salary, currency, gap_percentage, gap_direction, summary }`

### How it works

1. `buildPrompt()` takes the user's profile and creates a detailed prompt
2. Sends to Featherless via the OpenAI SDK
3. Cleans the response (strips `<think>` tags, markdown code blocks)
4. Extracts and parses the JSON object
5. Returns typed `SalaryEstimate`

### Adding a new AI feature

Follow this pattern:

```typescript
import { getFeatherless } from "@/lib/featherless";

const MODEL = "deepseek-ai/DeepSeek-R1";

export async function myNewFeature(input: MyInput): Promise<MyOutput> {
  // 1. Build the prompt
  const prompt = `...`;

  // 2. Call the API
  const response = await getFeatherless().chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: "Tu rol..." },
      { role: "user", content: prompt },
    ],
    temperature: 0.3,
    max_tokens: 500,
  });

  // 3. Clean and parse
  let content = response.choices[0]?.message?.content ?? "";
  content = content.replace(/<think>[\s\S]*?<\/think>/g, "");
  content = content.replace(/```json\n?|```\n?/g, "");

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON in response");

  return JSON.parse(jsonMatch[0]);
}
```

---

# Debugging

- **Empty response** → Check `FEATHERLESS_API_KEY` is set in `.env.local`
- **401 error** → API key is invalid or expired. Generate a new one at https://featherless.ai
- **429 error** → Rate limit hit. Upgrade plan or switch to a smaller model
- **JSON parse error** → The model didn't return valid JSON. Check the raw `content` in logs. Try lowering `temperature` or using a more capable model
- **`<think>` blocks in response** → Normal for DeepSeek-R1. The estimator strips them automatically
- **Slow responses** → DeepSeek-R1 (671B) is large. Switch to `Qwen/Qwen2.5-72B-Instruct` for faster responses

---

# Pricing

- **Free tier:** Limited requests for testing
- **Pro plans:** Higher concurrency and priority queuing
- Costs scale with model size — smaller models are cheaper
- Check current pricing at https://featherless.ai

---

# Commands

- `/featherless:models` — List recommended models for different use cases
- `/featherless:test` — Test the API connection with a simple prompt
- `/featherless:debug` — Diagnose a Featherless API error
