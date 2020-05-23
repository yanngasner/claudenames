import React, {FC} from 'react';
import GameComponent from "../components/GameComponent";
import {GameModel} from "../types/gameTypes";

interface GameProps {
    game : GameModel
}

const GamePage:FC<GameProps> = ({game}) => {
    return (
        <GameComponent game={game}/>

    );
}

export default GamePage;