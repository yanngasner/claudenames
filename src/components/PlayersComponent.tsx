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
    const isGreen = player?.team === Team.Green;
    const isRed = player?.team === Team.Red;

    const [, isLeader,] = usePlayer(player, currentRound);

    const handleJoinClick = (team: Team) => joinTeam(team);


    return <div className={'players-component'}>
        <div className={'players-list-component'}>
            <div className={'green-players-list players-list'}>
                {game.players.filter(p => p.team === Team.Green).map(p =>
                    <div
                        className={`${p.userId === currentRound.greenLeaderId ? 'leader-player' : ''}`}
                        key={p.userName}>
                        <p>{p.userName}</p>
                    </div>)
                }
            </div>
            <div className={'red-players-list players-list'}>
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
            <GameButton team={Team.Green} disabled={isGreen || isLeader} onClick={() => handleJoinClick(Team.Green)}>Vert</GameButton>
            <GameButton team={Team.Red} disabled={isRed || isLeader} onClick={() => handleJoinClick(Team.Red)}>Rouge</GameButton>
        </div>
    </div>
}

export default PlayersComponent;
