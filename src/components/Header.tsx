function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <p className="text-sm text-zinc-400">
          Welcome Back 👋
        </p>

        <h1 className="mt-1 text-3xl font-bold text-white">
          Marvel Timeline
        </h1>
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-xl">
        🦸
      </div>
    </header>
  );
}

export default Header;