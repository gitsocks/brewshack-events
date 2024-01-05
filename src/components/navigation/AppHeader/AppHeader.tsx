'use client';

import { AuthContext } from '@/providers/AuthProvider';
import styles from './AppHeader.module.css';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

export const AppHeader = () => {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    const handleSignOut = () => authContext.signOut();

    return (
        <div className={styles.appHeaderContainer}>
            <div className={styles.appHeaderContainerLeftSlot}>
                <h3>Brewshack</h3>
            </div>
            <div className={styles.buttonGroup}>
                <button onClick={() => router.push('/')}>Applications</button>
                <button className={styles.signOutButton} onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    );
};;