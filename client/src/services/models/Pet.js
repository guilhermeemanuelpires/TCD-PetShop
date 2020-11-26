import { http } from '../config';

export default {

    add: (body) => {
        return http.post('pet/add', body);
    },
    Find: () => {
        return http.get('pet/findall');
    },
    FindByiD: (id) => {
        return http.get('pet/' + id);
    },
    Delete: (id) => {
        return http.delete('pet/delete/' + id);
    },
    Edit :(body)=>{
        return http.put('pet/update', body)
    }

}