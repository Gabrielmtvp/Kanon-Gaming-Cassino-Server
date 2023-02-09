-- CreateTable
CREATE TABLE "Cassino" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "coins" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Cassino_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cassino_userId_key" ON "Cassino"("userId");
