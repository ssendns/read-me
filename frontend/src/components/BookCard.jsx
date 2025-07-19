export default function BookCard({ title, author, coverUrl }) {
  return (
    <div className="bg-white rounded-xl shadow p-2 flex flex-col items-center justify-center w-60">
      <img
        src={coverUrl}
        alt={title}
        className="w-32 h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-center text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-600 text-center">{author}</p>
    </div>
  );
}
