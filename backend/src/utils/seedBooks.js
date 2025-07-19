const prisma = require("../utils/db");

async function main() {
  const user = await prisma.user.findUnique({ where: { username: "anya" } });
  if (!user) {
    console.log("no user found, aborting seed");
    return;
  }

  const books = [
    {
      title: "1984",
      author: "George Orwell",
      openLibraryId: "OL123456M",
      coverUrl: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
      genre: "fiction",
      description: "A dystopian social science fiction novel.",
      status: "reading",
      isFavorite: true,
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      openLibraryId: "OL654321M",
      coverUrl: "https://covers.openlibrary.org/b/id/8231993-L.jpg",
      genre: "romance",
      description: "Classic romantic novel about manners and marriage.",
      status: "planned",
      isFavorite: false,
    },
  ];

  for (const book of books) {
    await prisma.book.create({
      data: {
        ...book,
        userId: user.id,
      },
    });
  }

  console.log("books seeded!");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
