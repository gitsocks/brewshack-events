import database, { DatabaseQuery } from "@/database";
import { getApplicationByClientId } from "@/database/queries/application/get-application-by-client-id";
import { Application } from "@prisma/client";

export const getApplicationFromServerFromClientId = async (clientId: string) => {
    const databaseQuery: DatabaseQuery<Application> = {
        query: (prisma) => getApplicationByClientId(prisma, clientId)
    };

    const application = await database(databaseQuery);
    return application;
};