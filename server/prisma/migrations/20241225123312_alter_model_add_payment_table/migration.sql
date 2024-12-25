/*
  Warnings:

  - You are about to drop the column `tier` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `membershipId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('ONE_TIME', 'RECURRING', 'FREE');

-- CreateEnum
CREATE TYPE "RecurringType" AS ENUM ('MONTHLY', 'YEARLY', 'QUARTERLY');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'UNPAID', 'CANCELLED', 'TRIAL', 'PAST_DUE', 'PAUSED');

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "paymentType" "PaymentType" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "recurringType" "RecurringType";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "tier",
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "membershipId" TEXT NOT NULL,
ADD COLUMN     "status" "SubscriptionStatus" NOT NULL DEFAULT 'INACTIVE';

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "membershipId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "PaymentStatus" NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;
