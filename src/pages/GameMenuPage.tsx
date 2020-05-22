import React from 'react';
import {DbGameModel} from "../types/dBTypes";
import {GameAction} from "../types/enums";
import GameMenu from "../components/GameMenu";

interface GameMenuProps {
    games: DbGameModel[],
    createGame: (inputName: string) => Promise<void>,
    actOnGame: (gameAction: GameAction, gameId : string) => Promise<void>
}

const GameMenuPage : React.FC<GameMenuProps> = ({games, createGame, actOnGame}) =>  {
    return (
        <GameMenu games={games} createGame={createGame} actOnGame={actOnGame} />
    );
}

export default GameMenuPage;