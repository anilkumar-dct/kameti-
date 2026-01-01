-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT
);

-- CreateTable
CREATE TABLE "kameti" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "budget" REAL NOT NULL,
    "months" INTEGER NOT NULL,
    "installment" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "kameti_monthly_withdrawal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kametiId" INTEGER NOT NULL,
    "monthNumber" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "kameti_monthly_withdrawal_kametiId_fkey" FOREIGN KEY ("kametiId") REFERENCES "kameti" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "kameti_title_key" ON "kameti"("title");

-- CreateIndex
CREATE UNIQUE INDEX "kameti_monthly_withdrawal_kametiId_monthNumber_key" ON "kameti_monthly_withdrawal"("kametiId", "monthNumber");
