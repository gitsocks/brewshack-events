'use client';

import { ConfirmButton } from "@/components/buttons/ConfirmButton/ConfirmButton";

import styles from './DeleteApplication.module.css';
import { useDeleteApplicationMutation } from "@/services/mutations/use-delete-application-mutation";
import { useRouter } from "next/navigation";

interface DeleteApplicationProps {
    applicationId: number;
}

export const DeleteApplication = ({
    applicationId
}: DeleteApplicationProps) => {
    const { mutateAsync: deleteApplication, isLoading } = useDeleteApplicationMutation(applicationId);
    const router = useRouter();

    const handleDelete = async () => {
        await deleteApplication();
        router.push('/');
    };

    return (
        <div className={styles.innerContainer}>
            <div>
                <h4>Delete Application</h4>
                <p>Delete the application and all of its data.</p>
            </div>
            {isLoading ? <button disabled>Deleting ...</button> : <ConfirmButton onConfirm={() => handleDelete()}>Delete</ConfirmButton>}
        </div>
    );
};