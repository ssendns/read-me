const prisma = require("../utils/db");

const allowedStatuses = ["reading", "finished", "planned"];

const getAllBooks = async (req, res) => {
  const userId = req.user.userId;
  const status = req.query.status;

  const filter = { userId };
  if (status !== undefined) {
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "invalid status" });
    }
    filter.status = status;
  }

  const isFavorite = req.query.favorite;
  if (isFavorite === "true") {
    filter.isFavorite = true;
  }

  const books = await prisma.book.findMany({
    where: filter,
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json({ books });
};

const getBookById = async (req, res) => {
  const userId = req.user.userId;
  const bookId = Number(req.params.id);
  const book = await prisma.book.findUnique({
    where: { id: bookId, userId: userId },
  });

  if (!book) {
    return res.status(400).json({ error: "can not find book" });
  }

  res.status(200).json({ book });
};

const addBook = async (req, res) => {
  const userId = req.user.userId;
  const {
    title,
    author,
    status,
    openLibraryId,
    coverUrl,
    genre,
    description,
    rating,
    notes,
    isFavorite,
  } = req.body;

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({ error: "invalid status" });
  }

  if (!title || !author || !openLibraryId) {
    return res.status(400).json({ error: "missing required fields" });
  }

  if (typeof rating === "number" && !(rating >= 0 && rating <= 5)) {
    return res.status(400).json({ error: "rating should be beetween 0 and 5" });
  }

  const book = await prisma.book.create({
    data: {
      title,
      author,
      status,
      openLibraryId,
      coverUrl,
      genre,
      description,
      rating: rating || 0,
      notes: notes || null,
      userId,
      isFavorite: isFavorite ?? false,
    },
  });

  res.status(201).json({ book });
};

const editBook = async (req, res) => {
  const userId = req.user.userId;
  const bookId = Number(req.params.id);
  const { status, rating, notes, isFavorite } = req.body;
  const dataToUpdate = {};

  if (status) {
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "invalid status" });
    }
  }
  if (typeof rating === "number") {
    dataToUpdate.rating = rating;
  }

  if (typeof notes === "string") {
    dataToUpdate.notes = notes;
  }

  if (
    typeof isFavorite === "boolean" ||
    isFavorite === "true" ||
    isFavorite === "false"
  ) {
    dataToUpdate.isFavorite = isFavorite === true || isFavorite === "true";
  }

  if (Object.keys(dataToUpdate).length === 0) {
    return res.status(400).json({ error: "nothing to update" });
  }

  const existing = await prisma.book.findUnique({
    where: { id: bookId, userId: userId },
  });

  if (!existing) {
    return res.status(400).json({ error: "can not find the book" });
  }

  const updated = await prisma.book.update({
    where: { id: bookId, userId: userId },
    data: dataToUpdate,
  });

  res.status(200).json({ book: updated });
};

const deleteBook = async (req, res) => {
  const userId = req.user.userId;
  const bookId = Number(req.params.id);

  const existing = await prisma.book.findUnique({
    where: { id: bookId, userId: userId },
  });

  if (!existing) {
    return res.status(400).json({ error: "can not find the book" });
  }

  await prisma.book.delete({ where: { id: bookId, userId: userId } });
  res.status(204).send();
};

const toggleFavorite = async (req, res) => {
  const userId = req.user.userId;
  const bookId = Number(req.params.id);

  const existing = await prisma.book.findUnique({
    where: { id: bookId, userId: userId },
  });

  if (!existing) {
    return res.status(400).json({ error: "can not find the book" });
  }

  const updated = await prisma.book.update({
    where: { id: bookId, userId: userId },
    data: { isFavorite: !existing.isFavorite },
  });
  res.status(200).json({ book: updated });
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  editBook,
  deleteBook,
  toggleFavorite,
};
