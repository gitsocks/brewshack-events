'use client';

import { LineChart } from "@/components/charts/LineChart/LineChart";
import { useApplicationEventsSummaryQuery } from "@/services/queries/use-application-events-summary-query";

interface IApplicationEventsSummaryProps {
    applicationId: number;
}

export const ApplicationEventsSummary = ({
    applicationId
}: IApplicationEventsSummaryProps) => {
    const { data, isLoading } = useApplicationEventsSummaryQuery(applicationId);

    return (
        <>
            <h3>Events</h3>
            {isLoading ? (<p>Loading ...</p>) : (
                <LineChart data={{ labels: data.labels, datasets: data.data }} />
            )}
        </>
    );
};