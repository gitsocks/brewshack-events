'use client';
import styles from './CreateApplicationForm.module.css';
import { ICreateApplicationFormPayload } from "@/models/payloads/ICreateApplicationFormPayload";
import { useCreateApplicationMutation } from '@/services/mutations/use-create-application-mutation';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from "react-hook-form";

export const CreateApplicationForm = () => {
    const { register, handleSubmit } = useForm<ICreateApplicationFormPayload>();
    const { mutateAsync: createApplication, isLoading, data: newApplication } = useCreateApplicationMutation();
    const router = useRouter();

    const onSubmit: SubmitHandler<ICreateApplicationFormPayload> = async (payload: ICreateApplicationFormPayload) => {
        console.log(payload);
        await createApplication({ ...payload });

        if (newApplication) {
            router.push(`/apps/${newApplication.id}`);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label>Application Name</label>
            <input {...register('name')} />
            <input type="submit" value={isLoading ? 'Creating ...' : 'Create'} disabled={isLoading} />
        </form>
    );
};