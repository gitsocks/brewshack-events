import database, { DatabaseQuery } from "@/database";
import { getCurrentUserQuery } from "@/database/queries/user/get-current-user";
import { CurrentUser } from "@/database/types/current-user";

export const getUserFromServer = async (id: string) => {
    const databaseQuery: DatabaseQuery<CurrentUser> = {
        query: (prisma) => getCurrentUserQuery(prisma, id)
    };

    const application = await database(databaseQuery);
    return application;
};