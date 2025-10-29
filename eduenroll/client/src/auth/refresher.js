import { setToken } from "./tokenStore";
import BASE_URL from '../config';
import { Api } from "../api/userApi";

let isRefreshing = false;
let refreshPromise = null;

export const requestToken = () => {
    
    if (isRefreshing){
        return refreshPromise;
    }

    isRefreshing = true;
    refreshPromise =  fetch(`${BASE_URL}/token/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
    })
    .then(async (res) => {
        if(!res.ok) {
            console.log('Failed refresh token:', res);
            throw new Error('Failed to refresh token');
        }
        const data = await res.json();
        console.log("New access token:", data.accessToken);
        setToken(data.accessToken);
        return data.accessToken;
    })
    .catch((error) => {
        console.error('Error refreshing token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/frontPage';
        // Optionally, you can redirect the user to the login page or show a notification   
        throw error;
    })
    .finally(() => {
        isRefreshing = false;
        refreshPromise = null;
    });
    return refreshPromise;
}