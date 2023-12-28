import database, { DatabaseQuery } from "@/database";
import { getApplicationEventLog } from "@/database/queries/events/get-application-event-log";
import { IApplicationEvent } from "@/database/types/application-event";
import { IRouteParams } from "@/models/types/IRouteParams";
import { fetchAuthDetails } from "@/utils/fetch-auth-details";
import { NextRequest } from "next/server";

interface IParams {
    id: number;
}

export async function GET(request: NextRequest, { params }: IRouteParams<IParams>) {
    const authorizedUser = await fetchAuthDetails();

    if (!authorizedUser) {
        return Response.error();
    }

    const applicationId = Number(params.id);

    if (!applicationId) {
        throw new Error('No applicationId in request.');
    }

    const databaseQuery: DatabaseQuery<IApplicationEvent[]> = {
        query: (prisma) => getApplicationEventLog(prisma, applicationId)
    };

    const events = await database(databaseQuery);

    return Response.json(events);
}