import database, { DatabaseQuery } from "@/database";
import { getCurrentUserQuery } from "@/database/queries/user/get-current-user";
import { User } from "@prisma/client";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    cookieStore.set({ name, value, ...options });
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

    if (!currentUser?.id) throw new Error('Current user has no id');

    const databaseQuery: DatabaseQuery<User> = {
        query: (prisma) => getCurrentUserQuery(prisma, currentUser.id)
    };

    const user = await database(databaseQuery);
    return Response.json(user);
}