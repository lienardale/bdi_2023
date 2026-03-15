export async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BDI-Bot/1.0)',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) return null;

    const html = await res.text();
    const match = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)
      || html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i);

    return match?.[1] || null;
  } catch {
    return null;
  }
}
