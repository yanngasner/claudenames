import React from 'react';
import {useHistory} from 'react-router-dom'
import {customDateConverter} from "../helpers/dateHelpers";
import {GameModel, PlayerModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil"
import {userEmailState} from "../types/atoms";
import './GameDescription.css';
import {Team} from "../types/enums";
import {makeStyles} from "@material-ui/core/styles";
import {FormControlLabel, Button} from "@material-ui/core";
import {BlueSwitch, RedSwitch, BlueButton, RedButton} from "./MaterialComponents";



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
    },
}));

interface GameDescriptionProps  {
    game : GameModel,
    player : PlayerModel | undefined
    startGame : () => void,
    endGame : () => void,
    joinBlueGame : () => void,
    joinRedGame : () => void,
    quitGame : () => void,
    setLeader : () => void
}

export const GameDescription: React.FC<GameDescriptionProps>
    = ({game, player, startGame, endGame, joinBlueGame, joinRedGame, quitGame, setLeader}) => {

    const classes = useStyles();
    const userEmail = useRecoilValue(userEmailState);
    const isAuthor = () => game.authorEmail === userEmail;
    const isInGame = () => player?.email === userEmail;
    const isBlue = () => player?.team === Team.Blue;
    const isRed = () => player?.team === Team.Red;

    const handleEndClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => endGame();

    const handleStartClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        startGame();
        history.push(`/${game.id}`);
    }
    const handleJoinBlueClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => joinBlueGame();
    const handleJoinRedClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => joinRedGame();
    const handleQuitClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => quitGame();

    const [isLeader, setIsLeader] = React.useState(player?.isLeader ?? false);
    const handleIsLeaderChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setIsLeader(checked);
        setLeader();
    };

    let history = useHistory();

    return (
        <div className={`game-description-component ${classes.root}`}>
            <h2>{game.id}</h2>
            <h2>{game.name}</h2>
            <h3>{`${game.authorEmail} (${customDateConverter(game.creationTime)})`}</h3>
            <Button  disabled={!isAuthor()} onClick={handleStartClick}>Start</Button>
            <Button disabled={!isAuthor()} onClick={handleEndClick}>End</Button>
            <BlueButton disabled={isBlue()} onClick={handleJoinBlueClick}>Join Blue</BlueButton>
            <RedButton disabled={isRed()} onClick={handleJoinRedClick}>Join Red</RedButton>
            <Button disabled={!isInGame() || isAuthor()} onClick={handleQuitClick}>Quit</Button>
            <FormControlLabel
                control={isBlue()
                    ? <BlueSwitch checked={isLeader} onChange={handleIsLeaderChange} />
                    : <RedSwitch checked={isLeader} onChange={handleIsLeaderChange} />
                }
                label="Leader"
            />
            <div className='game-description-players'>{game.players.map(p =>
                <div className={p.team === Team.Blue ? 'game-description-player-blue' : 'game-description-player-red'}>
                    <p>{p.email}</p>
                </div>)}
            </div>
        </div>
    )
};

