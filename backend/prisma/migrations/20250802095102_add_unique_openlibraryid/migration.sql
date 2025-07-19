/*
  Warnings:

  - A unique constraint covering the columns `[userId,openLibraryId]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Book_userId_openLibraryId_key" ON "public"."Book"("userId", "openLibraryId");
