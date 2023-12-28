import { UserApplication } from "@/database/types/user-application";
import { PrismaClient } from "@prisma/client";

export const getApplicationsByRole = async (prisma: PrismaClient, roleId: string): Promise<UserApplication[]> => {
    const DEFAULT_ROLE = 'MEMBER';

    const applications = await prisma.application.findMany({
        where: {
            roles: {
                some: {
                    userId: roleId
                }
            }
        },
        include: {
            roles: true
        }
    });

    return applications.map(application => ({
        ...application,
        role: application.roles.find(role => role.userId == roleId)?.role || DEFAULT_ROLE
    }));
};