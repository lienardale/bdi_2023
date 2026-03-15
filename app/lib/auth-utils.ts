import { auth } from '@/auth';

// Re-export pure helpers so existing imports keep working
export { getAdminEmails, isAdminEmail } from './admin-emails';

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
