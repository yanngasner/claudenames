import React from 'react';
import {dateConverter} from "../helpers/dateConverter";
import {GameModel} from "../types/gameTypes";

export const GameDescription: React.FC<GameModel>
    = ({...game}) => {

    const handleEndClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        game.endGame();
    }

    const handleStartClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        game.startGame();
    }

    return (
        <div>
            <h2>Name : </h2><h2>{game.name}</h2>
            <h2>IsStarted : </h2><h2>{game.isStarted.toString()}</h2>
            <h2>{dateConverter(game.startTime)}</h2>
            <h2>{dateConverter(game.endTime)}</h2>
            <button onClick={handleStartClick}>Start</button>
            <button onClick={handleEndClick}>End</button>
        </div>
    )
};

