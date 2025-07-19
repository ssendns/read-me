import { Link } from "react-router-dom";

export default function BookCard({ title, author, coverUrl, openLibraryId }) {
  return (
    <Link
      to={`/books/${openLibraryId}`}
      className="bg-bg text-text rounded-lg shadow-card p-block flex flex-col items-center justify-center w-60 hover:shadow-md transition font-typewriter"
    >
      <img
        src={coverUrl}
        alt={title}
        className="w-32 h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-center text-lg font-semibold text-primary">
        {title}
      </h2>
      <p className="text-sm text-muted text-center">{author}</p>
    </Link>
  );
}
