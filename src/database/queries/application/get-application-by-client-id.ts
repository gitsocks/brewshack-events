import { Application, PrismaClient } from "@prisma/client";

export const getApplicationByClientId = async (prisma: PrismaClient, clientId: string): Promise<Application> => {
    const application = await prisma.application.findFirst({
        where: {
            clientId: clientId
        }
    });

    if (!application) {
        throw new Error(`No application with Client Id ${clientId} was found.`);
    }

    return application;
};