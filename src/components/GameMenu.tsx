import React, {useState} from 'react';
import {GameDescription} from "./GameDescription";
import {GameAction} from "../types/enums";
import {GameModel} from "../types/gameTypes";

interface GameMenuProps {
    games: GameModel[],
    createGame: (inputName: string) => Promise<void>,
    actOnGame: (gameAction: GameAction, gameId : string) => Promise<void>
}

const GameMenu:React.FC<GameMenuProps> = ({games, createGame, actOnGame}) =>  {

    const [inputName, setInputName] = useState("")

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputName(event.target.value);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await createGame(inputName);
    }

    const getGameComponents = () => {
        return (
            <div>
                {games.map(game => <GameDescription
                    game={game}
                    startGame={() => actOnGame(GameAction.Start, game.id)}
                    endGame={() => actOnGame(GameAction.End, game.id)}
                    joinBlueGame={() => actOnGame(GameAction.JoinBlue, game.id)}
                    joinRedGame={() => actOnGame(GameAction.JoinRed, game.id)}
                    quitGame={() => actOnGame(GameAction.Quit, game.id)}
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
    );
}

export default GameMenu;