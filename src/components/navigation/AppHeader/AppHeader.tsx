'use client';

import { AuthContext } from '@/providers/AuthProvider';
import styles from './AppHeader.module.css';
import { useContext } from 'react';
import { AppSelectDropdown } from '@/components/dropdowns/AppSelectDropdown/AppSelectDropdown';
import { AppsContext } from '@/providers/AppsProvider';

export const AppHeader = () => {
    const authContext = useContext(AuthContext);
    const { applications, isLoading } = useContext(AppsContext);

    const handleSignOut = () => authContext.signOut();

    return (
        <div className={styles.appHeaderContainer}>
            <div className={styles.appHeaderContainerLeftSlot}>
                <h3>Brewshack</h3>
                {!isLoading && <AppSelectDropdown applications={applications} />}
            </div>
            <button className={styles.signOutButton} onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};;