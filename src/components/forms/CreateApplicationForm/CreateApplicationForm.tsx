'use client';
import styles from './CreateApplicationForm.module.css';
import { ICreateApplicationFormPayload } from "@/models/payloads/ICreateApplicationFormPayload";
import { SubmitHandler, useForm } from "react-hook-form";

export const CreateApplicationForm = () => {
    const { register, handleSubmit } = useForm<ICreateApplicationFormPayload>();

    const onSubmit: SubmitHandler<ICreateApplicationFormPayload> = (payload: ICreateApplicationFormPayload) => {

    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label>Application Name</label>
            <input {...register('name')} />
            <input type="submit" value="Create" />
        </form>
    );
};