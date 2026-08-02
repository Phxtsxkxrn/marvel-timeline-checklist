import Header from "../components/Header";
import MovieGrid from "../components/MovieGrid";
import ProgressCard from "../components/ProgressCard";

function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Header />

        <ProgressCard />

        <MovieGrid />
      </div>
    </main>
  );
}

export default Home;