import {getToken} from './tokenStore';
import { requestToken } from './refresher';

export const authFetch = async (url,options = {}) => {

    const token = getToken();
    
    if (token!=null) {
        const buildFetchOptions = (token) => ({
            ...options,
            headers: {
                ...options.headers,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        const response = await fetch(url, 
            buildFetchOptions(token)
        )
        if (response.status === 401){
            try{
                await requestToken();
            }catch (error) {
                console.error('Error refreshing token:', error);
                throw error;
            }
            const newToken = getToken();
            const retryResponse = await fetch(url,
                buildFetchOptions(newToken)
            );
            return retryResponse;
        }
        return response;
    }
    throw new Error('400: No token found');
}