export async function fetchBooks(query) {
  const res = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
  );
  const data = await res.json();

  return data.docs.slice(0, 10).map((book) => {
    const key = book.key?.split("/").pop();
    return {
      title: book.title,
      author: book.author_name?.[0] || "unknown",
      coverUrl: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : "https://via.placeholder.com/150x220?text=No+Cover",
      id: key,
    };
  });
}

export async function fetchBookById(id) {
  const res = await fetch(`https://openlibrary.org/works/${id}.json`);
  const data = await res.json();

  let author = "unknown author";

  if (data.authors?.[0]?.author?.key) {
    const authorKey = data.authors[0].author.key;
    try {
      const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`);
      const authorData = await authorRes.json();
      author = authorData.name || "unknown author";
    } catch (e) {
      console.warn("author fetch failed:", e);
    }
  }

  return {
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
}

export async function fetchBooksByGenre(genre) {
  const res = await fetch(
    `https://openlibrary.org/search.json?subject=${encodeURIComponent(genre)}`
  );
  const data = await res.json();

  return data.docs
    .filter((book) => book.cover_i && book.key)
    .slice(0, 12)
    .map((book) => {
      const key = book.key.split("/").pop();
      return {
        title: book.title,
        author: book.author_name?.[0] || "unknown",
        coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
        id: key,
      };
    });
}
