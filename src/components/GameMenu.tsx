import React, {useState} from 'react';
import {GameDescription} from "./GameDescription";
import {GameAction, Team} from "../types/enums";
import {GameModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil";
import {userEmailState} from "../types/atoms";
import {Button} from "@material-ui/core";
import './GameMenu.css'

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

    const getCreateGameComponent = () => {
        return (
            <div className={'new-game-component'}>
                <form onSubmit={handleSubmit}>
                    <h3>Créer une partie</h3>
                    <input placeholder="Nom de partie" name="name" type="name" onChange={handleNameChange}
                           value={inputName}></input>
                    <Button type="submit">OK</Button>
                </form>
            </div>
        );
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
                    />
                )}
            </div>
        );
    }

    return (
        <div>
            {getCreateGameComponent()}
            {getGameComponents()}

        </div>
    );
}

