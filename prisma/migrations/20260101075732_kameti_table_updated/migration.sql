-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_kameti" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "budget" REAL NOT NULL,
    "months" INTEGER NOT NULL,
    "installment" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'INACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_kameti" ("budget", "createdAt", "id", "installment", "months", "status", "title", "updatedAt") SELECT "budget", "createdAt", "id", "installment", "months", "status", "title", "updatedAt" FROM "kameti";
DROP TABLE "kameti";
ALTER TABLE "new_kameti" RENAME TO "kameti";
CREATE UNIQUE INDEX "kameti_title_key" ON "kameti"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
