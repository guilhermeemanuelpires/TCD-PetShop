import { http } from '../config';

export default {

    add: (body) => {
        return http.post('endereco/add', body);
    },
    FindByiD: (id) => {
        return http.get('endereco/' + id);
    },
    FindByiDCount: (id) => {
        return http.get('endereco/count/' + id);
    },
    Delete: (id) => {
        return http.delete('endereco/delete/' + id);
    },
    Edit: (body) => {
        return http.put('endereco/update', body)
    }

}