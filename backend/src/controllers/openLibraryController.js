const fetch = require("node-fetch");

const fetchBooksByQuery = async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "missing query" });

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    const books = data.docs
      .filter((book) => book.cover_i && book.key)
      .slice(0, 10)
      .map((book) => ({
        title: book.title || "untitled",
        author: (book.author_name && book.author_name[0]) || "unknown",
        id: book.key.replace("/works/", ""),
        coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
      }));

    res.json(books);
  } catch (err) {
    console.error("query fetch error:", err);
    res.status(500).json({ error: "failed to fetch books" });
  }
};

const fetchBookById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(`https://openlibrary.org/works/${id}.json`);
    const data = await response.json();

    let author = "Unknown author";
    if (data.authors?.[0]?.author?.key) {
      try {
        const authorRes = await fetch(
          `https://openlibrary.org${data.authors[0].author.key}.json`
        );
        const authorData = await authorRes.json();
        author = authorData.name || "unknown author";
      } catch (e) {
        console.warn("author fetch failed:", e);
      }
    }

    const subjects = data.subjects || [];
    const genre =
      subjects.find((s) =>
        ["fiction", "fantasy", "science fiction", "romance", "thriller"].some(
          (g) => s.toLowerCase().includes(g)
        )
      ) || "fiction";

    const result = {
      title: data.title,
      description:
        typeof data.description === "object"
          ? data.description.value
          : data.description || "no description available",
      coverUrl: data.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
        : "https://via.placeholder.com/300x450?text=No+Cover",
      id,
      author,
      genre,
    };

    res.json(result);
  } catch (err) {
    console.error("book by id fetch error:", err);
    res.status(500).json({ error: "failed to fetch book by id" });
  }
};

const fetchBooksByGenre = async (req, res) => {
  const genre = req.query.q;
  if (!genre) return res.status(400).json({ error: "missing genre" });

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?subject=${encodeURIComponent(genre)}`
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Non-OK response:", response.status, text);
      return res.status(500).json({ error: "failed to fetch books by genre" });
    }

    const data = await response.json();
    const docs = data.docs || [];

    const books = docs
      .filter((book) => book.cover_i && book.key)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .map((book) => ({
        title: book.title || "untitled",
        author: (book.author_name && book.author_name[0]) || "unknown",
        id: book.key.replace("/works/", ""), // extract id
        coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
      }));

    res.json(books);
  } catch (err) {
    console.error("genre fetch error:", err);
    res.status(500).json({ error: "failed to fetch books by genre" });
  }
};

module.exports = { fetchBooksByQuery, fetchBookById, fetchBooksByGenre };
