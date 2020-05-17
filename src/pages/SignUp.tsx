import React, {useState} from 'react';
import AuthenticationPage from "../components/AuthenticationPage";
import {AuthenticationMode} from "../types/authenticationMode";

function SignUp() {
    return (<AuthenticationPage authenticationMode={AuthenticationMode.SignUp}/>)
}

export default SignUp;