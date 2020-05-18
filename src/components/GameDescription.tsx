import React from 'react';
import {dateConverter} from "../helpers/dateConverter";
import {GameModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil"
import {userEmailState} from "../types/atoms";

export const GameDescription: React.FC<GameModel>
    = ({...game}) => {

    const userEmail = useRecoilValue(userEmailState);

    const handleEndClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (game.authorEmail === userEmail) {
            game.endGame();
        }
    }

    const handleStartClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (game.authorEmail === userEmail) {
            game.startGame();
        }
    }

    return (
        <div>
            <h2>Name : </h2><h2>{game.name}</h2>
            <h2>{dateConverter(game.creationTime)}</h2>
            <h2>{dateConverter(game.startTime)}</h2>
            <h2>{dateConverter(game.endTime)}</h2>
            <h2>{game.authorEmail}</h2>
            <button onClick={handleStartClick}>Start</button>
            <button onClick={handleEndClick}>End</button>
        </div>
    )
};

