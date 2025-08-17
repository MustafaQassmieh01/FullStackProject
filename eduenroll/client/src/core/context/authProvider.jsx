import React, {createContext, useContext, useState,useEffect} from 'react';


const UserContext = createContext();


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }, []);

    return(
        <UserContext.Provider value={{user, setUser}}>        
                {children}
        </UserContext.Provider> 
    )
}

export const useUser = () => useContext(UserContext);