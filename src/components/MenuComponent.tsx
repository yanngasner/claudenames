import React, {useState} from 'react';
import {GameModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil";
import {userIdState} from "../types/atoms";
import './MenuComponent.css'
import {useHistory} from "react-router-dom";
import {MenuButton, SmallMenuButton} from "./GameButtons";
import {Team} from "../types/enums";

export interface MenuComponentProps {
    games: GameModel[],
    createGame: (inputName: string) => Promise<void>,
    isVisible: boolean;
    gameSelected: () => void;
}

export const MenuComponent: React.FC<MenuComponentProps> = ({games, createGame, isVisible, gameSelected}) => {

    const userId = useRecoilValue(userIdState);
    const [inputName, setInputName] = useState("")

    const history = useHistory();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputName(event.target.value);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await createGame(inputName);
    }

    const handleStartClick = (game: GameModel) => {
        history.push(`/${game.id}`);
        gameSelected();
    }

    const getCreateGameComponent = () => {
        return (
            <div className={'new-game-component'}>
                <form onSubmit={handleSubmit}>
                    <h3>Créer une partie</h3>
                    <input placeholder="Nom de partie" name="name" type="name" onChange={handleNameChange}
                           value={inputName} autoComplete="off"/>
                    <SmallMenuButton team={Team.Green} type="submit">OK</SmallMenuButton>
                </form>
            </div>
        );
    }

    const getGameComponents = () => {
        return (
            <div>
                {games.sort((game1, game2) => (game1.creationTime < game2.creationTime ? 1 : -1)).map(game =>
                    <div className={'menu-game-element'}>
                        <MenuButton team={game.players.find(p => p.userId === userId)?.team}
                                    onClick={() => handleStartClick(game)}>{game.name}</MenuButton>
                    </div>
                )}
            </div>
        );
    }

    return (
        isVisible
            ? <div className={'menu-component'}>
                {getCreateGameComponent()}
                {getGameComponents()}
            </div>
            : <div/>
    );
}

