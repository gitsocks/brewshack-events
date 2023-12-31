'use client';

import { brewshackEvent } from "@/brewshack";
import { createBrowserClient } from "@supabase/ssr";

const Page = () => {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const login = () => {
        brewshackEvent('login');
        supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${location.origin}/auth/callback`
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