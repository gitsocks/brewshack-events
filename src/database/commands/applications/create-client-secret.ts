import { PrismaClient } from "@prisma/client";

export interface CreateClientSecretCommand {
    name: string;
    secret: string;
    expiresAt: Date;
    applicationId: number;
}

export const createClientSecret = async (prisma: PrismaClient, { name, secret, expiresAt, applicationId }: CreateClientSecretCommand) =>
    await prisma.clientSecret.create({
        data: {
            name: name,
            secret: secret,
            expiresAt: expiresAt,
            applicationId: applicationId
        },
    });
