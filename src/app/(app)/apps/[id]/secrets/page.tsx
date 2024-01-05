import { ApplicationClientSecrets } from "./components/ApplicationClientSecrets/ApplicationClientSecrets";
import { ApplicationSecretsHeader } from "./components/ApplicationSecretsHeader/ApplicationSecretsHeader";

const SecretsPage = () => {

    return (
        <>
            <ApplicationSecretsHeader />
            <ApplicationClientSecrets />
        </>
    );
};

export default SecretsPage;