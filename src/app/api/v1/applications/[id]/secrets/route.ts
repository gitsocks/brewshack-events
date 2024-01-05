import db, { DatabaseQuery } from "@/database";
import { createClientSecret } from "@/database/commands/applications/create-client-secret";
import { getApplicationClientSecrets } from "@/database/queries/application/get-application-client-secrets";
import { IRouteParams } from "@/models/types/IRouteParams";
import { fetchAuthDetails } from "@/utils/fetch-auth-details";
import { generateRandomClientSecret } from "@/utils/generate-random-client-secret";
import { ClientSecret } from "@prisma/client";
import argon2 from "argon2";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    id: number;
}

export async function GET(request: NextRequest, { params }: IRouteParams<IParams>) {
    const authorizedUser = await fetchAuthDetails();

    if (!authorizedUser) {
        return Response.error();
    }

    const databaseQuery: DatabaseQuery<ClientSecret[]> = {
        query: (prisma) => getApplicationClientSecrets(prisma, Number(params.id))
    };

    const clientSecrets = await db(databaseQuery);

    return NextResponse.json(clientSecrets);
}

export async function POST(request: NextRequest, { params }: IRouteParams<IParams>) {
    const authorizedUser = await fetchAuthDetails();

    if (!authorizedUser) {
        return Response.error();
    }

    const { name } = await request.json();

    const clientSecret = generateRandomClientSecret();
    const clientSecretHashed = await argon2.hash(clientSecret);
    const expiresAt = new Date();

    expiresAt.setMonth(expiresAt.getMonth() + 6);

    const databaseQuery: DatabaseQuery<ClientSecret> = {
        query: (prisma) => createClientSecret(prisma, { name: name, applicationId: Number(params.id), expiresAt: expiresAt, secret: clientSecretHashed })
    };

    const newSecret = await db(databaseQuery);

    return NextResponse.json({ id: newSecret.id, secret: clientSecret, name: newSecret.name, expiresAt: newSecret.expiresAt });
}