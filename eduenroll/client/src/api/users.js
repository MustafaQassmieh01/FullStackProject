import {setToken} from '../auth/tokenStore.js';
// because I can only use useUser and useToken inside a component or a custom hook, I will create a custom hook to use the user and token context
// this feels stupid, but it's the only way to use the context inside an async function
export const users ={
    
    login : async (username, password) => {
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
            if (!res.ok) {
                throw new Error('Network response was not ok' + res.statusText);
            }

            setToken(resJson.token); // Store the token in local storage or context


            switch(res.status) {
                case 200:
                    return resJson; // Return the user data on successful login
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
    },

    signup : async (userData) => {
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
    },

    
}