import { movies } from "../data/movies";

function ProgressCard() {
  const watched = movies.filter((movie) => movie.watched).length;

  const total = movies.length;

  const progress = Math.round((watched / total) * 100);

  return (
    <section className="mb-8 rounded-3xl bg-gradient-to-r from-red-600 to-red-500 p-6 text-white shadow-lg">
      <p className="text-sm opacity-80">
        Watching Progress
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        {progress}%
      </h2>

      <p className="mt-1 text-sm">
        {watched} / {total} Titles Watched
      </p>
    </section>
  );
}

export default ProgressCard;