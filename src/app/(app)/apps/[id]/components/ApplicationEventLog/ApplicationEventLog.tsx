'use client';

import { useApplicationEventLogQuery } from "@/services/queries/use-application-event-log-query";

import styles from './ApplicationEventLog.module.css';

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
                                    <td className={styles.td}>{new Date(event.createdAt).toLocaleDateString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}</td>
                                    <td className={styles.td}>{event.event}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
        </>
    );
};