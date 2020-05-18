import React, {useEffect, useState} from 'react';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {auth} from './services/firebase';
import {useRecoilState} from "recoil";

import './App.css';

import Home from './pages/Home';
import GameMenu from './pages/GameMenu';
import Signup from './pages/SignUp';
import Login from './pages/Login';

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
                    <Route exact path="/" component={Home}></Route>
                    <PrivateRoute path="/game" component={GameMenu} authenticated={authenticated}></PrivateRoute>
                    <PublicRoute path="/login" component={Login} authenticated={authenticated}></PublicRoute>
                    <PublicRoute path="/signup" component={Signup} authenticated={authenticated}></PublicRoute>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
