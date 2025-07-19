import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-50 text-black px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">read-me</h1>
      <nav className="space-x-4">
        <Link to="/#" className="hover:underline">
          home
        </Link>
        <Link to="/search" className="hover:underline">
          search
        </Link>
        <Link to="/#" className="hover:underline">
          my library
        </Link>
      </nav>
    </header>
  );
}
