import React, {useEffect, useState} from 'react';
import {auth} from './services/firebase';
import {useRecoilState} from "recoil";
import {userEmailState} from "./types/atoms";

import './App.css';

import AppRouter from "./AppRouter";



function App() {

    const [, setUserEmail] = useRecoilState(userEmailState)
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            setAuthenticated(user != null);
            setUserEmail(user?.email)
        })
    }, []);

    return (
        <div className="App">
            <AppRouter authenticated={authenticated} />
        </div>
    );
}

export default App;
