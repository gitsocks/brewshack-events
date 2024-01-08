-- DropForeignKey
ALTER TABLE "ApplicationEvent" DROP CONSTRAINT "ApplicationEvent_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationRole" DROP CONSTRAINT "ApplicationRole_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_applicationEventId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_applicationId_fkey";

-- AddForeignKey
ALTER TABLE "ApplicationRole" ADD CONSTRAINT "ApplicationRole_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationEvent" ADD CONSTRAINT "ApplicationEvent_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_applicationEventId_fkey" FOREIGN KEY ("applicationEventId") REFERENCES "ApplicationEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
