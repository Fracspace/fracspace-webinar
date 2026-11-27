import "server-only";
import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var __sql: ReturnType<typeof postgres> | undefined;
}

export function getDatabase(): ReturnType<typeof postgres> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not defined in environment variables. Please configure the Supabase transaction pooler URL."
    );
  }

  // Transaction pooler (port 6543) requires prepare: false
  // Set max: 1 connection per serverless instance
  if (!globalThis.__sql) {
    globalThis.__sql = postgres(connectionString, {
      prepare: false,
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
    });
  }

  return globalThis.__sql;
}

/**
 * Lazy proxy client:
 * Allows `next build` to inspect and collect routes without throwing an error
 * when DATABASE_URL is not yet configured in build environments.
 * Connects on the first actual database query.
 */
export const sql: ReturnType<typeof postgres> = new Proxy(
  (() => {}) as unknown as ReturnType<typeof postgres>,
  {
    apply(_target, thisArg, argArray) {
      const client = getDatabase();
      return Reflect.apply(client as unknown as (...args: unknown[]) => unknown, thisArg, argArray);
    },
    get(_target, prop, receiver) {
      const client = getDatabase();
      return Reflect.get(client as unknown as object, prop, receiver);
    },
  }
);

export default sql;
