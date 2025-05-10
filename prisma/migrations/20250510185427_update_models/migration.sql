/*
  Warnings:

  - You are about to drop the `reservation_modes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "reservation_modes";

-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "type" "ReservationTypes" NOT NULL,
    "value" INTEGER NOT NULL,
    "status" "ReservationStatus" NOT NULL,
    "tripId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
