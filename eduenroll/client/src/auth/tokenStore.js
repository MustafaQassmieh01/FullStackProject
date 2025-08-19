export const setToken = (newToken) => {
    localStorage.setItem('token', newToken);
};
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');