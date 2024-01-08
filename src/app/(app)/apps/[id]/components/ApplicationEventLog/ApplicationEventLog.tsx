'use client';

import { useApplicationEventLogQuery } from "@/services/queries/use-application-event-log-query";

import styles from './ApplicationEventLog.module.css';
import { formatDate } from "@/utils/format-date";
import { EmptyState } from "@/components/layout/EmptyState/EmptyState";
import Link from "next/link";

interface IApplicationEventLogProps {
    applicationId: number;
}

export const ApplicationEventLog = ({
    applicationId
}: IApplicationEventLogProps) => {
    const { data, isLoading } = useApplicationEventLogQuery(applicationId);

    return !isLoading && data?.length == 0 ? (
        <EmptyState>No event log yet. Follow <Link href={{ pathname: 'https://github.com/gitsocks/brewshack-events/blob/main/README.md' }}>this document</Link> to log your first event 😁.</EmptyState>
    ) : (
        <>
            <h3>Log</h3>
            {isLoading && !data ? (
                <p>Loading events ...</p>
            ) :
                (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Date</th>
                                <th className={styles.th}>Event</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map(event => (
                                <tr key={event.id}>
                                    <td className={styles.td}>{formatDate(event.createdAt)}</td>
                                    <td className={styles.td}>{event.event}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
        </>
    );
};