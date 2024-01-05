'use client';

import { useState } from 'react';
import styles from './ApplicationSecretsHeader.module.css';

import { BasicModal } from '@/components/modals/BasicModal/BasicModal';
import { CreateApplicationClientSecretForm } from '@/components/forms/CreateApplicationClientSecretForm/CreateApplicationClientSecretForm';

export const ApplicationSecretsHeader = () => {
    const [isOpen, open] = useState(false);

    return (
        <div className={styles.innerContainer}>
            <h3>Client Secrets</h3>
            <button onClick={() => open(true)}>Create New</button>
            <BasicModal title='Create Secret' isOpen={isOpen} onClose={() => open(false)}>
                <CreateApplicationClientSecretForm />
            </BasicModal>
        </div>
    );
};