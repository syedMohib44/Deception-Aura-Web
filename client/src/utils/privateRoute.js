import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { JWTDATA } from '../utils/auth';

const PrivateRoute = ({ component: Component, computedMatch: match }) => {
    const isLoggedIn = JWTDATA();
    return (
        <Route {...match}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default PrivateRoute;