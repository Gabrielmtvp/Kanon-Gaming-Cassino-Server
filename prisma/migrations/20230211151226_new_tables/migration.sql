-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cassino" (
    "id" TEXT NOT NULL,
    "coins" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Cassino_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cassino_userId_key" ON "Cassino"("userId");

-- AddForeignKey
ALTER TABLE "Cassino" ADD CONSTRAINT "Cassino_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
