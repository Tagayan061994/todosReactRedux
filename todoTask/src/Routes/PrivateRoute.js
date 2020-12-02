import React from 'react';
import { isLogin } from '../Utils/Auth';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
                : <Redirect to="/404" />
        )} />
    );
};

export default PrivateRoute;
