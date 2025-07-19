import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-bg text-text px-layoutX py-layoutY border-b border-color-border flex justify-between items-center font-typewriter">
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
