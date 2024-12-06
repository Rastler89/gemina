export const AuthLocal = {
    setToken: (token: string) => {
        localStorage.setItem('token', token);
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    removeToken: () => {
        localStorage.removeItem('token');
    },

    isLogged: () => {
        return localStorage.getItem('token') === '123456'
    }
};