import { createClient, type Client } from "@libsql/client";

let client: Client | null = null;

function getDbClient(): Client {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error("TURSO_DATABASE_URL environment variable is not set");
  }

  client = createClient({ url, authToken });
  return client;
}

let schemaReady: Promise<void> | null = null;

function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getDbClient()
      .execute(
        `CREATE TABLE IF NOT EXISTS subscribers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL UNIQUE,
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )`,
      )
      .then(() => undefined);
  }
  return schemaReady;
}

export type Subscriber = {
  id: number;
  email: string;
  created_at: string;
};

export type AddSubscriberResult = "created" | "exists";

export async function addSubscriber(email: string): Promise<AddSubscriberResult> {
  await ensureSchema();
  const db = getDbClient();

  try {
    await db.execute({
      sql: "INSERT INTO subscribers (email) VALUES (?)",
      args: [email],
    });
    return "created";
  } catch (error) {
    if (error instanceof Error && /UNIQUE constraint failed/i.test(error.message)) {
      return "exists";
    }
    throw error;
  }
}

export async function listSubscribers(): Promise<Subscriber[]> {
  await ensureSchema();
  const db = getDbClient();
  const result = await db.execute(
    "SELECT id, email, created_at FROM subscribers ORDER BY created_at DESC",
  );

  return result.rows.map((row) => ({
    id: Number(row.id),
    email: String(row.email),
    created_at: String(row.created_at),
  }));
}

export async function countSubscribers(): Promise<number> {
  await ensureSchema();
  const db = getDbClient();
  const result = await db.execute("SELECT COUNT(*) as count FROM subscribers");
  return Number(result.rows[0]?.count ?? 0);
}
