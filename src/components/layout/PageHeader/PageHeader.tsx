'use client';

import { useRouter } from "next/navigation";

import styles from './PageHeader.module.css';

interface PageHeaderProps {
    title: string;
}

export const PageHeader = ({
    title
}: PageHeaderProps) => {
    const router = useRouter();

    return (
        <div className={styles.header}>
            <h3>{title}</h3>
            <button onClick={() => router.back()}>Back</button>
        </div>
    );
};