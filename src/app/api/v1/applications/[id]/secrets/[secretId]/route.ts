import db, { DatabaseQuery } from "@/database";
import { deleteClientSecret } from "@/database/commands/applications/delete-client-secret";
import { IRouteParams } from "@/models/types/IRouteParams";
import { fetchAuthDetails } from "@/utils/fetch-auth-details";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    secretId: number;
}

export async function DELETE(request: NextRequest, { params }: IRouteParams<IParams>) {
    const authorizedUser = await fetchAuthDetails();

    if (!authorizedUser) {
        return Response.error();
    }

    const databaseQuery: DatabaseQuery<void> = {
        query: (prisma) => deleteClientSecret(prisma, Number(params.secretId))
    };

    await db(databaseQuery);

    return new Response();
}