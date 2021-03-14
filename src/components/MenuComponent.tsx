import React, {useState} from 'react';
import {GameDescription} from "./GameDescription";
import {GameAction, Team} from "../types/enums";
import {GameModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil";
import {userIdState} from "../types/atoms";
import {Button} from "@material-ui/core";
import './MenuComponent.css'

export interface MenuComponentProps {
    games: GameModel[],
    createGame: (inputName: string) => Promise<void>,
    isVisible: boolean
}

export const MenuComponent: React.FC<MenuComponentProps> = ({games, createGame, isVisible}) => {

    const userId = useRecoilValue(userIdState);
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
            <div >
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
            isVisible
            ?  <div className={'menu-component'}>
                    {getCreateGameComponent()}
                    {getGameComponents()}
            </div>
            :<div></div>
    );
}

