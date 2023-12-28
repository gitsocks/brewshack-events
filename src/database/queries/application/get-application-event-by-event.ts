import { ApplicationEvent, PrismaClient } from "@prisma/client";

export const getApplicationEventByEvent = async (prisma: PrismaClient, event: string, applicationId: number): Promise<ApplicationEvent> => {
    let applicationEvent = await prisma.applicationEvent.findFirst({
        where: {
            event: event,
            applicationId: applicationId
        }
    });

    if (!applicationEvent) {
        applicationEvent = await prisma.applicationEvent.create({
            data: {
                event: event,
                applicationId: applicationId
            }
        });
    }

    return applicationEvent;
};