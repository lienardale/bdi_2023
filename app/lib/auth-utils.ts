import { auth } from '@/auth';

// Re-export pure helpers so existing imports keep working
export { getAdminEmails, isAdminEmail } from './admin-emails';

const IMPORT_EMAIL = 'alienard.dev@gmail.com';

export async function requireAdmin(): Promise<void> {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }
}

export async function requireAdminApi(): Promise<Response | null> {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return null;
}

export async function requireImportApi(): Promise<Response | null> {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (session.user.email !== IMPORT_EMAIL) {
    return new Response(JSON.stringify({ error: 'Import restricted' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return null;
}

export async function canImport(): Promise<boolean> {
  const session = await auth();
  return session?.user?.email === IMPORT_EMAIL;
}
