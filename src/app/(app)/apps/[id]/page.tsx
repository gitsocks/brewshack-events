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
            <h1>⬅️<Link href={{ pathname: '/' }}>{application.name}</Link></h1>
            <p>{application.clientId}</p>
            <ApplicationEventsSummary applicationId={application.id} />
            <ApplicationEventLog applicationId={application.id} />
        </>
    );
};

export default Page;