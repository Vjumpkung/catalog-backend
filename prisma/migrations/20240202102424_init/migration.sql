-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" CHAR(100) NOT NULL,
    "description" TEXT,
    "images" TEXT[],
    "price" INTEGER,
    "published_at" DATE,
    "deleted_at" DATE,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Choices" (
    "id" TEXT NOT NULL,
    "name" CHAR(100) NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" DATE,
    "deleted_at" DATE,

    CONSTRAINT "Choices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" CHAR(20) NOT NULL,
    "password" CHAR(100) NOT NULL,
    "created_at" DATE,
    "deleted_at" DATE,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "name" CHAR(50) NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChoicesToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Choices_id_key" ON "Choices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_id_key" ON "Setting"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ChoicesToProduct_AB_unique" ON "_ChoicesToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ChoicesToProduct_B_index" ON "_ChoicesToProduct"("B");

-- AddForeignKey
ALTER TABLE "_ChoicesToProduct" ADD CONSTRAINT "_ChoicesToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Choices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChoicesToProduct" ADD CONSTRAINT "_ChoicesToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
