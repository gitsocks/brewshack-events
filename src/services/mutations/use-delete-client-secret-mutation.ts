import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteClientSecretMutation = (applicationId: number) => {
    const queryClient = useQueryClient();
    let url = `${location.origin}/api/v1/applications/${applicationId}/secrets`;

    const deleteClientSecret = useCallback(
        async (secretId: number) => {
            url += `/${secretId}`;
            await fetch(url, {
                method: 'DELETE'
            });
        },
        [url]
    );

    return useMutation(deleteClientSecret, {
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [`applications/${applicationId}/secrets`] });
        }
    });
};