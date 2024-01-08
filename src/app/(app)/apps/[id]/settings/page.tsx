import { IPageParams } from "@/models/types/IPageParams";
import { DeleteApplication } from "./components/DeleteApplication/DeleteApplication";
import { PageHeader } from "@/components/layout/PageHeader/PageHeader";

interface IParams {
    id: number;
}

const SettingsPage = ({ params }: IPageParams<IParams>) => {

    return (
        <div>
            <PageHeader title="Settings" />
            <div>
                <DeleteApplication applicationId={params.id} />
            </div>
        </div>
    );
};

export default SettingsPage;