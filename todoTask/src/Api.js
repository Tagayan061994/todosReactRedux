const axios = require('axios');

export class Api {
    static url = "https://todo.eachbase.com/api/HakobTagayan/todos"
}

const instance = axios.create({
    baseURL: Api.url
});

export const todoApi = {

    addTodoList(title,description,color) {
        return instance.post('', {title, description, color})
    },

    getTodoList() {
        return instance.get('')
    },

    deleteItem(id) {
        console.log(id);
        return instance.delete(`/${id}`)
    },  
    getTodoItem (id) {
        return instance.get(`/${id}`)
    },
    updateTodoTask (title, description, color,id) {
        return instance.patch(`/${id}`,{title, description, color})
    }

}
