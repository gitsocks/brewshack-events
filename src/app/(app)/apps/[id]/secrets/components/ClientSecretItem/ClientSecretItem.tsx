'use client';

import { ConfirmButton } from "@/components/buttons/ConfirmButton/ConfirmButton";
import { useDeleteClientSecretMutation } from "@/services/mutations/use-delete-client-secret-mutation";
import { ClientSecret } from "@prisma/client";

import styles from './ClientSecretItem.module.css';


interface ClientSecretItemProps {
    secret: ClientSecret;
}

export const ClientSecretItem = ({
    secret
}: ClientSecretItemProps) => {
    const { mutateAsync: deleteSecret, isLoading } = useDeleteClientSecretMutation(secret.applicationId);

    return (
        <li className={styles.listItem} key={secret.id}>
            {secret.name}
            {!isLoading && <ConfirmButton confirmLabel="Confirm Delete" onConfirm={() => deleteSecret(secret.id)}>Delete</ConfirmButton>}
        </li>
    );
}; 