import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBookById } from "../services/openLibrary";
import BookList from "../components/BookList";
import Header from "../components/Header";

export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookById(id).then(setBook).catch(console.error);
  }, [id]);

  return book ? (
    <>
      <Header />
      <main className="mx-auto">
        <div className="min-h-[60vh] flex flex-col md:flex-row items-start gap-10 mt-10 mb-10 mr-20">
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
              <p className="text-lg text-gray-700 mb-4">by {book.author}</p>
              <p className="text-gray-600">{book.description}</p>
            </div>

            <div className="pt-6">
              <button className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400 transition">
                add to library
              </button>
            </div>
          </div>
        </div>

        <section className="bg-gray-50">
          <h2 className="text-2xl font-bold pt-9 mr-9 ml-9">similar books</h2>
          <BookList query={book.genre || "fiction"} />
        </section>
      </main>
    </>
  ) : (
    <p className="text-center mt-10">loading...</p>
  );
}
