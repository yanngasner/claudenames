import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import {auth} from './services/firebase';
import {useRecoilState} from "recoil";

import './App.css';

import GameMenuPage from "./pages/GameMenuPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import {PublicRoute, PrivateRoute} from "./components/AuthenticatedRoute";
import {userEmailState} from "./types/atoms";



function App() {


    const [, setUserEmail] = useRecoilState(userEmailState)

    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            setAuthenticated(user != null);
            setUserEmail(user === null ? null : user.email)
        })
    }, []);

    return (
        <div className="App">
            <Router>
                <Switch>
                    <PrivateRoute path="/game" component={GameMenuPage} authenticated={authenticated}></PrivateRoute>
                    <PublicRoute path="/login" component={LoginPage} authenticated={authenticated}></PublicRoute>
                    <PublicRoute path="/signup" component={SignUpPage} authenticated={authenticated}></PublicRoute>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
