export const bodyFromRequest = async <T>(req: Request) => {
    const body = await req.json();
    return body as T;
};