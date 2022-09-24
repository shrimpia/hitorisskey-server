-- CreateEnum
CREATE TYPE "PostVisibility" AS ENUM ('public', 'private', 'realtime', 'announcement');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('Post', 'Mail');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT,
    "hashedPassword" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "author_id" TEXT NOT NULL,
    "visibility" "PostVisibility" NOT NULL,
    "content" VARCHAR(1024) NOT NULL,
    "annotation" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mail" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "author_id" TEXT NOT NULL,
    "receiver_id" TEXT,
    "content" TEXT NOT NULL,

    CONSTRAINT "Mail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "author_id" TEXT NOT NULL,
    "type" "ReportType" NOT NULL,
    "target_id" TEXT NOT NULL,
    "is_done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "author_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
