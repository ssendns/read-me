import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-50 text-black px-6 py-4 shadow-md flex justify-between items-center">
      <Link to="/" className="hover:underline font-bold text-xl">
        read-me
      </Link>
      <nav className="space-x-4">
        <Link to="/search" className="hover:underline">
          search
        </Link>
        <Link to="/search" className="hover:underline">
          my library
        </Link>
        <Link to="/#" className="hover:underline">
          account
        </Link>
      </nav>
    </header>
  );
}
