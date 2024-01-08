import { PropsWithChildren } from "react";

import styles from './EmptyState.module.css';

export const EmptyState = ({ children }: PropsWithChildren) => (
    <div className={styles.innerContainer}>
        <p>{children}</p>
    </div>
);