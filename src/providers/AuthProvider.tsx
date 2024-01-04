'use client';

import { LoadingState } from "@/components/loading/LoadingState/LoadingState";
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

    useEffect(() => {
        supabase.auth.onAuthStateChange(event => {
            console.log(event);
        });

        supabase.auth.getSession()
            .then(({ data, error }) => {
                if (data.session) {
                    setSession(data.session);
                }

                setIsLoading(false);
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
    ) : <LoadingState />;
};

export const useAuthContext = () => useContext(AuthContext);