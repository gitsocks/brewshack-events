'use client';

import { useApplicationEventLogQuery } from "@/services/queries/use-application-event-log-query";

import styles from './ApplicationEventLog.module.css';
import { formatDate } from "@/utils/format-date";

interface IApplicationEventLogProps {
    applicationId: number;
}

export const ApplicationEventLog = ({
    applicationId
}: IApplicationEventLogProps) => {
    const { data, isLoading } = useApplicationEventLogQuery(applicationId);

    return (
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