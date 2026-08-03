const cache = new Map<number, string>();

export async function getPoster(tmdbId: number) {
  if (cache.has(tmdbId)) {
    return cache.get(tmdbId)!;
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  );

  if (!res.ok) {
    throw new Error(`TMDb Error: ${res.status}`);
  }

  const movie = await res.json();

  const poster =
    "https://image.tmdb.org/t/p/w500" + movie.poster_path;

  cache.set(tmdbId, poster);

  return poster;
}