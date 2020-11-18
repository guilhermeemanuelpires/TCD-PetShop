import { http } from '../config';

export default {

    Login: (teste) => {                
        return http.post('auth', teste);
    },

    Register: (body) => {
        return http.post('auth/register', body);
    },

}