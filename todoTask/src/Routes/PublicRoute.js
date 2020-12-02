import React from 'react';
import { isLogin } from '../Utils/Auth';
import { Route, Redirect } from 'react-router-dom';

class PublicRoute extends React.Component {
    render() {
        return (
            (isLogin() && this.props.restricted) ?
                <Redirect to="/" />
                : <Route {...this.props} />
        );
    }
}

export default PublicRoute;
