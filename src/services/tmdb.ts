const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export async function getMovie(id: number) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }

  return response.json();
}

export async function getTV(id: number) {
  const response = await fetch(
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch TV show");
  }

  return response.json();
}

export function getPoster(path: string) {
  return `https://image.tmdb.org/t/p/w500${path}`;
}

export function getBackdrop(path: string) {
  return `https://image.tmdb.org/t/p/original${path}`;
}