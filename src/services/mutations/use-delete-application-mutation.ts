import { useCallback } from "react";
import { useMutation } from "react-query";

export const useDeleteApplicationMutation = (applicationId: number) => {

    const deleteApplication = useCallback(
        async () => {
            let url = `${location.origin}/api/v1/applications/${applicationId}`;
            await fetch(url, {
                method: 'DELETE'
            });
        },
        [applicationId]
    );

    return useMutation(deleteApplication);
};