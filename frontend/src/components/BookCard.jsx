import { Link } from "react-router-dom";

export default function BookCard({
  id,
  title,
  author,
  coverUrl,
  openLibraryId,
}) {
  const linkPath = openLibraryId ? `/books/${openLibraryId}` : `/books/${id}`;

  return (
    <Link
      to={linkPath}
      className="bg-bg text-text rounded-lg shadow-card px-4 pt-4 pb-2 flex flex-col items-center w-44 h-75 hover:shadow-md transition font-typewriter"
    >
      <img
        src={coverUrl}
        alt={title}
        className="w-28 h-40 object-cover rounded mb-3"
      />

      <h2
        className="text-center text-[1rem] font-semibold text-primary leading-tight mb-1"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          height: "2.5em",
        }}
      >
        {title}
      </h2>

      <p className="text-sm text-muted text-center truncate w-full">{author}</p>
    </Link>
  );
}
