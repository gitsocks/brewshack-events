export const brewshackEvent = async (
    event: string,
    logInDevelopment = true
) => {
    if (!logInDevelopment) return;

    const BREWSHACK_URL = process.env.NEXT_PUBLIC_BREWSHACK_URL!;
    const CLIENT_ID = process.env.NEXT_PUBLIC_BREWSHACK_CLIENT_ID!;
    const CLIENT_SECRET = process.env.NEXT_PUBLIC_BREWSHACK_CLIENT_SECRET!;

    try {
        await fetch(BREWSHACK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                clientId: CLIENT_ID,
                'authorization': `Bearer ${CLIENT_SECRET}`
            },
            body: JSON.stringify({ event: event }),
        });
    } catch (error) {
        const err = error as Error;
        console.info('Brewshack Error', err.message);
    }
};