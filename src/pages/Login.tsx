import React from "react";
import AuthenticationPage from "../components/AuthenticationPage";
import {AuthenticationMode} from "../types/authenticationMode";

function Login() {
    return (<AuthenticationPage authenticationMode={AuthenticationMode.Login}/>)
}

export default Login