import React from 'react';
import {useHistory} from 'react-router-dom'
import {customDateConverter} from "../helpers/dateHelpers";
import {GameModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil"
import {userEmailState} from "../types/atoms";
import './GameDescription.css';
import {Team} from "../types/enums";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    redButton: {
        background: 'rgb(235, 99, 105)'
    },
    blueButton: {
        background: 'rgb(99, 158, 235)'
    }
}));

interface GameDescriptionProps  {
    game : GameModel,
    startGame : () => void,
    endGame : () => void,
    joinBlueGame : () => void,
    joinRedGame : () => void,
    quitGame : () => void,
}

export const GameDescription: React.FC<GameDescriptionProps>
    = ({game, startGame, endGame, joinBlueGame, joinRedGame, quitGame}) => {

    const classes = useStyles();
    const userEmail = useRecoilValue(userEmailState);

    const isAuthor = () => game.authorEmail === userEmail;
    const isInGame = () => game.players.find(p => p.email === userEmail);
    const isBlue = () => game.players.find(p => p.email === userEmail)?.team === Team.Blue;
    const isRed = () => game.players.find(p => p.email === userEmail)?.team === Team.Red;

    const handleEndClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => endGame();

    const handleStartClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        startGame();
        history.push(`/${game.id}`);
    }
    const handleJoinBlueClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => joinBlueGame();
    const handleJoinRedClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => joinRedGame();
    const handleQuitClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => quitGame();

    let history = useHistory();

    return (
        <div className={`game-description-component ${classes.root}`}>
            <h2>{game.id}</h2>
            <h2>{game.name}</h2>
            <h3>{`${game.authorEmail} (${customDateConverter(game.creationTime)})`}</h3>
            <Button  variant="outlined" disabled={!isAuthor()} onClick={handleStartClick}>Start</Button>
            <Button variant="outlined" disabled={!isAuthor()} onClick={handleEndClick}>End</Button>
            <Button className={classes.blueButton} variant="outlined" disabled={isBlue()} onClick={handleJoinBlueClick}>Join Blue</Button>
            <Button className={classes.redButton} variant="outlined" disabled={isRed()} onClick={handleJoinRedClick}>Join Red</Button>
            <Button variant="outlined" disabled={!isInGame() || isAuthor()} onClick={handleQuitClick}>Quit</Button>

            <div className='game-description-players'>{game.players.map(p =>
                <div className={p.team === Team.Blue ? 'game-description-player-blue' : 'game-description-player-red'}>
                    <p>{p.email}</p>
                </div>)}
            </div>
        </div>
    )
};

