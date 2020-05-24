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

interface GameDescriptionProps {
    game: GameModel,
    player: PlayerModel | undefined
    startGame: () => void,
    endGame: () => void,
    joinTeam: (team: Team) => void,
    changeLead: (lead: boolean) => void,
}

export const GameDescription: React.FC<GameDescriptionProps>
    = ({game, player, startGame, endGame, joinTeam, changeLead}) => {

    const classes = useStyles();
    const userEmail = useRecoilValue(userEmailState);
    const history = useHistory();

    const isAuthor = () => game.authorEmail === userEmail;
    const isBlue = () => player?.team === Team.Blue;
    const isRed = () => player?.team === Team.Red;

    const handleStartClick = () => {
        startGame();
        history.push(`/${game.id}`);
    }
    const handleEndClick = () => endGame();
    const handleJoinClick = (team: Team) => joinTeam(team);
    const handleChangeLeadClick = (checked: boolean) => changeLead(checked);

    return (
        <div className={`game-description-component ${classes.root}`}>
            <h3>{`${game.name} (${customDateConverter(game.creationTime)})`}</h3>
            {isAuthor()
                ? <div>
                    <Button onClick={() => handleStartClick()}>Jouer</Button>
                    <Button onClick={() => handleEndClick()}>Terminer</Button>
                </div>
                : <div></div>
            }
            <BlueButton disabled={isBlue()} onClick={() => handleJoinClick(Team.Blue)}>Team Bleu</BlueButton>
            <RedButton disabled={isRed()} onClick={() => handleJoinClick(Team.Red)}>Team Rouge</RedButton>
            <FormControlLabel
                control={isBlue()
                    ? <BlueSwitch checked={player?.isLeader ?? false}
                                  onChange={(event) => handleChangeLeadClick(event.target.checked)}/>
                    : <RedSwitch checked={player?.isLeader ?? false}
                                 onChange={(event) => handleChangeLeadClick(event.target.checked)}/>
                }
                label="Leader"
            />
            <div className='game-description-players'>{game.players.map(p =>
                <div key={p.email}
                     className={p.team === Team.Blue ? 'game-description-player-blue' : 'game-description-player-red'}>
                    <p>{p.email}</p>
                </div>)}
            </div>
        </div>
    )
};

