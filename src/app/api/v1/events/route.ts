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
    const headersList = headers();
    const clientId = headersList.get('clientId');
    const authorization = headersList.get('authorization');

    if (!authorization) {
        return Response.error();
    }

    const bearer = extractTokenFromBearer(authorization);

    const isAuthorized = await validateClientSecret(String(clientId), bearer);

    return Response.json(isAuthorized);

}