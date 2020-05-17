import React from 'react';
import {Route, Redirect} from "react-router-dom";

interface PublicRouteProps {
    component: React.FunctionComponent<any>,
    authenticated: boolean,
    path: string
}

export const PublicRoute: React.FC<PublicRouteProps> = ({component: Component, authenticated, path}) => {
    return (
        <Route
            path={path}
            render={(props) => authenticated === false
                ? <Component {...props} />
                : <Redirect to='/chat'/>}
        />
    );
}
