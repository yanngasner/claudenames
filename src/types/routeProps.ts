import React from "react";

export default interface RouteProps {
    component: React.FunctionComponent<any>,
    authenticated: boolean,
    path: string
}