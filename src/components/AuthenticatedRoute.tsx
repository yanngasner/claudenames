import React from 'react';
import {Route, Redirect} from "react-router-dom";

interface RouteProps {
    render : () => JSX.Element,
    authenticated: boolean | null,
    path: string
}

export const PrivateRoute: React.FC<RouteProps> = ({render, authenticated, path}) => {
    return (
        <Route
            exact path={path}
            render={(props) => authenticated === null
                ? <div/>
                : authenticated
                    ? render()
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}
        />
    );
}

export const PublicRoute: React.FC<RouteProps> = ({render, authenticated, path}) => {
    return (
        <Route
            exact path={path}
            render={() => authenticated === null
                ? <div/>
                : authenticated
                ? <Redirect to='/'/>
                : render()}
        />
    );
}
