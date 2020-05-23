import React, {FC} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {PrivateRoute, PublicRoute} from "./components/AuthenticatedRoute";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import {useGame} from "./services/useGame";
import GameMenuPage from "./pages/GameMenuPage";

interface AppRouterProps {
    authenticated : boolean | null
}

const AppRouter : FC<AppRouterProps> = ({authenticated}) => {

    const [games, createGame, actOnGame, areGamesLoaded] = useGame();

    return (
        <div className="App">
            <Router>
                <Switch>
                    <PrivateRoute path="/menu" render={() => <GameMenuPage games={games} createGame={createGame} actOnGame={actOnGame}/>}  authenticated={authenticated} ></PrivateRoute>
                    <PublicRoute path="/login" render={() => <LoginPage />} authenticated={authenticated}></PublicRoute>
                    {games.map(game =>
                        <PrivateRoute key={game.id} path={`/${game.id}`} render={() => <GamePage game={game} actOnGame={actOnGame}/>}  authenticated={authenticated} ></PrivateRoute>
                    )}
                    <PublicRoute path="/signup" render={() => <SignUpPage />} authenticated={authenticated}></PublicRoute>
                    <Route render={() => authenticated != null && areGamesLoaded ? <Redirect to={authenticated ? '/menu' : '/login'}/> : <div></div>} />/>*/}
                </Switch>
            </Router>
        </div>
    )
}

export default AppRouter;