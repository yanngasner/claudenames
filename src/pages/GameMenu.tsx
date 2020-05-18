import React, {useState} from 'react';
import {useGames} from '../services/useGame'
import {GameDescription} from "../components/GameDescription";

const GameMenu = () => {

    const [inputName, setInputName] = useState("")
    const [games, createGame, endGame, startGame] = useGames();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputName(event.target.value);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await createGame(inputName);
    }

    const getGameComponents = () => {
        return (
            <div>
                {games.map(game => <GameDescription {...game} startGame={() => startGame(game.id)} endGame={() => endGame(game.id)} />)}
            </div>
        );
    }

    return (
        <div>
            {getGameComponents()}
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

export default GameMenu;