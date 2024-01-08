import { IPageParams } from "@/models/types/IPageParams";
import { ApplicationClientSecrets } from "./components/ApplicationClientSecrets/ApplicationClientSecrets";
import { ApplicationSecretsHeader } from "./components/ApplicationSecretsHeader/ApplicationSecretsHeader";

interface IParams {
    id: number;
}

const SecretsPage = ({ params }: IPageParams<IParams>) => {
    const { id } = params;

    return (
        <>
            <ApplicationSecretsHeader applicationId={id} />
            <ApplicationClientSecrets applicationId={id} />
        </>
    );
};

export default SecretsPage;