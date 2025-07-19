import { useEffect, useState } from "react";
import { fetchBooks, fetchBooksByGenre } from "../services/openLibrary";
import BookCard from "./BookCard";

const GENRES = [
  "fiction",
  "non-fiction",
  "romance",
  "fantasy",
  "science fiction",
  "detectives",
  "historical",
  "biography",
  "thriller",
  "horror",
  "poetry",
];

export default function BookList({ query = "harry potter" }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const isGenre = GENRES.includes(query.toLowerCase());
        const result = isGenre
          ? await fetchBooksByGenre(query)
          : await fetchBooks(query);
        setBooks(result);
      } catch (err) {
        console.error(err);
        setError("failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (loading) {
    return (
      <section className="text-center py-10 text-muted font-typewriter">
        loading books...
      </section>
    );
  }

  if (error) {
    return (
      <section className="text-center py-10 text-red-600 font-typewriter">
        {error}
      </section>
    );
  }

  if (books.length === 0) {
    return (
      <section className="text-center py-10 text-muted font-typewriter">
        no books found
      </section>
    );
  }

  return (
    <section className="px-layoutX py-layoutY bg-bg text-text font-typewriter">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </section>
  );
}
