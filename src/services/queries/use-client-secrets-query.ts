import { ClientSecret } from "@prisma/client";
import { useCallback } from "react";
import { useQuery } from "react-query";

export const useClientSecretsQuery = (applicationId: number) => {
    const url = `${location.origin}/api/v1/applications/${applicationId}/secrets`;

    const fetchClientSecrets = useCallback(
        async (): Promise<ClientSecret[]> => {
            const result = await fetch(url);
            const data = await result.json();
            return data;
        },
        [url]
    );

    return useQuery({
        queryKey: [`applications/${applicationId}/secrets`],
        queryFn: () => fetchClientSecrets()
    });
};