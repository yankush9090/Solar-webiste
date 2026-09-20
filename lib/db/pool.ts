import { Pool, QueryResult, QueryResultRow } from 'pg';

const databaseUrl = process.env.DATABASE_URL;

export const isPostgresConfigured = (): boolean => {
  return !!(databaseUrl && databaseUrl.trim().length > 0);
};

// Singleton connection pool instance
declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

let pool: Pool | null = null;

if (isPostgresConfigured()) {
  if (!global._pgPool) {
    global._pgPool = new Pool({
      connectionString: databaseUrl,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  pool = global._pgPool;
}

export { pool };

export async function query<R extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<R> | null> {
  if (!pool) return null;
  try {
    return await pool.query<R>(text, params);
  } catch (err) {
    console.warn('PostgreSQL query execution notice:', (err as Error).message);
    return null;
  }
}
