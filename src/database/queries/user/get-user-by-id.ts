import { PrismaClient } from "@prisma/client";

export const getUserById = async (prisma: PrismaClient, id: string) => await prisma.user.findFirst({
    where: {
        id: id
    },
    include: {
        applications: {
            include: {
                application: true
            }
        }
    }
});