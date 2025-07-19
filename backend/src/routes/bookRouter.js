const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const bookController = require("../controllers/bookController");

router.patch("/:id/favorite", authMiddleware, bookController.toggleFavorite);
router.get("/:id", authMiddleware, bookController.getBookById);
router.patch("/:id", authMiddleware, bookController.editBook);
router.delete("/:id", authMiddleware, bookController.deleteBook);
router.get("/", authMiddleware, bookController.getAllBooks);
router.post("/", authMiddleware, bookController.addBook);

module.exports = router;
