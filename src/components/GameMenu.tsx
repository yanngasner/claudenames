import React, {useState} from 'react';
import {GameDescription} from "./GameDescription";
import {GameAction, Team} from "../types/enums";
import {GameModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil";
import {userIdState} from "../types/atoms";
import {Button} from "@material-ui/core";
import './GameMenu.css'

export interface GameMenuProps {
    games: GameModel[],
    createGame: (inputName: string) => Promise<void>,
    actOnGame: (gameAction: GameAction, gameId: string, roundId: number, team: Team) => Promise<void>,
    fromMenu: boolean
}

export const GameMenu: React.FC<GameMenuProps> = ({games, createGame, actOnGame, fromMenu}) => {

    const userId = useRecoilValue(userIdState);
    const [inputName, setInputName] = useState("")

    const [isVisible, setVisible] = useState(fromMenu)
    const handleOnClick = () => setVisible(!isVisible);

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
                {games.sort((game1, game2) => (game1.creationTime < game2.creationTime ? 1 : -1)).map(game =>
                    <GameDescription
                        key={game.id}
                        game={game}
                        player={game.players.find(p => p.userId === userId)}
                    />
                )}
            </div>
        );
    }

    return (
        <div className={isVisible?'filled-menu-component':'empty-menu-component'}>
            {fromMenu ? <div></div> :<button onClick={() => handleOnClick()}>{isVisible?'Masquer' : 'Menu'}</button>}
            {isVisible ? getCreateGameComponent() : <div></div>}
            {isVisible ? getGameComponents() : <div></div>}
        </div>
    );
}

