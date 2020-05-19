import React, {useState} from 'react';
import {useGames} from '../services/useGame'
import {GameDescription} from "../components/GameDescription";
import {GameAction} from "../types/enums";

const GameMenu = () => {

    const [inputName, setInputName] = useState("")
    const [games, createGame, actOnGame] = useGames();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputName(event.target.value);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await createGame(inputName);
    }

    const getGameComponents = () => {
        return (
            <div>
                {games.map(game => <GameDescription
                    {...game}
                    startGame={() => actOnGame(GameAction.Start, game)}
                    endGame={() => actOnGame(GameAction.End, game)}
                    joinGame={() => actOnGame(GameAction.Join, game)}
                    quitGame={() => actOnGame(GameAction.Quit, game)}
                    />)}
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