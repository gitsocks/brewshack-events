import { CreateApplicationForm } from "@/components/forms/CreateApplicationForm/CreateApplicationForm";

import styles from './page.module.css';
import Link from "next/link";

const Page = () => {
    return (
        <main>
            <div className={styles.innerContainer}>
                <p>⬅️ <Link href={{ pathname: '/' }}>Back</Link></p>
                <h2>Create a new application</h2>
                <p>The first step to start tracking your application&apos;s events.</p>
                <CreateApplicationForm />
            </div>
        </main>
    );
};

export default Page;