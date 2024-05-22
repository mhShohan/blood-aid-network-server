/*
  Warnings:

  - You are about to drop the column `age` on the `userProfiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateOfBirth` to the `userProfiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `userProfiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `bloodType` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE');

-- AlterTable
ALTER TABLE "userProfiles" DROP COLUMN "age",
ADD COLUMN     "dateOfBirth" TEXT NOT NULL,
ADD COLUMN     "profilePicture" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN     "username" TEXT NOT NULL,
DROP COLUMN "bloodType",
ADD COLUMN     "bloodType" "BloodType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
