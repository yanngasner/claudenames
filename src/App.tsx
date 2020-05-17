import React, {useState} from 'react';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {auth} from './services/firebase';

import './App.css';

import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';


import {PublicRoute} from "./components/PublicRoute";
import {PrivateRoute} from "./components/PrivateRoute";


function App() {

    const [authenticated, setAuthenticated] = useState(false);

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <PrivateRoute path="/chat" component={Chat} authenticated={authenticated} ></PrivateRoute>
                    <PublicRoute path="/login" component={Login} authenticated={authenticated}></PublicRoute>
                    <PublicRoute path="/signup" component={Signup} authenticated={authenticated}></PublicRoute>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
