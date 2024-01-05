import { PrismaClient } from "@prisma/client";

export const deleteClientSecret = async (prisma: PrismaClient, secretId: number) => {
    await prisma.clientSecret.delete({
        where: {
            id: secretId
        }
    });
};