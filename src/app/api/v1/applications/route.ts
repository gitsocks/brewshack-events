import database, { DatabaseQuery } from "@/database";
import { createApplication } from "@/database/commands/applications/create-application";
import { getApplicationsByRole } from "@/database/queries/application/get-applications-by-role";
import { UserApplication } from "@/database/types/user-application";
import { bodyFromRequest } from "@/utils/body-from-request";
import { fetchAuthDetails } from "@/utils/fetch-auth-details";
import { Application } from "@prisma/client";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const queryParams = request.nextUrl.searchParams;

    const roleId = queryParams.get('roleId');

    if (roleId) {
        const databaseQuery: DatabaseQuery<UserApplication[]> = {
            query: (prisma) => getApplicationsByRole(prisma, roleId)
        };

        const applications = await database(databaseQuery);
        return Response.json(applications);
    } else {
        return Response.error();
    }
}

export async function POST(request: NextRequest) {
    const authorizedUser = await fetchAuthDetails();

    if (!authorizedUser) {
        return Response.error();
    }

    const application = await bodyFromRequest<Application>(request);

    const databaseQuery: DatabaseQuery<Application> = {
        query: (prisma) => createApplication(prisma, application, authorizedUser.id)
    };

    const newApplication = await database(databaseQuery);
    return Response.json(newApplication);
}