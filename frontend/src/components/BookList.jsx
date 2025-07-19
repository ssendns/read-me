import { useEffect, useState } from "react";
import { fetchBooks } from "../services/openLibrary";
import BookCard from "./BookCard";

export default function BookList({ query = "harry potter" }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks(query).then(setBooks).catch(console.error);
  }, [query]);

  return (
    <section className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 ml-2">discover books</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </section>
  );
}
