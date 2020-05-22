import React from "react";

export default interface RouteProps {
    render : () => JSX.Element,
    authenticated: boolean | null,
    path: string
}