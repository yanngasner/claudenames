import React, {useState} from 'react';
import {AuthenticationMode} from "../types/authenticationMode";
import {signIn, signUp} from "../services/auth";
import {Link} from "react-router-dom";
import {useRecoilState} from "recoil";
import {userNameState} from "../types/atoms";
import title from "../resources/CLAUDE_NAMES_title_v2.png";
import './AuthenticationPage.css';
import {MenuButton} from "./GameButtons";
import {Team} from "../types/enums";

interface AuthenticationProps {
    authenticationMode: AuthenticationMode
}

export const AuthenticationPage: React.FC<AuthenticationProps> = ({authenticationMode}) => {

    const authenticationDescription = () =>
    <div>
        <p>Merci de vous identifier ci-dessous</p>
        <p>Le username doit contenir au minimum 6 caractères</p>
    </div>
    
    const alternateAuthenticationDescription = () =>
        authenticationMode === AuthenticationMode.Login
            ? <p>Pas encore de compte? <Link to="/signup">Sign up</Link></p>
            : <p>Déjà un compte? <Link to="/login">Login</Link></p>;

    const [, setBaseUserName] = useRecoilState(userNameState)
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleClick = async () => {
        setError('');
        try {
            await (authenticationMode === AuthenticationMode.Login
                ? signIn(email, userName)
                :  signUp(email, userName).then(() => setBaseUserName(userName)))
        } catch (error) {
            setError(error.message);
        }
    }

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value);
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

    return (
        <div className={'authentication-page'}>
                <div className={'authentication-title'}>
                    <img src={title} alt={'title'}/>
                </div>
                {authenticationDescription()}
            {alternateAuthenticationDescription()}
            <div>
                    <input placeholder="UserName" name="userName" type="username" onChange={handleUserNameChange}
                           value={userName}></input>
                </div>
                <div>
                    <input placeholder="Email" name="email" type="email" onChange={handleEmailChange}
                           value={email}></input>
                </div>
            <div>
                    {error ? <p>{error}</p> : null}
                    <MenuButton team={Team.Green} onClick={handleClick}>{`${authenticationMode === AuthenticationMode.Login ? 'Log In' : 'Sign up' }`}</MenuButton>
                </div>

        </div>
    );

}

export default AuthenticationPage;