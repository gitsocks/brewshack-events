'use client';

import { useState } from 'react';
import styles from './ApplicationSecretsHeader.module.css';

import { BasicModal } from '@/components/modals/BasicModal/BasicModal';
import { CreateApplicationClientSecretForm, CreateApplicationClientSecretFormProps } from '@/components/forms/CreateApplicationClientSecretForm/CreateApplicationClientSecretForm';
import { useRouter } from 'next/navigation';

type ApplicationSecretsHeaderProps = CreateApplicationClientSecretFormProps;

export const ApplicationSecretsHeader = ({
    ...props
}: ApplicationSecretsHeaderProps) => {
    const [isOpen, open] = useState(false);
    const router = useRouter();

    return (
        <div className={styles.innerContainer}>
            <h3>Client Secrets</h3>
            <div className={styles.buttonGroup}>
                <button onClick={() => router.back()}>Back</button>
                <button onClick={() => open(true)}>Create New</button>
            </div>
            <BasicModal title='Create Secret' isOpen={isOpen} onClose={() => open(false)}>
                <CreateApplicationClientSecretForm {...props} />
            </BasicModal>
        </div>
    );
};