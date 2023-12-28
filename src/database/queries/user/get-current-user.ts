import { PrismaClient } from "@prisma/client";
import { getUserById } from "./get-user-by-id";
import { createUser } from "@/database/commands/users/create-user";
import { CurrentUser } from "@/database/types/current-user";

export const getCurrentUserQuery = async (prisma: PrismaClient, userId: string): Promise<CurrentUser> => {
    let user = await getUserById(prisma, userId);

    if (!user) {
        await createUser(prisma, userId, 'John Doe');
        user = await getUserById(prisma, userId);
    }

    if (!user) {
        throw new Error('Something went wrong with fetching the current user.');
    }

    const currentUser: CurrentUser = {
        ...user, applications: user?.applications.map(application => ({
            ...application.application,
            role: application.role
        }))
    };

    return currentUser;
};