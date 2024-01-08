import { IPageParams } from "@/models/types/IPageParams";
import { getApplicationFromServer } from "@/services/server/get-application-from-server";
import { PropsWithChildren } from "react";
import { ApplicationHeader } from "./components/ApplicationHeader/ApplicationHeader";

interface IParams {
    id: number;
}

type ILayoutParams = IPageParams<IParams> & PropsWithChildren;

export default async function AppsLayout({ params, children }: ILayoutParams) {
    const { id } = params;
    const application = await getApplicationFromServer(Number(id));

    return (
        <>
            <ApplicationHeader applicationId={id} applicationName={application.name} />
            {children}
        </>
    );
}