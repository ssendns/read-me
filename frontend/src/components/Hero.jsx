import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="text-center py-16">
      <h2 className="text-4xl font-bold mb-4">nothing beats a good book</h2>
      <Link to="/search" className="text-lg text-gray-700 hover:underline">
        explore now
      </Link>
    </section>
  );
}
