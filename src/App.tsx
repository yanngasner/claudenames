import React, {useEffect, useState} from 'react';
import {auth} from './services/firebase';
import {useRecoilState} from "recoil";
import {userIdState, userNameState} from "./types/atoms";

import './App.css';

import AppRouter from "./AppRouter";



function App() {

    const [, setUserId] = useRecoilState(userIdState)
    const [, setUserName] = useRecoilState(userNameState)
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            setAuthenticated(user != null);
            setUserId(user?.uid)
            setUserName(user?.displayName)
        })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="App">
            <AppRouter authenticated={authenticated} />
        </div>
    );
}

export default App;
