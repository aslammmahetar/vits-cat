-- CreateTable
CREATE TABLE "UserMaster" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mobileNo" TEXT,
    "email" TEXT NOT NULL,
    "firmName" TEXT,
    "businessType" INTEGER NOT NULL DEFAULT 0,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "latLong" TEXT,
    "passwordHash" TEXT NOT NULL,
    "previousPasswordHash" TEXT,
    "profileImage" TEXT,
    "businessImage" TEXT,
    "referralCode" TEXT,
    "referredBy" TEXT,
    "subscriptionPlan" TEXT NOT NULL DEFAULT 'free',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMaster_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMaster_mobileNo_key" ON "UserMaster"("mobileNo");

-- CreateIndex
CREATE UNIQUE INDEX "UserMaster_email_key" ON "UserMaster"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserMaster_referralCode_key" ON "UserMaster"("referralCode");
