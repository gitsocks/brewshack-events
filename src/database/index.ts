import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface DatabaseQuery<T> {
    query: (prisma: PrismaClient) => Promise<T>;
}

const db = async <T>({ query }: DatabaseQuery<T>) => {
    const response = await query(prisma);
    await prisma.$disconnect();
    return response;
};

export default db;