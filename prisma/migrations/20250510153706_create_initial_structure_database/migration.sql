-- CreateEnum
CREATE TYPE "ReservationTypes" AS ENUM ('hotel', 'flight', 'car', 'activity');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('confirmed', 'pending', 'cancelled');

-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('planned', 'in_progress', 'completed', 'canceled');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation_modes" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "type" "ReservationTypes" NOT NULL,
    "value" INTEGER NOT NULL,
    "status" "ReservationStatus" NOT NULL,

    CONSTRAINT "reservation_modes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trips" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "status" "TripStatus" NOT NULL,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
