import { reset } from 'redux-form';
const { todoApi } = require('../Api')
const ADD_TODO_lIST_SUCCESS = 'ADD_TODO_lIST_SUCCESS';
const GET_TODO_LIST_RES = 'GET_TODO_LIST_RES';
const GET_SINGLE_TODO_RES = 'GET_SINGLE_TODO_RES';
const UPDATE_TODO_lIST_SUCCESS = 'UPDATE_TODO_lIST_SUCCESS';


let initialState = {
    todoListSuccess: {},
    getTodoListRes: null,
    getSingleTodoRes: {},
    updateTodoListSuccess: null

}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO_lIST_SUCCESS:
            return {
                ...state,
                todoListSuccess: action.data
            }
        case UPDATE_TODO_lIST_SUCCESS:
            return {
                ...state,
                updateTodoListSuccess: action.data
            }
        case GET_TODO_LIST_RES:
            return {
                ...state,
                getTodoListRes: action.data
            }
        case GET_SINGLE_TODO_RES:
            return {
                ...state,
                getSingleTodoRes: action.data
            }

        default:
            return state
    }
}




const addTodoListSuccess = (data) => ({ type: ADD_TODO_lIST_SUCCESS, data });
export const updateTodoListSuccess = (data) => ({ type: UPDATE_TODO_lIST_SUCCESS, data });
export const getTodoListRes = (data) => ({ type: GET_TODO_LIST_RES, data });
const getSingleTodoRes = (data) => ({ type: GET_SINGLE_TODO_RES, data });



export const addTodoList = (title, description, color) => async (dispatch) => {
    try {
        const response = await todoApi.addTodoList(title, description, color);
        dispatch(addTodoListSuccess(response.data));
        dispatch(reset('todo-form'));
    } catch (e) {
        dispatch(addTodoListSuccess(e.response.data));
    }
}
export const getTodoList = () => async (dispatch) => {
    try {
        const response = await todoApi.getTodoList();
        dispatch(getTodoListRes(response.data));
    } catch (e) {
        dispatch(getTodoListRes(e.response.data));
    }
}
export const deleteItem = (id) => async (dispatch) => {
    try {
        await todoApi.deleteItem(id);
    } catch (e) {
        // dispatch(getTodoListRes(e.response.data));
    }
}
export const updateTodoTask = (title, description, color, id) => async (dispatch) => {
    try {
        const response = await todoApi.updateTodoTask(title, description, color, id);
        dispatch(updateTodoListSuccess(response.statusText))
    } catch (e) {
        dispatch(updateTodoListSuccess(e.response.statusText));
    }
}
export const getTodoItem = (id) => async (dispatch) => {
    try {
        const response = await todoApi.getTodoItem(id);
        dispatch(getSingleTodoRes(response.data));
    } catch (e) {
        // dispatch(getTodoListRes(e.response.data));
    }
}


export default todoReducer;
