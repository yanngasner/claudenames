import React from 'react';
import {useHistory} from 'react-router-dom'
import {GameModel, PlayerModel} from "../types/gameTypes";
import './GameDescription.css';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";

import styled from "styled-components";
import {getBackgroundColor} from "../services/colorsProvider";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


const GameDescriptionDiv = styled.div<{ player: PlayerModel | undefined }>`
    background-color : ${props => props.player == null ? 'whitesmoke' : getBackgroundColor(props.player.team)};
`;

interface GameDescriptionProps {
    game: GameModel,
    player: PlayerModel | undefined
}

export const GameDescription: React.FC<GameDescriptionProps>
    = ({game, player}) => {

    const classes = useStyles();
    const history = useHistory();

    const handleStartClick = () => {
        history.push(`/${game.id}`);
    }

    return (
        <GameDescriptionDiv player={player} className='game-description-component'>

            <div className={`${classes.root}`}>
                <h3>{`${game.name}`}</h3>
                <Button onClick={() => handleStartClick()}>Jouer</Button>

            </div>

        </GameDescriptionDiv>

    )
};

