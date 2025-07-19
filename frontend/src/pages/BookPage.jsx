import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookList from "../components/BookList";
import Header from "../components/Header";

export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`http://localhost:3000/openlibrary/${id}`);
        if (!res.ok) {
          throw new Error("failed to fetch book");
        }
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error(err);
        setError("failed to load book");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <section className="text-center py-10 text-muted font-typewriter">
        loading book...
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

  if (!book) {
    return (
      <section className="text-center py-10 text-muted font-typewriter">
        book not found.
      </section>
    );
  }

  const handleAddToLibrary = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          openLibraryId: id,
          description: book.description,
          coverUrl: book.coverUrl,
          genre: book.genre,
          status: "planned",
          rating: 0,
        }),
      });

      if (!res.ok) throw new Error("failed to add book");

      const data = await res.json();
      alert("book added!");
    } catch (err) {
      console.error(err);
      alert("could not add book");
    }
  };

  return (
    <>
      <Header />
      <main className="mx-auto">
        <div className="min-h-[60vh] flex flex-col md:flex-row items-start gap-10 mt-10 mb-10 md:mr-section">
          <div className="w-full md:w-1/2 flex items-center justify-center min-h-[60vh]">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="max-h-[60vh] object-contain rounded shadow-lg"
            />
          </div>

          <div className="flex flex-col justify-between w-full md:w-1/2 min-h-[60vh]">
            <div>
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-lg text-muted mb-4">by {book.author}</p>
              <p className="text-subtle">{book.description}</p>
            </div>

            <div className="pt-6">
              <button
                onClick={handleAddToLibrary}
                className="bg-accent text-on-accent px-6 py-2 rounded hover:bg-accenthover transition"
              >
                add to library
              </button>
            </div>
          </div>
        </div>

        <section className="bg-bg">
          <h2 className="text-2xl font-bold pt-9 px-section">similar books</h2>
          <BookList query={book.genre || "fiction"} />
        </section>
      </main>
    </>
  );
}
