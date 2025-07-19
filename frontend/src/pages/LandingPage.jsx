import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BookList from "../components/BookList";

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

export default function LandingPage() {
  const [selectedGenre, setSelectedGenre] = useState("fiction");

  return (
    <>
      <Header />
      <Hero />
      <section className="bg-bg min-h-screen px-section py-10">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-5 sm:gap-10 px-section py-2 whitespace-nowrap text-xl sm:text-2xl font-bold">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`transition ${
                  selectedGenre === genre
                    ? "text-active underline underline-offset-8"
                    : "text-muted hover:text-active hover:underline"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        <BookList query={selectedGenre} />
      </section>
    </>
  );
}
