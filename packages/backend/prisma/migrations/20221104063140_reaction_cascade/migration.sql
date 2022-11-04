-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_post_id_fkey";

-- CreateTable
CREATE TABLE "Invitation" (
    "code" TEXT NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
