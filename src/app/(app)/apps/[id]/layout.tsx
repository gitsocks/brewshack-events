import { IPageParams } from "@/models/types/IPageParams";
import { getApplicationFromServer } from "@/services/server/get-application-from-server";
import Link from "next/link";
import { PropsWithChildren } from "react";


interface IParams {
    id: number;
}

type ILayoutParams = IPageParams<IParams> & PropsWithChildren;

export default async function AppsLayout({ params, children }: ILayoutParams) {
    const { id } = params;
    const application = await getApplicationFromServer(Number(id));

    return (
        <>
            <h1>⬅️<Link href={{ pathname: '/' }}>{application.name}</Link></h1>
            {children}
        </>
    );
}