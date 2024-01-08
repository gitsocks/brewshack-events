'use client';

import { LineChart } from "@/components/charts/LineChart/LineChart";
import { EmptyState } from "@/components/layout/EmptyState/EmptyState";
import { LoadingState } from "@/components/loading/LoadingState/LoadingState";
import { useApplicationEventsSummaryQuery } from "@/services/queries/use-application-events-summary-query";
import Link from "next/link";

interface IApplicationEventsSummaryProps {
    applicationId: number;
}

export const ApplicationEventsSummary = ({
    applicationId
}: IApplicationEventsSummaryProps) => {
    const { data, isLoading } = useApplicationEventsSummaryQuery(applicationId);

    return !isLoading && data.labels.length > 0 ? (
        <>
            <h3>Events</h3>
            {isLoading ? (<LoadingState />) : (
                <LineChart data={data} />
            )}
        </>
    ) : (
        <EmptyState>No event summary yet. Follow <Link href={{ pathname: 'https://github.com/gitsocks/brewshack-events/blob/main/README.md' }}>this document</Link> to log your first event 😁.</EmptyState>
    );
};