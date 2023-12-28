import database, { DatabaseQuery } from "@/database";
import { createEvent } from "@/database/commands/events/create-event";
import { getApplicationByClientId } from "@/database/queries/application/get-application-by-client-id";
import { getApplicationEventByEvent } from "@/database/queries/application/get-application-event-by-event";
import { INewEventDto } from "@/models/dtos/INewEventDto";
import { bodyFromRequest } from "@/utils/body-from-request";
import { Application, ApplicationEvent, Event } from "@prisma/client";
import { headers } from "next/headers";

export async function POST(request: Request) {
    const headersList = headers();
    const clientId = headersList.get('clientId');

    if (!clientId) {
        return Response.error();
    }

    const newEvent = await bodyFromRequest<INewEventDto>(request);

    const getApplicationByClientIdQuery: DatabaseQuery<Application> = {
        query: (prisma) => getApplicationByClientId(prisma, clientId)
    };
    const application = await database(getApplicationByClientIdQuery);

    const getApplicationEventQuery: DatabaseQuery<ApplicationEvent> = {
        query: (prisma) => getApplicationEventByEvent(prisma, newEvent.event, application.id)
    };

    const applicationEvent = await database(getApplicationEventQuery);

    const createEventQuery: DatabaseQuery<Event> = {
        query: (prisma) => createEvent(prisma, applicationEvent, application)
    };

    const newApplication = await database(createEventQuery);
    return Response.json(newApplication);
}