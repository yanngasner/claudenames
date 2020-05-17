import React from 'react';
import {Route, Redirect} from "react-router-dom";
import RouteProps from "../types/routeProps";


export const PrivateRoute: React.FC<RouteProps> = ({component: Component, authenticated, path}) => {
    return (
        <Route
            path={path}
            render={(props) => authenticated === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    );
}

export const PublicRoute: React.FC<RouteProps> = ({component: Component, authenticated, path}) => {
    return (
        <Route
            path={path}
            render={(props) => authenticated === false
                ? <Component {...props} />
                : <Redirect to='/game'/>}
        />
    );
}
