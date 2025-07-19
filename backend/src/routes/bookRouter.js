const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const bookController = require("../controllers/bookController");

router.patch(
  "/:openLibraryId/favorite",
  authMiddleware,
  bookController.toggleFavorite
);
router.get("/:openLibraryId", authMiddleware, bookController.getBookById);
router.patch("/:openLibraryId", authMiddleware, bookController.editBook);
router.delete("/:openLibraryId", authMiddleware, bookController.deleteBook);
router.get("/", authMiddleware, bookController.getAllBooks);
router.post("/", authMiddleware, bookController.addBook);

module.exports = router;
