import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BookList from "../components/BookList";

const FILTERS = ["all", "favourites", "reading", "planned", "finished"];

export default function MyLibraryPage() {
  const { filter = "all" } = useParams();
  const navigate = useNavigate();

  const handleFilterChange = (newFilter) => {
    navigate(`/library/${newFilter}`);
  };

  return (
    <>
      <Header />
      <main className="mx-auto min-h-screen bg-bg text-text font-typewriter py-10">
        <h1 className="text-2xl font-bold mb-6 mt-6 text-center">my library</h1>

        <div className="flex justify-center gap-4 flex-wrap mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-4 py-2 rounded border ${
                filter === f
                  ? "bg-primary text-white"
                  : "text-muted hover:border-text hover:text-text"
              } transition`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="ml-12">
          <BookList query={filter} />
        </div>
      </main>
    </>
  );
}
