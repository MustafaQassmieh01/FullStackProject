import {getToken} from './tokenStore';
import { requestToken } from './refresher';

export const authFetch = async (url,options = {}) => {

    const token = getToken();
    if (!token){
        throw new Error('400: No Token Found');
    }
    const buildFetchOptions = (tokenToUse) => ({
        ...options,
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenToUse}`
        }
    });

    let response = await fetch(url, buildFetchOptions(token))

    if (response.status === 401){
        try{
            await requestToken();
            const newToken = getToken();

            if (!newToken) throw new Error('401: Failed to refresh token');
            response = await fetch(url, buildFetchOptions(newToken));
            localStorage.setItem('token', newToken);

        }catch (error) {
            console.log('Error refreshing token:', response.message,response);
            console.error('Error refreshing token:', response.message,response);
            throw error;
        }
        
        if(!response.ok){
            const errorText = await response.text()
            throw new Error(`${response.status}:${errorText || response.message}`)
        }
        
        
    }
    return response;
}