import React, {FC} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {PrivateRoute, PublicRoute} from "./components/AuthenticatedRoute";
import MainPage from "./pages/MainPage";
import {useGame} from "./services/useGame";
import AuthenticationPage from "./pages/AuthenticationPage";

interface AppRouterProps {
    authenticated : boolean | null
}

const AppRouter : FC<AppRouterProps> = ({authenticated}) => {

    const [games, createGame, actOnGame, actOnWord, areGamesLoaded] = useGame();

    return (
        <div className="App">
            <Router>
                <Switch>
                    <PrivateRoute path="/menu" render={() => <MainPage games={games} createGame={createGame} game={undefined}
                                                   actOnGame={actOnGame}
                                                   actOnWord={actOnWord}/>} authenticated={authenticated} />
                    <PublicRoute path="/login" render={() => <AuthenticationPage/>} authenticated={authenticated}/>
                    {games.map(game =>
                        <PrivateRoute key={game.id} path={`/${game.id}`} render={() => <MainPage games={games} createGame={createGame}
                                                                         game={game} actOnGame={actOnGame}
                                                                         actOnWord={actOnWord}/>} authenticated={authenticated} />
                    )}
                    <Route render={() => authenticated != null && areGamesLoaded ? <Redirect to={authenticated ? '/menu' : '/login'}/> : <div/>} />}
                </Switch>

            </Router>
        </div>
    )
}

export default AppRouter;