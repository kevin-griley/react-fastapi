import { createContext, useContext, } from 'react';
import { isAuthenticated } from '../utils/auth';
import { User } from '../pages/UserPage';
import { useQuery } from '@tanstack/react-query';
import { useApi } from './ApiProvider';

interface UserContext {
    user: User | null | undefined;
    login: Function;
    logout: Function;
}

const UserContext = createContext<UserContext>({} as UserContext);

export default function UserProvider({ children }: { children: React.ReactNode }) {

    const api = useApi();

    const { data: userData, refetch } = useQuery(['users', 'me'], async () => {
        const token = await isAuthenticated();
        if (token) {
            const response = await api.get('/users/me');
            return response.ok ? response.body as User : null;
        }
        else {
            return null;
        }
    });

    const login = async (username: string, password: string) => {
        const r = await api.login({ username, password });
        if (r.ok) {
            await refetch();
            return r.ok;
        }
        return r;
    };

    const logout = async () => {
        await api.logout();
        await refetch();
    };

    return (
        <UserContext.Provider value={{ user: userData, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}