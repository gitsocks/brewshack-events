import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteClientSecretMutation = (applicationId: number) => {
    const queryClient = useQueryClient();


    const deleteClientSecret = useCallback(
        async (secretId: number) => {
            let url = `${location.origin}/api/v1/applications/${applicationId}/secrets/${secretId}`;
            await fetch(url, {
                method: 'DELETE'
            });
        },
        [applicationId]
    );

    return useMutation(deleteClientSecret, {
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [`applications/${applicationId}/secrets`] });
        }
    });
};