import decodeJwt from 'jwt-decode';

export const setToken = (token: string) => {
    try {
        localStorage.setItem('token', token);
    } catch (err) {
        throw new Error(err as string);
    }
};

export const getToken = () => {
    try {
        return localStorage.getItem('token');
    } catch (err) {
        throw new Error(err as string);
    }
};

export const removeToken = () => {
    try {
        localStorage.removeItem('token');
    } catch (err) {
        throw new Error(err as string);
    }
};

interface DecodedToken {
    exp: number;
    sub: string;
}

export const isAuthenticated = () => {
    const token = getToken();
    if (typeof token === 'string') {
        const decodedToken: DecodedToken = decodeJwt(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
            return token;
        }
    }
    return null;
}