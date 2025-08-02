import React, {createContext, useContext, useState} from 'react';


const UserContext = createContext();


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    

    return(
        <UserContext.Provider value={{user, setUser}}>        
                {children}
        </UserContext.Provider> 
    )
}

export const useUser = () => useContext(UserContext);