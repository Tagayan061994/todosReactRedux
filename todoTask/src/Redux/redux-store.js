import { applyMiddleware, combineReducers, createStore } from 'redux';
import todoReducer from './todo-reducer';
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'


const reducers = combineReducers({
    form: formReducer,
    todo: todoReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

window.store = store
export default store;

