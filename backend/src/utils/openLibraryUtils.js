const mapBookSearchResult = (book) => {
  const key = book.key?.split("/").pop();
  return {
    title: book.title,
    author: book.author_name?.[0] || "unknown",
    coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
    id: key,
  };
};

module.exports = mapBookSearchResult;
