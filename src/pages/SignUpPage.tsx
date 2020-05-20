import React from 'react';
import AuthenticationPage from "../components/AuthenticationPage";
import {AuthenticationMode} from "../types/authenticationMode";

function SignUpPage() {
    return (<AuthenticationPage authenticationMode={AuthenticationMode.SignUp}/>)
}

export default SignUpPage;