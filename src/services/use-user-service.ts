import { User } from "@prisma/client";

export const useUserService = () => {

    const fetchCurrentUser = async (): Promise<User> => {
        const url = `${location.origin}/api/v1/users/current`;
        const response = await fetch(url);
        const user = await response.json();
        return user;
    };

    return {
        fetchCurrentUser
    };
};