import React from 'react';
import {useHistory} from 'react-router-dom'
import {customDateConverter} from "../helpers/dateHelpers";
import {GameModel, PlayerModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil"
import {userIdState} from "../types/atoms";
import './GameDescription.css';
import {Team} from "../types/enums";
import {makeStyles} from "@material-ui/core/styles";
import {Button, FormControlLabel} from "@material-ui/core";
import {BlueButton, BlueSwitch, RedButton, RedSwitch} from "./MaterialComponents";


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
    const userId = useRecoilValue(userIdState);
    const history = useHistory();

    const isAuthor = () => game.authorId === userId;
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
        <div className={`game-description-component ${isBlue() ? 'blue':'red'}-game-description-component`}>
            <div className={'players-list-component blue-players-list-component'}>
                {game.players.filter(p => p.team === Team.Blue).map(p =>
                    <div
                        className={`${player?.isAuthor ? 'author-player' : ''} ${player?.isLeader ? 'leader-player' : ''}`}
                        key={p.userName}>
                        <p>{p.userName}</p>
                    </div>)
                }
            </div>
            <div className={`game-description-central-component ${classes.root}`}>
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
            </div>
            <div className={'players-list-component red-players-list-component'}>
                {game.players.filter(p => p.team === Team.Red).map(p =>
                    <div
                        className={`${player?.isAuthor ? 'author-player' : ''} ${player?.isLeader ? 'leader-player' : ''}`}
                        key={p.userName}>
                        <p>{p.userName}</p>
                    </div>)
                }
            </div>
        </div>

    )
};

