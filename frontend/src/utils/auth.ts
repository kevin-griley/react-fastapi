import decodeJwt from 'jwt-decode';


interface DecodedToken {
    exp: number;
    sub: string;
}


export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken: DecodedToken = decodeJwt(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            return false;
        }
        return token;
    }
    return false;
}
