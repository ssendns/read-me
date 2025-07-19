const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const prisma = require("./config/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

const authRouter = require("./routes/authRouter");

app.use(cors());
app.use(express.json());

app.use("/api", authRouter);
app.get("/api/test", async (req, res) => {
  console.log("hellooo");
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
