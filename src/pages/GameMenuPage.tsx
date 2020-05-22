import React from 'react';
import {GameModel} from "../types/gameTypes";
import {GameAction} from "../types/enums";
import GameMenu from "../components/GameMenu";

interface GameMenuProps {
    games: GameModel[],
    createGame: (inputName: string) => Promise<void>,
    actOnGame: (gameAction: GameAction, gameId : string) => Promise<void>,
}

const GameMenuPage : React.FC<GameMenuProps> = ({games, createGame, actOnGame}) =>  {
    return (
        <GameMenu games={games} createGame={createGame} actOnGame={actOnGame} />
    );
}

export default GameMenuPage;