'use client';

import { ConfirmButton } from "@/components/buttons/ConfirmButton/ConfirmButton";

import styles from './DeleteApplication.module.css';

interface DeleteApplicationProps {
    applicationId: number;
}

export const DeleteApplication = ({
    applicationId
}: DeleteApplicationProps) => {


    return (
        <div className={styles.innerContainer}>
            <div>
                <h4>Delete Application</h4>
                <p>Delete the application and all of its data.</p>
            </div>
            <ConfirmButton onConfirm={() => console.log('delete')}>Delete</ConfirmButton>
        </div>
    );
};