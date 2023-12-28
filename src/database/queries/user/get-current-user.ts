import { PrismaClient, User } from "@prisma/client";

export const getCurrentUserQuery = async (prisma: PrismaClient, userId: string): Promise<User> => {
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });

    if (user) {
        return user;
    } else {
        const createdUser = await prisma.user.create({
            data: {
                id: userId,
                name: 'John Doe'
            }
        });

        return createdUser;
    }
};