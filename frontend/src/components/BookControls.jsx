import { useState } from "react";

export default function BookControls({
  openLibraryId,
  token,
  initialStatus,
  initialNotes,
  initialRating,
}) {
  const [status, setStatus] = useState(initialStatus || "planned");
  const [notes, setNotes] = useState(initialNotes || "");
  const [rating, setRating] = useState(initialRating ?? 0);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      console.log("sending status:", status);
      const res = await fetch(
        `http://localhost:3000/api/books/${openLibraryId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status, rating, notes }),
        }
      );

      if (!res.ok) throw new Error("failed to save book details");

      alert("book updated!");
    } catch (err) {
      console.error(err);
      alert("could not save book");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div>
        <label className="block text-sm font-medium mb-1">reading status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="planned">planned</option>
          <option value="reading">reading</option>
          <option value="finished">finished</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="4"
          className="border rounded w-full px-3 py-2"
          placeholder="add your thoughts about this book..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded px-3 py-2"
        >
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {saving ? "saving..." : "save changes"}
      </button>
    </div>
  );
}
