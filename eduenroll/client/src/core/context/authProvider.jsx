import React, {createContext, useContext, useState,useEffect} from 'react';
import { removeToken } from '../../auth/tokenStore';


const UserContext = createContext();


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem('user');
            setUser(updatedUser ? JSON.parse(updatedUser) : null);
        }
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const clearUser = () => {
        removeToken();
        setUser(null);
        localStorage.removeItem('user');
        document.cookie = 'refreshToken=; Max-Age=0; path=/;';
    };

    return(
        <UserContext.Provider value={{ user, clearUser, setUser }}>        
                {children}
        </UserContext.Provider> 
    )
}

export const useUser = () => useContext(UserContext);