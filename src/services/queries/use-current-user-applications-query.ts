import { UserApplication } from "@/database/types/user-application";
import { useCallback } from "react";
import { useQuery } from "react-query";

export const useCurrentUserApplicationsQuery = (userId?: string) => {
    const url = `${location.origin}/api/v1/applications?roleId=${userId}`;

    const fetchCurrentUserApplications = useCallback(
        async (): Promise<UserApplication[]> => {
            const result = await fetch(url);
            const data = await result.json();
            return data;
        },
        [url]
    );

    return useQuery({
        queryKey: ['applications'],
        queryFn: () => fetchCurrentUserApplications()
    });
};