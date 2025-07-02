import React, {createContext, useContext, useState} from 'react';


const UserContext = createContext();


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    return(
        <UserContext.Provider value={{user, setUser}}>
            <TokenContext.Provider value={{token, setToken}}>
                {children}
            </TokenContext.Provider>
        </UserContext.Provider> 
    )
}

export const useUser = () => useContext(UserContext);