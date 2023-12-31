import { CookieOptions, createServerClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export interface AuthorizedRequest extends NextRequest {
    user: User;
}

export const fetchAuthDetails = async () => {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                remove(name: string, options: CookieOptions) {
                    cookieStore.delete({ name, ...options });
                },
            },
        }
    );

    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    const currentUser = data.session?.user;
    return currentUser;
};
