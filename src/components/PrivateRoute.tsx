import React from 'react';
import {Route, Redirect} from "react-router-dom";

interface PrivateRouteProps {
    component: React.FunctionComponent<any>,
    authenticated: boolean,
    path: string
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({component: Component, authenticated, path}) => {
    return (
        <Route
            path={path}
            render={(props) => authenticated === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    );
}
