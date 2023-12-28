import { IPageParams } from "@/models/types/IPageParams";
import { getApplicationFromServer } from "@/services/server/get-application-from-server";
import { ApplicationEventLog } from "./components/ApplicationEventLog/ApplicationEventLog";
import { ApplicationEventsSummary } from "./components/ApplicationEventsSummary/ApplicationEventsSummary";

interface IParams {
    id: number;
}

const Page = async ({ params }: IPageParams<IParams>) => {
    const { id } = params;

    const application = await getApplicationFromServer(Number(id));

    return (
        <>
            <h1>{application.name}</h1>
            <ApplicationEventsSummary applicationId={application.id} />
            <ApplicationEventLog applicationId={application.id} />
        </>
    );
};

export default Page;