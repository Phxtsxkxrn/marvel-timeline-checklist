import type { Movie } from "../types/movie";

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-zinc-900 transition hover:scale-[1.02]">
      <img
        src={movie.poster}
        alt={movie.title}
        className="aspect-[2/3] w-full object-cover"
      />

      <div className="space-y-2 p-3">
        <h2 className="line-clamp-2 font-semibold text-white">
          {movie.title}
        </h2>

        <div className="flex items-center justify-between text-sm text-zinc-400">
          <span>{movie.year}</span>

          <span className="rounded-full bg-zinc-800 px-2 py-1 text-xs">
            {movie.type}
          </span>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;