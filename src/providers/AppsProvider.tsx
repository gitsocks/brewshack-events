import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserProvider";
import { useCurrentUserApplicationsQuery } from "@/services/queries/use-current-user-applications-query";
import { Application } from "@prisma/client";

export interface AppsContextValue {
    isLoading?: boolean;
    applications?: Application[];
    currentApplication?: Application;
    changeApplication: (application?: Application) => void;
}

export const AppsContext = createContext<AppsContextValue>({
    changeApplication: () => { }
});

export const AppsProvider = ({ children }: PropsWithChildren) => {
    const { currentUser } = useContext(CurrentUserContext);
    const { data, isLoading } = useCurrentUserApplicationsQuery(currentUser?.id);
    const [currentApplication, setCurrentApplication] = useState<Application>();

    const handleApplicationChange = (application?: Application) => {
        setCurrentApplication(application);
    };

    useEffect(() => {
        if (data) [
            setCurrentApplication(data[0])
        ];
    }, [data]);

    return (
        <AppsContext.Provider value={{
            applications: data,
            currentApplication: currentApplication,
            isLoading: isLoading,
            changeApplication: handleApplicationChange
        }}>
            {children}
        </AppsContext.Provider>
    );
};