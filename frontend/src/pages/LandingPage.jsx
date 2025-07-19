import Header from "../components/Header";
import Hero from "../components/Hero";
import BookList from "../components/BookList";

export default function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <section className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-5 sm:gap-10 px-4 py-2 whitespace-nowrap text-xl sm:text-2xl font-bold">
            {[
              "popular",
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
            ].map((genre) => (
              <button
                key={genre}
                className="text-gray-700 hover:text-black hover:underline"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        <BookList query="the little prince" />
      </section>
    </>
  );
}
