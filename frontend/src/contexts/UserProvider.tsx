import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, removeToken, setToken } from '../utils/auth';
import { User } from '../pages/UserPage';
import { useApi } from './ApiProvider';
import { RequestResponse } from '../FastApiClient';
import { useNavigate } from 'react-router-dom';


const LOGIN_URL: string = "/login/access-token";

interface UserContext {
    user: User | null | undefined;
    setUser: (user: User | null | undefined) => void;
    login: (username: string, password: string) => Promise<RequestResponse>;
    loginDemo: () => Promise<RequestResponse>;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContext>({} as UserContext);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null | undefined>();
    const api = useApi();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const token = await isAuthenticated();
            if (token) {
                const response = await api.get('/users/me');
                setUser(response.ok ? response.body : null);
            } else {
                setUser(null);
            }
        })();
    }, [api]);

    const login = async (email: string, password: string) => {
        const result = await api.post_form(LOGIN_URL,  { username: email, password: password });

        if (result.ok) {

            if ('access_token' in result.body) {
              await setToken(result.body['access_token']);
            }

            const response = await api.get('/users/me');
            setUser(response.ok ? response.body : null);
            return response;
            
        }
        return result;
    };

    const loginDemo= async () => {
        const result = await api.post_form(LOGIN_URL,  { username: 'demo@griley.app', password: 'demoUser' });

        if (result.ok) {

            if ('access_token' in result.body) {
              await setToken(result.body['access_token']);
            }

            const response = await api.get('/users/me');
            setUser(response.ok ? response.body : null);
            return response;
            
        }
        return result;
    };

    const logout = async () => {
        await removeToken();
        setUser(null);
        navigate('/');

    };

    return (
        <UserContext.Provider value={{ user, setUser, login, loginDemo, logout }}>
            {children}
        </UserContext.Provider>
    );
}

function useUser(): UserContext {
    return useContext(UserContext);
}

export { UserProvider, useUser };