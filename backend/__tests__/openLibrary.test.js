const fetch = require("node-fetch");
const { Response } = jest.requireActual("node-fetch");
jest.mock("node-fetch");

const {
  fetchBooksByQuery,
  fetchBookById,
  fetchBooksByGenre,
} = require("../src/controllers/openLibraryController");
const { mapBookSearchResult } = require("../src/utils/openLibraryUtils");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("fetchBooksByQuery", () => {
  it("should return books for a valid query", async () => {
    const fakeBooks = {
      docs: [
        {
          title: "The Hobbit",
          author_name: ["Tolkien"],
          cover_i: 123,
          key: "/works/OL123W",
        },
      ],
    };

    fetch.mockResolvedValueOnce(new Response(JSON.stringify(fakeBooks)));

    const req = { query: { q: "hobbit" } };
    const res = mockRes();

    await fetchBooksByQuery(req, res);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("hobbit"));
    expect(res.json).toHaveBeenCalledWith(
      mapBookSearchResult(fakeBooks.docs[0])
    );
  });

  it("should return 400 if no query is provided", async () => {
    const req = { query: {} };
    const res = mockRes();

    await fetchBooksByQuery(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "missing query" });
  });
});
