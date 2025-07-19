import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookList from "../components/BookList";
import Header from "../components/Header";
import BookControls from "../components/BookControls";

export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [localBook, setLocalBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInLibrary, setIsInLibrary] = useState(false);
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

    const checkIfInLibrary = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setLocalBook(data.book);
          setIsInLibrary(true);
        } else {
          setIsInLibrary(false);
        }
      } catch (e) {
        console.error("error checking book in library:", e);
        setIsInLibrary(false);
      }
    };

    fetchData().then(checkIfInLibrary);
  }, [id, token]);

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
      setLocalBook(data);
      setIsInLibrary(true);
      alert("book added!");
    } catch (err) {
      console.error(err);
      alert("could not add book");
    }
  };

  const handleDeleteFromLibrary = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("failed to delete");

      alert("book removed!");
      setLocalBook(null);
      setIsInLibrary(false);
    } catch (err) {
      console.error(err);
      alert("could not delete book");
    }
  };

  const handleToggleFavourite = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/books/${id}/favorite`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("failed to toggle favourite");
      const data = await res.json();
      setLocalBook(data.book);
      alert("done");
    } catch (err) {
      console.error(err);
      alert("could not toggle favourites");
    }
  };

  return (
    <>
      <Header />
      <main className="mx-auto">
        <div className="min-h-fit flex flex-col md:flex-row items-start gap-10 mt-10 mb-10 md:mr-section px-section py-10">
          <div className="min-h-fit w-full md:w-1/2 flex items-center justify-center">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="max-h-[60vh] object-contain rounded shadow-lg"
            />
          </div>

          <div className="md:min-h-[60vh] sm:min-h-fit flex flex-col md:justify-between w-full md:w-1/2">
            <div>
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-lg text-muted mb-4">by {book.author}</p>
              <p className="text-subtle">{book.description}</p>
            </div>

            <div className="pt-6">
              {isInLibrary ? (
                <div>
                  <button
                    onClick={handleDeleteFromLibrary}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                  >
                    delete from library
                  </button>
                  <button
                    onClick={handleToggleFavourite}
                    className={`ml-4 px-6 py-2 rounded transition ${
                      localBook?.isFavorite
                        ? "bg-yellow-500 text-black hover:bg-yellow-600"
                        : "bg-gray-300 text-black hover:bg-gray-400"
                    }`}
                  >
                    {localBook?.isFavorite ? "★ remove" : "☆ add"}
                  </button>
                  <BookControls
                    openLibraryId={id}
                    token={token}
                    initialStatus={localBook.status}
                    initialNotes={localBook.notes}
                    initialRating={localBook.rating}
                  />
                </div>
              ) : (
                <button
                  onClick={handleAddToLibrary}
                  className="bg-accent text-on-accent px-6 py-2 rounded hover:bg-accenthover transition"
                >
                  add to library
                </button>
              )}
            </div>
          </div>
        </div>

        <section className="bg-bg px-section py-10">
          <h2 className="text-2xl font-bold">similar books</h2>
          <BookList query={book.genre || "fiction"} />
        </section>
      </main>
    </>
  );
}
