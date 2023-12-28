'use client';

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface IAuthGuardProps {
    user?: User;
    isLoggedInPath: string;
}

export const AuthGuard = ({ user, isLoggedInPath }: IAuthGuardProps) => {
    const router = useRouter();

    if (!user) {
        router.push('/auth/login');
    } else {
        router.push(isLoggedInPath);
    }

    return <p>Checking auth state ...</p>;
};