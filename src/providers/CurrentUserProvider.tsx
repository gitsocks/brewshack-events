"use client";

import { useUserService } from "@/services/use-user-service";
import { User } from "@prisma/client";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

interface CurrentUserContextValue {
    currentUser?: User;
}

export const CurrentUserContext = createContext<CurrentUserContextValue>({
    currentUser: undefined
});

export const CurrentUserProvider = ({ children }: PropsWithChildren) => {
    const userService = useUserService();
    const [currentUser, setCurrentUser] = useState<User>();

    useEffect(() => {
        async () => {
            const user = await userService.fetchCurrentUser();
            setCurrentUser(user);
        };
    }, [userService]);

    return (
        <CurrentUserContext.Provider value={{
            currentUser: currentUser
        }}>
            {children}
        </CurrentUserContext.Provider>
    );
};