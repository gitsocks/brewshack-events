import { ICreateClientSecretDto } from "@/models/dtos/ICreateClientSecretDto";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";

export const useCreateClientSecretMutation = (applicationId: number) => {
    const queryClient = useQueryClient();
    const url = `${location.origin}/api/v1/applications/${applicationId}/secrets`;

    const createClientSecret = useCallback(
        async (data: ICreateClientSecretDto) => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            return await response.json();
        },
        [url]
    );

    return useMutation(createClientSecret, {
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [`applications/${applicationId}/secrets`] });
        }
    });
};