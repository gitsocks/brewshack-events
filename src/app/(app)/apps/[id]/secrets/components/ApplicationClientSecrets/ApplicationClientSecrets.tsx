'use client';

import { LoadingState } from "@/components/loading/LoadingState/LoadingState";
import { useClientSecretsQuery } from "@/services/queries/use-client-secrets-query";

interface ApplicationClientSecretsProps {
    applicationId: number;
}

export const ApplicationClientSecrets = ({
    applicationId
}: ApplicationClientSecretsProps) => {
    const { data: clientSecrets, isLoading } = useClientSecretsQuery(applicationId);

    return isLoading ? <LoadingState /> : (
        <ul>
            {clientSecrets?.map(secret => (
                <li key={secret.id}>{secret.name}</li>
            ))}
        </ul>
    );
};