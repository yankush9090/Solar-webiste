import { Pool, QueryResult, QueryResultRow } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

export const isPostgresConfigured = (): boolean => {
  const dbUrl = process.env.DATABASE_URL;
  return !!(dbUrl && dbUrl.trim().length > 0);
};

function getHostedDatabaseConfigurationError(): string | null {
  const dbUrl = process.env.DATABASE_URL;
  if (!process.env.VERCEL || !dbUrl) return null;

  try {
    const hostname = new URL(dbUrl).hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
      return 'Vercel cannot connect to a database running on localhost. Set DATABASE_URL in Vercel to a hosted PostgreSQL connection string (for example, from Neon or Supabase), then redeploy.';
    }
  } catch {
    return 'DATABASE_URL is not a valid PostgreSQL connection URL. Update it in Vercel and redeploy.';
  }

  return null;
}

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
      dbUrl.includes('railway.app');

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
  const configurationError = getHostedDatabaseConfigurationError();
  if (configurationError) throw new Error(configurationError);

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

import { isSupabaseConfigured, getSupabaseAdmin } from '../supabase';

export async function testConnection(): Promise<{
  configured: boolean;
  connected: boolean;
  host: string;
  error?: string;
}> {
  // 1. Prefer Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from('site_settings').select('id').limit(1);
        if (!error) {
          let hostName = 'Supabase Cloud';
          try {
            hostName = `Supabase (${new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname})`;
          } catch {}
          return {
            configured: true,
            connected: true,
            host: hostName,
          };
        } else {
          return {
            configured: true,
            connected: false,
            host: 'Supabase Cloud',
            error: error.message,
          };
        }
      }
    } catch (err: any) {
      console.warn('Supabase test connection notice:', err);
    }
  }

  const configurationError = getHostedDatabaseConfigurationError();
  if (configurationError) {
    return {
      configured: true,
      connected: false,
      host: 'localhost (unreachable from Vercel)',
      error: configurationError,
    };
  }

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || dbUrl.trim().length === 0) {
    return {
      configured: false,
      connected: false,
      host: 'Not Configured (Supabase / DATABASE_URL missing)',
      error: 'Database is not configured. Set Supabase credentials or DATABASE_URL.',
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
