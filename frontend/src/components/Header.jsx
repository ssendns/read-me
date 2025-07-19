import { Link } from "react-router-dom";

export default function Header() {
  const username = localStorage.getItem("username");
  const isLoggedIn = Boolean(username);

  return (
    <header className="bg-bg text-text px-layoutX py-layoutY border-b border-color-border flex justify-between items-center font-typewriter">
      <nav className="space-x-4">
        <Link to="/" className="hover:underline font-bold text-xl">
          read-me
        </Link>
        <Link to="/#" className="hover:underline">
          about
        </Link>
      </nav>
      <nav className="space-x-4">
        <Link to="/search" className="hover:underline">
          search
        </Link>
        {isLoggedIn ? (
          <>
            <Link to="/#" className="hover:underline">
              my library
            </Link>
            <span className="hover:underline">@{username}</span>
          </>
        ) : (
          <>
            <Link to="/log-in" className="hover:underline">
              log in
            </Link>
            <Link to="/sign-up" className="hover:underline">
              sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
