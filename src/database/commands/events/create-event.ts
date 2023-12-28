import { PrismaClient, Event, ApplicationEvent, Application } from "@prisma/client";
import { createApplicationEvent } from "./create-application-event";

export const createEvent = async (prisma: PrismaClient, event: ApplicationEvent, application: Application): Promise<Event> => {
    if (!event.id) {
        event = await createApplicationEvent(prisma, { applicationId: application.id, event: event.event });
    }

    const result = await prisma.event.create({
        data: {
            applicationEventId: event.id,
            applicationId: application.id
        }
    });

    return result;
};