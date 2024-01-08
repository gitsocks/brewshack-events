import { PrismaClient } from "@prisma/client";

export const deleteApplication = async (prisma: PrismaClient, id: number) => {
    await prisma.application.delete({
        where: {
            id: id
        }
    });
};