import React from 'react';
import {GameMenu, GameMenuProps} from "../components/GameMenu";
import RulesComponent from "../components/RulesComponent";
import './GameMenuPage.css'

const GameMenuPage : React.FC<GameMenuProps> = ({games, createGame, actOnGame}) =>  {
    return (
        <div className={'game-menu-page'}>
            <GameMenu games={games} createGame={createGame} actOnGame={actOnGame} />
            <RulesComponent/>
        </div>

    );
}

export default GameMenuPage;