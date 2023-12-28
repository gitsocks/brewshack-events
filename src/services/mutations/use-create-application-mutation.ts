import { ICreateApplicationDto } from "@/models/dtos/ICreateApplicationDto";
import { Application } from "@prisma/client";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";

export const useCreateApplicationMutation = () => {
    const queryClient = useQueryClient();
    const url = `${location.origin}/api/v1/applications`;

    const createApplication = useCallback(
        async (data: ICreateApplicationDto): Promise<Application> => {
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

    return useMutation(createApplication, {
        onSuccess: () => {
            queryClient.invalidateQueries('applications');
        }
    });
};