import { brewshackEvent } from "@/brewshack";
import database, { DatabaseQuery } from "@/database";
import { createEvent } from "@/database/commands/events/create-event";
import { getApplicationByClientId } from "@/database/queries/application/get-application-by-client-id";
import { getApplicationEventByEvent } from "@/database/queries/application/get-application-event-by-event";
import { INewEventDto } from "@/models/dtos/INewEventDto";
import { extractTokenFromBearer } from "@/security/extract-token-from-bearer";
import { validateClientSecret } from "@/security/validate-client-secret";
import { bodyFromRequest } from "@/utils/body-from-request";
import { Application, ApplicationEvent, Event } from "@prisma/client";
import { headers } from "next/headers";

export async function OPTIONS(request: Request) {
    return new Response('👋', {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Clientid',
        },
    });
}

export async function POST(request: Request) {
    brewshackEvent('create_event');
    const headersList = headers();
    const clientId = headersList.get('clientId');
    const authorization = headersList.get('authorization');

    if (!authorization) {
        return Response.error();
    }

    const bearer = extractTokenFromBearer(authorization);

    const isAuthorized = await validateClientSecret(String(clientId), bearer);

    if (isAuthorized) {
        const newEvent = await bodyFromRequest<INewEventDto>(request);
        const getApplicationByClientIdQuery: DatabaseQuery<Application> = {
            query: (prisma) => getApplicationByClientId(prisma, String(clientId))
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
    } else {
        return Response.json({}, { status: 403, statusText: 'Application is not authorized.' });
    }

}