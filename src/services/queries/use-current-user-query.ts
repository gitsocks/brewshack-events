import { User } from "@prisma/client";
import { useCallback } from "react";
import { useQuery } from "react-query";

export const useCurrentUserQuery = () => {
    const url = `${location.origin}/api/v1/users/current`;

    const fetchCurrentUser = useCallback(
        async (): Promise<User> => {
            const result = await fetch(url);
            const data = await result.json();
            return data;
        },
        [url]
    );

    return useQuery({
        queryKey: ['users', 'current'],
        queryFn: () => fetchCurrentUser()
    });
};