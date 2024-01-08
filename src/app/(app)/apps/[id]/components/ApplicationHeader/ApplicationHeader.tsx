'use client';
import styles from './ApplicationHeader.module.css';
import Link from "next/link";

interface ApplicationHeaderProps {
    applicationId: number;
    applicationName: string;
}

export const ApplicationHeader = ({
    applicationId,
    applicationName
}: ApplicationHeaderProps) => {
    return (
        <div className={styles.header}>
            <h1>{applicationName}</h1>
            <Link href={`/apps/${applicationId}/settings`}><button>Settings</button></Link>
        </div>
    );
};