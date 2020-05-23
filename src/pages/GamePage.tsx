import React, {FC} from 'react';
import GameComponent from "../components/GameComponent";
import {GameAction} from "../types/enums";
import {GameModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil";
import {userEmailState} from "../types/atoms";

interface GamePageProps {
    game: GameModel,
    actOnGame: (gameAction: GameAction, gameId : string) => Promise<void>
}

const GamePage : FC<GamePageProps> = ({game, actOnGame}) => {

    const userEmail = useRecoilValue(userEmailState);

    return (
        <GameComponent
            game={game}
            player={game.players.find(p => p.email === userEmail)}
            takeShift={() => actOnGame(GameAction.TakeShift, game.id)}
            validateSelection={() => actOnGame(GameAction.ValidateSelection, game.id)}
        />);
}

export default GamePage;