"use client";

import { useCurrentUserQuery } from "@/services/queries/use-current-user-query";
import { User } from "@prisma/client";
import { PropsWithChildren, createContext } from "react";

interface CurrentUserContextValue {
    currentUser?: User;
    isLoading: boolean;
}

export const CurrentUserContext = createContext<CurrentUserContextValue>({
    currentUser: undefined,
    isLoading: false
});

export const CurrentUserProvider = ({ children }: PropsWithChildren) => {
    const { data, isLoading } = useCurrentUserQuery();

    return (
        <CurrentUserContext.Provider value={{
            currentUser: data,
            isLoading: isLoading
        }}>
            {children}
        </CurrentUserContext.Provider>
    );
};