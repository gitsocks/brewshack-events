import { IPageParams } from "@/models/types/IPageParams";
import { getApplicationFromServer } from "@/services/server/get-application-from-server";
import { ApplicationEventLog } from "./components/ApplicationEventLog/ApplicationEventLog";
import { ApplicationEventsSummary } from "./components/ApplicationEventsSummary/ApplicationEventsSummary";
import Link from "next/link";

interface IParams {
    id: number;
}

const Page = async ({ params }: IPageParams<IParams>) => {
    const { id } = params;

    const application = await getApplicationFromServer(Number(id));

    return (
        <>
            <div className="flex space-between">
                <p>Client Id: {application.clientId}</p>
                <p>Client Secret: <Link href={`${application.id}/secrets`}>View Secrets</Link></p>
            </div>
            <ApplicationEventsSummary applicationId={application.id} />
            <ApplicationEventLog applicationId={application.id} />
        </>
    );
};

export default Page;