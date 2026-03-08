/**
 * Cliente de Featherless AI — solo para uso en el servidor.
 *
 * Featherless es compatible con el SDK de OpenAI.
 * Solo cambia la base URL y la API key.
 *
 * Usa la variable de entorno FEATHERLESS_API_KEY.
 * Nunca importar este archivo en componentes del cliente ("use client").
 *
 * El cliente se crea de forma lazy para evitar errores en build
 * cuando la variable de entorno aún no existe.
 *
 * @see https://featherless.ai/docs/quickstart-guide
 */
import OpenAI from "openai";

let _client: OpenAI | null = null;

export function getFeatherless(): OpenAI {
  if (!_client) {
    _client = new OpenAI({
      baseURL: "https://api.featherless.ai/v1",
      apiKey: process.env.FEATHERLESS_API_KEY,
    });
  }
  return _client;
}
