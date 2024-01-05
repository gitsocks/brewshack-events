'use client';

import { useState } from 'react';
import styles from './ApplicationSecretsHeader.module.css';

import { BasicModal } from '@/components/modals/BasicModal/BasicModal';
import { CreateApplicationClientSecretForm } from '@/components/forms/CreateApplicationClientSecretForm/CreateApplicationClientSecretForm';
import { useRouter } from 'next/navigation';

export const ApplicationSecretsHeader = () => {
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
                <CreateApplicationClientSecretForm />
            </BasicModal>
        </div>
    );
};