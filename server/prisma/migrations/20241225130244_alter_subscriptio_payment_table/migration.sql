-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "paymentType" "PaymentType" NOT NULL DEFAULT 'FREE';

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "subscriptionType" "RecurringType" NOT NULL DEFAULT 'MONTHLY';
