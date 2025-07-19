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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isGenre = GENRES.includes(query.toLowerCase());
        const result = isGenre
          ? await fetchBooksByGenre(query)
          : await fetchBooks(query);
        setBooks(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [query]);

  return (
    <section className="px-4 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </section>
  );
}
