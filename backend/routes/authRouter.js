const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController");

router.post("/sign-up", authController.signUp);
router.post("/log-in", authController.logIn);
router.get("/profile", authMiddleware, authController.getProfile);

module.exports = router;
