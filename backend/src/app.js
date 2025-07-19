const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const prisma = require("./utils/db");

const app = express();

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const bookRouter = require("./routes/bookRouter");
const openLibraryRouter = require("./routes/openLibraryRouter");

app.use(cors());
app.use(express.json());

app.use("/api/profile", userRouter);
app.use("/api/books", bookRouter);
app.use("/openlibrary", openLibraryRouter);
app.use("/api", authRouter);
app.get("/api/test", async (req, res) => {
  console.log("hellooo");
  const users = await prisma.user.findMany();
  res.json(users);
});

module.exports = app;
