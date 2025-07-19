const express = require("express");
const router = express.Router();
const openLibraryController = require("../controllers/openLibraryController");

router.get("/genre", openLibraryController.fetchBooksByGenre);
router.get("/:id", openLibraryController.fetchBookById);
router.get("/", openLibraryController.fetchBooksByQuery);

module.exports = router;
