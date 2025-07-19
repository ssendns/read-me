import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <main className="min-h-screen bg-bg text-text flex flex-col justify-center items-center px-layoutX py-layoutY font-typewriter">
      <h1 className="text-6xl font-bold mb-6">404</h1>
      <p className="text-lg text-muted mb-8">
        sorry, we could not find that page
      </p>
      <Link
        to="/"
        className="bg-accent px-6 py-2 rounded hover:bg-accenthover transition"
      >
        back home
      </Link>
    </main>
  );
}
