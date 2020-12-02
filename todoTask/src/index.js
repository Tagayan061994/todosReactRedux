import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/stylesheets/style.scss';
import './Assets/stylesheets/packages.scss';
import './Assets/stylesheets/imports.scss';
import App from './App';
import store from './Redux/redux-store';
import { Provider } from 'react-redux';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
