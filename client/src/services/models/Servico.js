import { http } from '../config';

export default {
    add: (body) => {
        return http.post('servico/add', body);
    },
    FindByiD: (id) => {
        return http.get('servico/' + id);
    },
    FindByiDCount: (id) => {
        return http.get('servico/count/' + id);
    },
    FindAllCount: () => {
        return http.get('servico/count');
    },
    Delete: (id) => {
        return http.delete('servico/delete/' + id);
    },
    Edit: (body) => {
        return http.put('servico/update', body);
    },
    FindAll: () => {
        return http.get('servico');
    }
}