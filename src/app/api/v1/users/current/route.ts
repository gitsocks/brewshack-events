import database, { DatabaseQuery } from "@/database";
import { getCurrentUserQuery } from "@/database/queries/user/get-current-user";
import { fetchAuthDetails } from "@/utils/fetch-auth-details";
import { User } from "@prisma/client";

export async function GET() {
    const currentUser = await fetchAuthDetails();

    if (!currentUser?.id) throw new Error('Current user has no id');

    const databaseQuery: DatabaseQuery<User> = {
        query: (prisma) => getCurrentUserQuery(prisma, currentUser.id)
    };

    const user = await database(databaseQuery);
    return Response.json(user);
}