import { Application, PrismaClient, User } from "@prisma/client";

export const createApplication = async (prisma: PrismaClient, application: Application, userId: string): Promise<Application> => {
    const DEFAULT_ROLE = 'ADMIN';

    const createdApplication = await prisma.application.create({
        data: {
            name: application.name,
            roles: {
                create: {
                    userId: userId,
                    role: DEFAULT_ROLE
                }
            }
        },
    });

    return createdApplication;
};