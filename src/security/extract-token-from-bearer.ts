export const extractTokenFromBearer = (bearer: string) => {
    const tokenParts = bearer.split(' ');
    const token = tokenParts[1];
    return token;
};