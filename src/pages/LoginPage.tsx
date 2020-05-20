import React from "react";
import AuthenticationPage from "../components/AuthenticationPage";
import {AuthenticationMode} from "../types/authenticationMode";

function LoginPage() {
    return (<AuthenticationPage authenticationMode={AuthenticationMode.Login}/>)
}

export default LoginPage