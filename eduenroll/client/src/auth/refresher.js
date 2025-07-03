import { setToken } from "./tokenStore";

let isRefreshing = false;
let refreshPromise = null;

export const requestToken = () => {
    if (isRefreshing){
        return refreshPromise;
    }

    isRefreshing = true;
    refreshPromise =  fetch('/eduenroll/api/token/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(async (res) => {
        if(!res.ok) {
            throw new Error('Failed to refresh token');
        }
        const data = await res.json();
        setToken(data.Token);
        return data.Token;
    })
    .catch((error) => {
        console.error('Error refreshing token:', error);
        throw error;
    })
    .finally(() => {
        isRefreshing = false;
        refreshPromise = null;
    });
    return refreshPromise;
}