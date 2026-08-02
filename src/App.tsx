import MovieGrid from "./components/MovieGrid";

function App() {
  return (
    <main className="min-h-screen bg-black p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-white">
          Marvel Timeline Checklist
        </h1>

        <MovieGrid />
      </div>
    </main>
  );
}

export default App;