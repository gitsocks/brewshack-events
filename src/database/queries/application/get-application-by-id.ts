import { Application, PrismaClient } from "@prisma/client";

export const getApplicationById = async (prisma: PrismaClient, id: number): Promise<Application> => {
    const application = await prisma.application.findFirst({
        where: {
            id: id
        }
    });

    if (!application) {
        throw new Error(`No application with id ${id} was found.`);
    }

    return application;
};