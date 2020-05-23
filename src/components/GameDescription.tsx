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
}));

interface GameDescriptionProps  {
    game : GameModel,
    player : PlayerModel | undefined
    startGame : () => void,
    endGame : () => void,
    joinTeam : (team: Team) => void,
    changeLead : (lead: boolean) => void,
    quitGame : () => void,
}

export const GameDescription: React.FC<GameDescriptionProps>
    = ({game, player, startGame, endGame, joinTeam, changeLead, quitGame}) => {

    const classes = useStyles();
    const userEmail = useRecoilValue(userEmailState);
    const isAuthor = () => game.authorEmail === userEmail;
    const isInGame = () => player?.email === userEmail;
    const isBlue = () => player?.team === Team.Blue;
    const isRed = () => player?.team === Team.Red;
    const [isLeader, setIsLeader] = React.useState(player?.isLeader ?? false);

    const handleEndClick = () => endGame();
    const handleStartClick = () => {
        startGame();
        history.push(`/${game.id}`);
    }
    const handleJoinClick = (team : Team) => joinTeam(team);
    const handleQuitClick = () => quitGame();
    const handleChangeLead = (checked: boolean) => {
        setIsLeader(checked);
        changeLead(checked);
    };

    let history = useHistory();

    return (
        <div className={`game-description-component ${classes.root}`}>
            <h2>{game.id}</h2>
            <h2>{game.name}</h2>
            <h3>{`${game.authorEmail} (${customDateConverter(game.creationTime)})`}</h3>
            <Button  disabled={!isAuthor()} onClick={() => handleStartClick()}>Start</Button>
            <Button disabled={!isAuthor()} onClick={() => handleEndClick()}>End</Button>
            <BlueButton disabled={isBlue()} onClick={() => handleJoinClick(Team.Blue)}>Join Blue</BlueButton>
            <RedButton disabled={isRed()} onClick={() => handleJoinClick(Team.Red)}>Join Red</RedButton>
            <Button disabled={!isInGame() || isAuthor()} onClick={() => handleQuitClick()}>Quit</Button>
            <FormControlLabel
                control={isBlue()
                    ? <BlueSwitch checked={isLeader} onChange={(event) => handleChangeLead(event.target.checked)} />
                    : <RedSwitch checked={isLeader} onChange={(event) => handleChangeLead(event.target.checked)} />
                }
                label="Leader"
            />
            <div className='game-description-players'>{game.players.map(p =>
                <div key={p.email} className={p.team === Team.Blue ? 'game-description-player-blue' : 'game-description-player-red'}>
                    <p>{p.email}</p>
                </div>)}
            </div>
        </div>
    )
};

