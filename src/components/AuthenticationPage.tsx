import React, {useState} from 'react';
import {AuthenticationMode} from "../types/authenticationMode";
import {signIn, signInWithGoogle, signUp} from "../helpers/auth";
import {Link} from "react-router-dom";
import {useRecoilState} from "recoil";
import {userNameState} from "../types/atoms";

interface AuthenticationProps {
    authenticationMode: AuthenticationMode
}

export const AuthenticationPage: React.FC<AuthenticationProps> = ({authenticationMode}) => {

    const authenticationDescription = () =>
        <p>Fill in the form below to {authenticationMode} to your account.</p>;

    const alternateAuthenticationDescription = () =>
        authenticationMode === AuthenticationMode.Login
            ? <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            : <p>Already have an account? <Link to="/login">Login</Link></p>;

    const [, setBaseUserName] = useRecoilState(userNameState)
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        try {
            await (authenticationMode === AuthenticationMode.Login
                ? signIn(email, password)
                :  signUp(email, password, userName).then(() => setBaseUserName(userName)))
        } catch (error) {
            setError(error.message);
        }
    }

    const googleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            setError(error.message);
        }
    }

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>{authenticationMode} to <Link to="/">Claude Name</Link>
                </h1>
                {authenticationDescription()}
                {authenticationMode === AuthenticationMode.SignUp
                ? <div>
                    <input placeholder="UserName" name="userName" type="username" onChange={handleUserNameChange}
                           value={userName}></input>
                </div>
                : <div></div>}
                <div>
                    <input placeholder="Email" name="email" type="email" onChange={handleEmailChange}
                           value={email}></input>
                </div>
                <div>
                    <input placeholder="Password" name="password" type="password" onChange={handlePasswordChange}
                           value={password}></input>
                </div>
                <div>
                    {error ? <p>{error}</p> : null}
                    <button type="submit">{`${authenticationMode === AuthenticationMode.Login ? 'Log In' : 'Sign up' }`}</button>
                </div>
                <hr></hr>
                {alternateAuthenticationDescription()}
                <p>Or</p>
                <button onClick={googleSignIn} type="button">
                    Login with Google (fill userName upfront)
                </button>
            </form>
        </div>
    );

}

export default AuthenticationPage;