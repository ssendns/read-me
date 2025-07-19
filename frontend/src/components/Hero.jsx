import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="text-center py-section  border-b border-color-border">
      <h2 className="text-4xl font-bold mb-4 font-primary">
        nothing beats a good book
      </h2>
      <Link
        to="/search"
        className="text-lg text-muted hover:underline font-primary"
      >
        explore now
      </Link>
    </section>
  );
}
