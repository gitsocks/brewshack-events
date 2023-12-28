import { PrismaClient } from "@prisma/client";

export const createUser = async (prisma: PrismaClient, id: string, name: string) => await prisma.user.create({
    data: {
        id: id,
        name: name
    }
});