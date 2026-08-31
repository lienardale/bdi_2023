/**
 * OAuth callbacks on preview deployments.
 *
 * Google only accepts redirect URIs that are registered exactly, and a preview
 * deployment's host contains a per-build hash that changes on every push, so a
 * preview can never receive the callback directly.
 *
 * Auth.js's redirect proxy solves this: the provider is handed the *production*
 * callback URL — the one URI Google has registered — and the production
 * deployment forwards the result back to whichever preview started the flow.
 * Both deployments share AUTH_SECRET (it is one project-level variable), which
 * is what lets production hand the session back safely.
 *
 * See https://authjs.dev/getting-started/deployment#securing-a-preview-deployment
 */

// The named keys document what is read; the index signature is what makes
// `process.env` (a bare Record) assignable without a cast at the call site.
type ProxyEnv = {
  VERCEL_ENV?: string;
  AUTH_REDIRECT_PROXY_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
} & Record<string, string | undefined>;

/**
 * The proxy URL to use, or `undefined` to leave Auth.js's default behaviour
 * alone.
 *
 * Only preview deployments proxy. Production must not — it *is* the proxy, and
 * pointing it at itself would loop. Local development is untouched too, so
 * http://localhost:3000 keeps working as before.
 *
 * The domain this resolves to is the one that must be registered in the Google
 * console as an authorized redirect URI, with `/api/auth/callback/google`
 * appended. Set AUTH_REDIRECT_PROXY_URL explicitly to override it — for
 * instance if the registered URI is a *.vercel.app alias rather than the custom
 * domain Vercel reports here.
 */
export function resolveRedirectProxyUrl(env: ProxyEnv): string | undefined {
  if (env.VERCEL_ENV !== 'preview') return undefined;

  const explicit = env.AUTH_REDIRECT_PROXY_URL?.trim();
  if (explicit) return explicit;

  const productionHost = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (!productionHost) return undefined;

  // Vercel reports a bare host; Auth.js wants the full path it is mounted at.
  return `https://${productionHost}/api/auth`;
}
