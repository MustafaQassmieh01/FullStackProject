import {setToken} from '../auth/tokenStore.js';
import { authFetch } from '../auth/auth.js';
import BASE_URL from '../config.js';
import { parseResponse } from './response';
// because I can only use useUser and useToken inside a component or a custom hook, I will create a custom hook to use the user and token context
// this feels stupid, but it's the only way to use the context inside an async function
export const users ={
    
    login : async (username, password) => {
        try{
            const res = await fetch(`${BASE_URL}/users/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include', 
                    body: JSON.stringify({ username, password })
                }
            )
            const resJson = await parseResponse(res, { raw: true });
            setToken(resJson.accessToken); // Store the token in local storage or context
            localStorage.setItem('user', JSON.stringify(resJson.data)); // Store user data in local storage
            return resJson; // Return full response (accessToken + data)

        }catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    signup : async (userData) => {
        try {
            const res = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
               
            });
            console.log('User data:', userData);
            return await parseResponse(res, { raw: true });
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    },
   
    changePassword : async (oldPassword, newPassword) => {
        try {
            const res = await authFetch(`/users/password`, {
                method: 'PATCH',
                body: JSON.stringify({ oldPassword, newPassword })
            });
            return await parseResponse(res, { raw: true });
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }

    },

    getUsers: async() => {
        try {
            const res = await authFetch('/users', {
                method: 'GET'
            });
            return await parseResponse(res);
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },
    
    deleteUser: async(userId) => {
        try {
            const res = await authFetch(`/users/${userId}`, {
                method: 'DELETE'
            });
            return await parseResponse(res);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },
    getUserById: async(userId) => {
        try {
            const res = await authFetch(`/users/${userId}`, {
                method: 'GET'
            });
            return await parseResponse(res);
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    },
}