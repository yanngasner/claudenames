import React, {useState} from 'react';
import {AuthenticationMode} from "../types/authenticationMode";
import {signin, signInWithGoogle, signup} from "../helpers/auth";
import {Link} from "react-router-dom";

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

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        try {
            await (authenticationMode === AuthenticationMode.Login ? signin(email, password) : signup(email, password));
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

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>{authenticationMode} to <Link to="/">Confinauds</Link>
                </h1>
                {authenticationDescription()}
                <div>
                    <input placeholder="Email" name="email" type="email" onChange={handleEmailChange}
                           value={email}></input>
                </div>
                <div>
                    <input placeholder="Password" name="password" onChange={handlePasswordChange} value={password}
                           type="password"></input>
                </div>
                <div>
                    {error ? <p>{error}</p> : null}
                    <button type="submit">Sign up</button>
                </div>
                <hr></hr>
                {alternateAuthenticationDescription()}
                <p>Or</p>
                <button onClick={googleSignIn} type="button">
                    Login with Google
                </button>
            </form>
        </div>
    );

}

export default AuthenticationPage;