import { useUser, useToken } from '../context/authProvider.js';


// because I can only use useUser and useToken inside a component or a custom hook, I will create a custom hook to use the user and token context
// this feels stupid, but it's the only way to use the context inside an async function
export const userApi = ()=>{
    const { user, setUser } = useUser();
    const { token, setToken } = useToken();
    
    const login = async (username, password) => {
        try{
            const res = await fetch('/eduenroll/api/users/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                }
            )
            const resJson = await res.json();

            switch(res.status) {
                case 200:
                    setUser(resJson.data);
                    setToken(res.accessToken);
                    return await res.json();
                case 401:
                    throw new Error('Invalid username or password');
                case 403:
                    throw new Error('Unauthorized access');
                default:
                    throw new Error('An error occurred while logging in');
            }

        }catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    const signup = async (userData) => {
        try {
            const res = await fetch('/eduenroll/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!res.ok) {
                throw new Error('Network response was not ok' + res.statusText);
            }
            return await res.json();
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    }

    return{
        login,
        signup
    }
}