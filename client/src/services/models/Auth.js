import { http } from '../config';

export default {

    Login: (body) => {
        return http.post('auth', body);
    },

    Register: (body) => {
        return http.post('auth/register', body);
    },

    Update: (body) => {
        return http.put('auth/register', body);
    },

}