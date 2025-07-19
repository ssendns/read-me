import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import Header from "../components/Header";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <>
      <Header />
      <main className="min-h-screen px-6 py-10">
        <SearchBar onSearch={setQuery} />
        {query && <BookList query={query} />}
      </main>
    </>
  );
}
