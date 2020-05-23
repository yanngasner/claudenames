import React, {FC} from 'react';
import {GameModel} from "../types/gameTypes";

interface GameProps {
    game:GameModel,
    // takeShift: () => void,
    // validateSelection: () => void,
}
const GameComponent : FC<GameProps> = ({game}) => {
    return (
            <div><p>{`game = ${game.id}`}</p></div>
    );
}

export default GameComponent;