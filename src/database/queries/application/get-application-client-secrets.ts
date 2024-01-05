import { PrismaClient } from "@prisma/client";

export const getApplicationClientSecrets = async (prisma: PrismaClient, applicationId: number) =>
    await prisma.clientSecret.findMany({
        where: {
            applicationId: applicationId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });