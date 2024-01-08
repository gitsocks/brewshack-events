import database, { DatabaseQuery } from "@/database";
import { deleteApplication } from "@/database/commands/applications/delete-application";
import { IRouteParams } from "@/models/types/IRouteParams";
import { fetchAuthDetails } from "@/utils/fetch-auth-details";
import { NextRequest } from "next/server";

interface IParams {
    id: number;
}

export async function DELETE(request: NextRequest, { params }: IRouteParams<IParams>) {
    const authorizedUser = await fetchAuthDetails();

    if (!authorizedUser) {
        return Response.error();
    }

    const databaseQuery: DatabaseQuery<void> = {
        query: (prisma) => deleteApplication(prisma, Number(params.id))
    };

    await database(databaseQuery);

    return new Response();
}