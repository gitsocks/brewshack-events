import { ClientSecret, PrismaClient } from "@prisma/client";

export const getClientSecretByHash = async (prisma: PrismaClient, applicationId: number): Promise<ClientSecret> => {
    return await prisma.clientSecret.findFirstOrThrow({
        where: {
            applicationId: applicationId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};