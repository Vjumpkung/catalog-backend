-- AlterTable
ALTER TABLE "Choices" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Setting" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT;
