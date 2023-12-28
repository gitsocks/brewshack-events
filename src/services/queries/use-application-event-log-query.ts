import { IApplicationEvent } from "@/database/types/application-event";
import { useCallback } from "react";
import { useQuery } from "react-query";

export const useApplicationEventLogQuery = (applicationId: number) => {
    const url = `${location.origin}/api/v1/applications/${applicationId}/events/log`;

    const fetchApplicationEventLog = useCallback(
        async (): Promise<IApplicationEvent[]> => {
            const result = await fetch(url);
            const data = await result.json();
            return data;
        },
        [url]
    );

    return useQuery({
        queryKey: ['applications', 'events', 'log'],
        queryFn: () => fetchApplicationEventLog()
    });
};