const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/utils/db");

let token;
let bookId;

describe("book routes", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { username: "testuser" } });
    await request(app).post("/api/sign-up").send({
      username: "testuser",
      password: "123",
    });
    const res = await request(app).post("/api/log-in").send({
      username: "testuser",
      password: "123",
    });
    token = res.body.user.token;
  });

  it("should add new book", async () => {
    const res = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "test book",
        author: "test author",
        status: "finished",
        openLibraryId: "OL123M",
        rating: 4,
        notes: "interesting",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.book).toHaveProperty("id");
    expect(res.body.book.title).toBe("test book");

    bookId = res.body.book.id;
  });

  it("should get all books for the user", async () => {
    const res = await request(app)
      .get("/api/books")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.books)).toBe(true);
    expect(res.body.books.length).toBeGreaterThan(0);
  });

  it("should get book by id", async () => {
    const res = await request(app)
      .get(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.book).toHaveProperty("id");
    expect(res.body.book.id).toBe(bookId);
  });

  it("should edit a book", async () => {
    const res = await request(app)
      .patch(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        rating: 5,
        notes: "new notes",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.book).toHaveProperty("id");
    expect(res.body.book.rating).toBe(5);
    expect(res.body.book.notes).toBe("new notes");
  });

  it("should delete a book", async () => {
    const res = await request(app)
      .delete(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });

  afterAll(async () => {
    await prisma.book.deleteMany({ where: { title: "test book" } });
    await prisma.user.deleteMany({ where: { username: "testuser" } });
    await prisma.$disconnect;
  });
});
