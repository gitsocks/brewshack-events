'use client';

import { LoadingState } from "@/components/loading/LoadingState/LoadingState";
import { useClientSecretsQuery } from "@/services/queries/use-client-secrets-query";

import styles from './ApplicationClientSecrets.module.css';
import { ClientSecretItem } from "../ClientSecretItem/ClientSecretItem";

interface ApplicationClientSecretsProps {
    applicationId: number;
}

export const ApplicationClientSecrets = ({
    applicationId
}: ApplicationClientSecretsProps) => {
    const { data: clientSecrets, isLoading } = useClientSecretsQuery(applicationId);

    return isLoading ? <LoadingState /> : (
        <ul className={styles.list}>
            {clientSecrets?.map(secret => (
                <ClientSecretItem key={secret.id} secret={secret} />
            ))}
        </ul>
    );
};