import React from 'react';
import {dateConverter} from "../helpers/dateConverter";
import {GameModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil"
import {userEmailState} from "../types/atoms";

export const GameDescription: React.FC<GameModel>
    = ({...game}) => {

    const userEmail = useRecoilValue(userEmailState);

    const isAuthor = () => game.authorEmail === userEmail;
    const isInGame = () => game.players.find(p=>p.email === userEmail);

    const handleEndClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (isAuthor()) {
            game.endGame();
        }
    }

    const handleStartClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (isAuthor()) {
            game.startGame();
        }
    }

    const handleJoinClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!isInGame()) {
            game.joinGame();
        }
    }

    const handleQuitClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (isInGame() && !isAuthor()) {
            game.quitGame();
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
            <button onClick={handleJoinClick}>Join</button>
            <button onClick={handleQuitClick}>Quit</button>
            <p>{game.players.map(p => <p>{p.email}</p>)}</p>
        </div>
    )
};

