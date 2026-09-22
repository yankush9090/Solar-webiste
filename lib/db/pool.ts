import { Pool, QueryResult, QueryResultRow } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

export const isPostgresConfigured = (): boolean => {
  const dbUrl = process.env.DATABASE_URL;
  return !!(dbUrl && dbUrl.trim().length > 0);
};

export function getPool(): Pool | null {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || dbUrl.trim().length === 0) {
    return null;
  }

  if (!global._pgPool) {
    const isLocalhost = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1');
    const isSslRequired =
      !isLocalhost ||
      dbUrl.includes('sslmode=require') ||
      dbUrl.includes('supabase') ||
      dbUrl.includes('neon.tech') ||
      dbUrl.includes('render.com') ||
      dbUrl.includes('railway.app') ||
      process.env.NODE_ENV === 'production';

    global._pgPool = new Pool({
      connectionString: dbUrl,
      ssl: isSslRequired ? { rejectUnauthorized: false } : undefined,
      max: process.env.NODE_ENV === 'production' ? 5 : 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    global._pgPool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client pool:', err);
    });
  }

  return global._pgPool;
}

export async function query<R extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<R> | null> {
  const poolInstance = getPool();
  if (!poolInstance) {
    console.warn('PostgreSQL query skipped: DATABASE_URL is not defined in environment variables.');
    return null;
  }
  try {
    return await poolInstance.query<R>(text, params);
  } catch (err: any) {
    console.error('PostgreSQL query execution error:', err.message || err);
    throw err; // Propagate error so server actions and caller are aware of the database failure
  }
}

export async function testConnection(): Promise<{
  configured: boolean;
  connected: boolean;
  host: string;
  error?: string;
}> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || dbUrl.trim().length === 0) {
    return {
      configured: false,
      connected: false,
      host: 'Not Configured (DATABASE_URL missing)',
      error: 'DATABASE_URL environment variable is not defined on this server.',
    };
  }

  let sanitizedHost = 'configured';
  try {
    const parsed = new URL(dbUrl);
    sanitizedHost = `${parsed.hostname}${parsed.port ? `:${parsed.port}` : ''}/${parsed.pathname.replace('/', '')}`;
  } catch {
    sanitizedHost = 'custom-db-host';
  }

  try {
    const poolInstance = getPool();
    if (!poolInstance) {
      return {
        configured: true,
        connected: false,
        host: sanitizedHost,
        error: 'Failed to create PostgreSQL client pool.',
      };
    }
    const res = await poolInstance.query('SELECT NOW() as current_time');
    return {
      configured: true,
      connected: !!(res && res.rows.length > 0),
      host: sanitizedHost,
    };
  } catch (err: any) {
    return {
      configured: true,
      connected: false,
      host: sanitizedHost,
      error: err.message || 'Connection to PostgreSQL failed.',
    };
  }
}
