const WIKIPEDIA_API = 'https://fr.wikipedia.org/api/rest_v1/page/summary';
const WIKIPEDIA_EN_API = 'https://en.wikipedia.org/api/rest_v1/page/summary';

export async function lookupAuthor(name: string): Promise<{
  bio: string | null;
  photo_url: string | null;
  wikipedia_url: string | null;
}> {
  // Try French Wikipedia first, then English
  for (const api of [WIKIPEDIA_API, WIKIPEDIA_EN_API]) {
    try {
      const url = `${api}/${encodeURIComponent(name)}`;
      const res = await fetch(url);

      if (!res.ok) continue;

      const data = await res.json();

      if (data.type === 'disambiguation' || data.type === 'not_found') continue;

      return {
        bio: data.extract || null,
        photo_url: data.thumbnail?.source || null,
        wikipedia_url: data.content_urls?.desktop?.page || null,
      };
    } catch (error) {
      continue;
    }
  }

  return { bio: null, photo_url: null, wikipedia_url: null };
}
