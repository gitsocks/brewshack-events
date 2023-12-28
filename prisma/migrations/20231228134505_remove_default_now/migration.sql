-- AlterTable
ALTER TABLE "ApplicationEvent" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ApplicationRole" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "updatedAt" DROP DEFAULT;
