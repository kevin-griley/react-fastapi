import decodeJwt from 'jwt-decode';
import localForage from 'localforage';
import CryptoJS from 'crypto-js';

export const setToken = async (token: string) => {
    try {
        const Token = CryptoJS.AES.encrypt(token, 'kg').toString();
        await localForage.setItem('token', Token);
    } catch (err) {
        throw new Error(err as string);
    }
};

export const getToken = async () => {
    try {
        const Token = await localForage.getItem('token');
        if (typeof Token === 'string') {
            const token = CryptoJS.AES.decrypt(Token, 'kg').toString(CryptoJS.enc.Utf8);
            return token;
        }
    } catch (err) {
        throw new Error(err as string);
    }
};

export const removeToken = async () => {
    try {
        await localForage.removeItem('token');
    } catch (err) {
        throw new Error(err as string);
    }
};

interface DecodedToken {
    exp: number;
    sub: string;
}

export const isAuthenticated = async () => {
    const token = await getToken();
    if (typeof token === 'string') {
        const decodedToken: DecodedToken = decodeJwt(token);
        const currentTime = Date.now() / 1000;
    
        if (decodedToken.exp > currentTime) {
            return token;
        }
    }
}