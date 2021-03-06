import React, {FC} from 'react';
import {GameModel, PlayerModel} from "../types/gameTypes";
import {Team} from "../types/enums";
import {BlueButton, RedButton} from "./MaterialComponents";
import {makeStyles} from "@material-ui/core/styles";
import './PlayersComponent.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

interface PlayersComponentProps {
    game: GameModel,
    player: PlayerModel | undefined,
    joinTeam: (team: Team) => void,
}

const PlayersComponent: FC<PlayersComponentProps> = ({game, player, joinTeam}) => {

    const classes = useStyles();
    const handleJoinClick = (team: Team) => joinTeam(team);
    const isBlue = () => player?.team === Team.Blue;
    const isRed = () => player?.team === Team.Red;

    return <div className={'players-component'}>
        <div className={'players-list-component'}>
            {game.players.filter(p => p.team === Team.Blue).map(p =>
                <div
                    className={`${p.isLeader ? 'leader-player' : ''}`}
                    key={p.userName}>
                    <p>{p.userName}</p>
                </div>)
            }
        </div>
        <div className={`${classes.root}`}>
                <BlueButton disabled={isBlue()} onClick={() => handleJoinClick(Team.Blue)}>Team Bleu</BlueButton>
                <RedButton disabled={isRed()} onClick={() => handleJoinClick(Team.Red)}>Team Rouge</RedButton>
        </div>
        <div className={'players-list-component'}>
            {game.players.filter(p => p.team === Team.Red).map(p =>
                <div
                    className={`${p.isLeader ? 'leader-player' : ''}`}
                    key={p.userName}>
                    <p>{p.userName}</p>
                </div>)
            }
        </div>
    </div>
}

export default PlayersComponent;
