import { IPageParams } from "@/models/types/IPageParams";
import { getApplicationFromServer } from "@/services/server/get-application-from-server";

interface IParams {
    id: number;
}

const Page = async ({ params }: IPageParams<IParams>) => {
    const { id } = params;

    const application = await getApplicationFromServer(Number(id));

    return (
        <>
            <h1>{application.name}</h1>
            <h3>Events</h3>
        </>
    );
};

export default Page;