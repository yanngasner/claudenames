import React, {useEffect, useState} from 'react';
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import {auth} from './services/firebase';
import {useRecoilState} from "recoil";

import './App.css';

import GameMenuPage from "./pages/GameMenuPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import {PublicRoute, PrivateRoute} from "./components/AuthenticatedRoute";
import {userEmailState} from "./types/atoms";
import GamePage from "./pages/GamePage";



function App() {


    const [, setUserEmail] = useRecoilState(userEmailState)
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

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
                    <Route exact path="/" render={() => authenticated != null ? <Redirect to={authenticated ? '/other' : '/login'}/> : <div></div>} />
                    <PrivateRoute path="/menu" render={() => <GameMenuPage />} authenticated={authenticated}></PrivateRoute>
                    <PrivateRoute path="/other" render={() => <GamePage id={"1"} />}  authenticated={authenticated} ></PrivateRoute>
                    <PublicRoute path="/login" render={() => <LoginPage />} authenticated={authenticated}></PublicRoute>
                    <PublicRoute path="/signup" render={() => <SignUpPage />} authenticated={authenticated}></PublicRoute>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
