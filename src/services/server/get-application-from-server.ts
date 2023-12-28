import database, { DatabaseQuery } from "@/database";
import { getApplicationById } from "@/database/queries/application/get-application-by-id";
import { Application } from "@prisma/client";

export const getApplicationFromServer = async (id: number) => {
    const databaseQuery: DatabaseQuery<Application> = {
        query: (prisma) => getApplicationById(prisma, id)
    };

    const application = await database(databaseQuery);
    return application;
};