import React, {useState} from 'react';
import {anonymousSignIn} from "../services/auth";
import {useRecoilState} from "recoil";
import {userNameState} from "../types/atoms";
import title from "../resources/CLAUDE_NAMES_title_v2.png";
import './AuthenticationPage.css';
import {MenuButton} from "../components/GameButtons";
import {Team} from "../types/enums";

export const AuthenticationPage: React.FC = () => {

    const authenticationDescription = () =>
    <div>
        <p>Merci de saisir un nom pour vous identifier</p>
    </div>

    const [, setBaseUserName] = useRecoilState(userNameState)
    const [userName, setUserName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleClick = async () => {
        setError('');
        try {
            anonymousSignIn(userName).then(() => setBaseUserName(userName));
        } catch (error) {
            setError(error.message);
        }
    }

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value);

    return (
        <div className={'authentication-page'}>
            <div className={'authentication-title'}>
                <img src={title} alt={'title'}/>
            </div>
            {authenticationDescription()}
            <input placeholder="UserName" name="userName" type="username" onChange={handleUserNameChange}
                   value={userName}></input>
            {error ? <p>{error}</p> : null}
            <MenuButton team={Team.Green} onClick={handleClick}>Log In</MenuButton>
        </div>
    );
}

export default AuthenticationPage;