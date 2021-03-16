import React from 'react';
import {useHistory} from 'react-router-dom'
import {GameModel, PlayerModel} from "../types/gameTypes";
import './GameDescription.css';
import {AuthenticationButton, GameButton} from "./GameButton";


interface GameDescriptionProps {
    game: GameModel,
    player: PlayerModel | undefined
}

export const GameDescription: React.FC<GameDescriptionProps>
    = ({game, player}) => {

    const history = useHistory();

    const handleStartClick = () => {
        history.push(`/${game.id}`);
    }

    return (
            <div>
                <AuthenticationButton team={player?.team} onClick={() => handleStartClick()}>{game.name}</AuthenticationButton>
            </div>
    )
};

