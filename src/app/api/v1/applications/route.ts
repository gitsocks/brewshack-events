import database, { DatabaseQuery } from "@/database";
import { getApplicationsByRole } from "@/database/queries/application/get-applications-by-role";
import { UserApplication } from "@/database/types/user-application";
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