'use client';

import { AuthContext } from '@/providers/AuthProvider';
import styles from './AppHeader.module.css';
import { useContext } from 'react';
import { AppSelectDropdown } from '@/components/dropdowns/AppSelectDropdown/AppSelectDropdown';
import { AppsContext } from '@/providers/AppsProvider';
import { Application } from '@prisma/client';
import { useRouter } from 'next/navigation';

export const AppHeader = () => {
    const authContext = useContext(AuthContext);
    const { applications, isLoading, changeApplication } = useContext(AppsContext);
    const router = useRouter();
    const handleSignOut = () => authContext.signOut();

    const handleApplicationChange = (application?: Application) => {
        changeApplication(application);

        if (application) {
            router.push(`/apps/${application.id}`);
        }
    };

    return (
        <div className={styles.appHeaderContainer}>
            <div className={styles.appHeaderContainerLeftSlot}>
                <h3>Brewshack</h3>
                {!isLoading && <AppSelectDropdown applications={applications} onSelectChange={handleApplicationChange} />}
            </div>
            <button className={styles.signOutButton} onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};;