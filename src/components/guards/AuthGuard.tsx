'use client';

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

interface IAuthGuardProps extends PropsWithChildren {
    user?: User;
}

export const AuthGuard = ({ user, children }: IAuthGuardProps) => {
    const router = useRouter();

    if (!user) {
        router.push('/auth/login');
    }

    return (
        <>
            {children}
        </>
    );
};