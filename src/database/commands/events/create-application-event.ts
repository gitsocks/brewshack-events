import { CreateApplicationEvent } from "@/database/types/create-application-event";
import { PrismaClient } from "@prisma/client";

export const createApplicationEvent = async (prisma: PrismaClient, { applicationId, event }: CreateApplicationEvent) =>
    await prisma.applicationEvent.create({
        data: {
            applicationId: applicationId,
            event: event
        }
    });