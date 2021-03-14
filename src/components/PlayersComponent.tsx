import React, {FC} from 'react';
import {GameModel, PlayerModel} from "../types/gameTypes";
import {Team} from "../types/enums";
import './PlayersComponent.css';
import {usePlayer} from "../services/usePlayer";
import {GameButton} from "./GameButton";

interface PlayersComponentProps {
    game: GameModel,
    player: PlayerModel | undefined,
    joinTeam: (team: Team) => void,
}

const PlayersComponent: FC<PlayersComponentProps> = ({game, player, joinTeam}) => {

    const currentRound = game.rounds[game.roundId];
    const isBlue = player?.team === Team.Blue;
    const isRed = player?.team === Team.Red;

    const [, isLeader,] = usePlayer(player, currentRound);

    const handleJoinClick = (team: Team) => joinTeam(team);


    return <div className={'players-component'}>
        <div className={'players-list-component'}>
            <div className={'players-list'}>
                {game.players.filter(p => p.team === Team.Blue).map(p =>
                    <div
                        className={`${p.userId === currentRound.blueLeaderId ? 'leader-player' : ''}`}
                        key={p.userName}>
                        <p>{p.userName}</p>
                    </div>)
                }
            </div>
            <div className={'players-list'}>
                {game.players.filter(p => p.team === Team.Red).map(p =>
                    <div
                        className={`${p.userId === currentRound.redLeaderId ? 'leader-player' : ''}`}
                        key={p.userName}>
                        <p>{p.userName}</p>
                    </div>)
                }
            </div>
        </div>

        <div className={`players-button-component`}>
            <GameButton team={Team.Blue} disabled={isBlue || isLeader} onClick={() => handleJoinClick(Team.Blue)}>Bleu</GameButton>
            <GameButton team={Team.Red} disabled={isRed || isLeader} onClick={() => handleJoinClick(Team.Red)}>Rouge</GameButton>
        </div>
    </div>
}

export default PlayersComponent;
