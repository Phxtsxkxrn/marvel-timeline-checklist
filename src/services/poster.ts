const cache = new Map<string, string>();

export async function getPoster(
  tmdbId: number,
  type: "movie" | "series" | "special"
) {
  const mediaType = type === "movie" ? "movie" : "tv";

  const key = `${mediaType}-${tmdbId}`;

  if (cache.has(key)) {
    return cache.get(key)!;
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${tmdbId}?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }`
  );

  if (!res.ok) {
    throw new Error(`TMDb Error ${res.status}`);
  }

  const data = await res.json();

  const poster =
    "https://image.tmdb.org/t/p/w500" + data.poster_path;

  cache.set(key, poster);

  return poster;
}