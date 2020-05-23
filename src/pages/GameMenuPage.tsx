import React from 'react';
import {GameMenu, GameMenuProps} from "../components/GameMenu";

const GameMenuPage : React.FC<GameMenuProps> = ({games, createGame, actOnGame}) =>  {
    return (
        <GameMenu games={games} createGame={createGame} actOnGame={actOnGame} />
    );
}

export default GameMenuPage;