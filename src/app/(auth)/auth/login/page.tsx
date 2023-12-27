'use client';

import { createBrowserClient } from "@supabase/ssr";

export default () => {
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
        <button onClick={login}>Login</button>
    );
};