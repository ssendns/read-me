const fetch = require("node-fetch");
const { mapBookSearchResult } = require("../utils/openLibraryUtils");

const fetchBooksByQuery = async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "missing query" });
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    const books = data.docs
      .filter((book) => book.title.toLowerCase().includes(query.toLowerCase()))
      .filter((book) => book.cover_i && book.key)
      .slice(0, 10)
      .map(mapBookSearchResult);

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch books" });
  }
};

const fetchBookById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(`https://openlibrary.org/works/${id}.json`);
    const data = await response.json();

    let author = "unknown author";
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

    const result = {
      title: data.title,
      description:
        typeof data.description === "object"
          ? data.description.value
          : data.description || "no description available.",
      coverUrl: data.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
        : "https://via.placeholder.com/300x450?text=No+Cover",
      id,
      author,
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch book by ID" });
  }
};

const fetchBooksByGenre = async (req, res) => {
  const genre = req.query.q;
  if (!genre) return res.status(400).json({ error: "missing genre" });
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?subject=${encodeURIComponent(genre)}`
    );
    const data = await response.json();
    const books = data.docs
      .filter((book) => book.cover_i && book.key)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .map(mapBookSearchResult);

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch books by genre" });
  }
};

module.exports = { fetchBooksByQuery, fetchBookById, fetchBooksByGenre };
