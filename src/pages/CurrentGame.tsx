import React, {useEffect, useState} from 'react';
import {useGame} from '../services/useGame'
import {dateConverter} from "../helpers/dateConverter";

function CurrentGame() {

    const [inputName, setInputName] = useState("")
    const [game, createGame, endGame] = useGame();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputName(event.target.value);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await createGame(inputName);
    }

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        await endGame();
    }

    return(
        <div>
            <div>
                <h2>{game.name}</h2>
                <h2>{dateConverter(game.startTime)}</h2>
                <h2>{dateConverter(game.endTime)}</h2>
                <h2>{game.isStarted}</h2>
                <button onClick={handleClick}>End Game</button>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>New game</h1>
                    <input placeholder="Game name" name="name" type="name" onChange={handleNameChange}
                           value={inputName}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CurrentGame;