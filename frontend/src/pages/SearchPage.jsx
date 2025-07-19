import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import Header from "../components/Header";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-bg min-h-screen">
      <Header />
      <main className="text-center bg-bg py-layoutY">
        <SearchBar onSearch={setQuery} />
        {query && <BookList query={query} />}
      </main>
    </div>
  );
}
