import { ICreateClientSecretFormPayload } from "@/models/payloads/ICreateClientSecretFormPayload";
import { SubmitHandler, useForm } from "react-hook-form";

import styles from './CreateApplicationClientSecretForm.module.css';
import { useCreateClientSecretMutation } from "@/services/mutations/use-create-client-secret-mutation";

export const CreateApplicationClientSecretForm = () => {
    const { register, handleSubmit } = useForm<ICreateClientSecretFormPayload>();
    const { mutateAsync: createClientSecret, isLoading, data: newClientSecret } = useCreateClientSecretMutation(1);

    const onSubmit: SubmitHandler<ICreateClientSecretFormPayload> = async (payload: ICreateClientSecretFormPayload) => {
        await createClientSecret({ ...payload });
    };

    return !newClientSecret ? (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label>Application Name</label>
            <input {...register('name')} />
            <input type="submit" value={isLoading ? 'Creating ...' : 'Create'} disabled={isLoading} />
        </form>
    ) : (
        <div>
            <p>Your new client secret is:</p>
            <p><b>{newClientSecret.secret}</b></p>
            <p>Be sure to copy and store in a secure place. The secret will not be shown again.</p>
        </div>
    );
};