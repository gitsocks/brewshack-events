import database, { DatabaseQuery } from "@/database";
import { getClientSecretByHash } from "@/database/queries/application/get-client-secret-by-hash";
import { getApplicationFromServerFromClientId } from "@/services/server/get-application-from-server-from-client-id";
import { ClientSecret } from "@prisma/client";
import argon2 from 'argon2';

export const validateClientSecret = async (id: string, secret: string) => {
    try {
        const application = await getApplicationFromServerFromClientId(id);

        const databaseQuery: DatabaseQuery<ClientSecret> = {
            query: (prisma) => getClientSecretByHash(prisma, application.id)
        };
        const clientSecret = await database(databaseQuery);

        return argon2.verify(clientSecret.secret, secret);
    } catch {
        return false;
    }
};