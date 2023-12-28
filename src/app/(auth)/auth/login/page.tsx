'use client';

import { createBrowserClient } from "@supabase/ssr";

const Page = () => {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const login = () => {
        supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `http://localhost:3000/auth/callback`
            }
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <p>Welcome to Brewshack Events! Please login to continue.</p>
            <button onClick={login}>Login with Github</button>
        </div>
    );
};

export default Page;