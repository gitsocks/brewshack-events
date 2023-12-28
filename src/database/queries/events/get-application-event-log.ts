import { PrismaClient } from "@prisma/client";

export const getApplicationEventLog = async (prisma: PrismaClient, applicationId: number) => {
    const events = await prisma.event.findMany({
        where: {
            applicationId: applicationId
        },
        select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            applicationEvent: {
                select: {
                    event: true
                }
            }
        }
    });

    return events.map(e => ({
        id: e.id,
        event: e.applicationEvent.event,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt
    }));
};