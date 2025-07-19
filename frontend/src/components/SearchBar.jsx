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
    <form onSubmit={handleSubmit} className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="search for a book..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-2/3 sm:w-1/2 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gray-300 text-black rounded-r-md"
      >
        search
      </button>
    </form>
  );
}
