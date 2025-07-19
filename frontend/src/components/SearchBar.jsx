import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center py-layoutY bg-bg"
    >
      <input
        type="text"
        placeholder="search for a book..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-2/3 sm:w-1/2 px-4 py-2 border border-border text-text bg-white rounded-l-md focus:outline-none font-primary"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-accent text-text rounded-r-md font-primary hover:bg-accenthover"
      >
        search
      </button>
    </form>
  );
}
