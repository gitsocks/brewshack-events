'use client';

import { createBrowserClient } from "@supabase/ssr";
import { Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

interface AuthContextValue {
    signOut: () => void;
    currentUser: User | null;
}

export const AuthContext = createContext<AuthContextValue>({
    signOut: () => { },
    currentUser: null
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const [session, setSession] = useState<Session>();
    const [isLoading, setIsLoading] = useState(true);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const fetchSession = async () => {
        const { data, error } = await supabase.auth.getSession();

        if (data.session) {
            setSession(data.session);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        fetchSession();

        supabase.auth.onAuthStateChange(event => {
            console.log(event);
        });

    }, [supabase]);

    const signOut = async () => {
        await supabase.auth.signOut();
        location.reload();
    };

    if (!isLoading && !session) {
        router.push('/auth/login');
    }

    return session ? (
        <AuthContext.Provider value={{
            signOut: signOut,
            currentUser: session.user
        }}>
            {children}
        </AuthContext.Provider>
    ) : <>Not logged in</>;
};

export const useAuthContext = () => useContext(AuthContext);