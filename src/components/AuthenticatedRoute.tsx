import React from 'react';
import {Route, Redirect} from "react-router-dom";
import RouteProps from "../types/routeProps";


export const PrivateRoute: React.FC<RouteProps> = ({render, authenticated, path}) => {
    return (
        <Route
            exact path={path}
            render={(props) => authenticated === null
                ? <div></div>
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
            render={(props) => authenticated === null
                ? <div></div>
                : authenticated
                ? <Redirect to='/menu'/>
                : render()}
        />
    );
}
