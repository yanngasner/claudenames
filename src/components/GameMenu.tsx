import React, {useState} from 'react';
import {GameDescription} from "./GameDescription";
import {GameAction, Team} from "../types/enums";
import {GameModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil";
import {userEmailState} from "../types/atoms";

export interface GameMenuProps {
    games: GameModel[],
    createGame: (inputName: string) => Promise<void>,
    actOnGame: (gameAction: GameAction, gameId: string) => Promise<void>
}

export const GameMenu: React.FC<GameMenuProps> = ({games, createGame, actOnGame}) => {

    const userEmail = useRecoilValue(userEmailState);
    const [inputName, setInputName] = useState("")

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputName(event.target.value);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await createGame(inputName);
    }

    const getGameComponents = () => {
        return (
            <div>
                {games.map(game =>
                    <GameDescription
                        key={game.id}
                        game={game}
                        player={game.players.find(p => p.email === userEmail)}
                        startGame={() => actOnGame(GameAction.Start, game.id)}
                        endGame={() => actOnGame(GameAction.End, game.id)}
                        joinTeam={(team: Team) => actOnGame(team == Team.Blue ? GameAction.JoinBlue : GameAction.JoinRed, game.id)}
                        changeLead={(lead: boolean) => actOnGame(lead ? GameAction.Lead : GameAction.Unlead, game.id)}
                        quitGame={() => actOnGame(GameAction.Quit, game.id)}
                    />
                )}
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

