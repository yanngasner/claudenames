import React, {FC} from 'react';
import {GameModel, PlayerModel} from "../types/gameTypes";
import WordComponent from "./WordComponent";
import PlayersComponent from "./PlayersComponent";
import './GameComponent.css'
import {Button} from "@material-ui/core";
import styled from "styled-components";
import {getBackgroundColor} from "../resources/colors";
import {RoundStatus, Team} from "../types/enums";

interface GameComponentProps {
    game: GameModel,
    player: PlayerModel | undefined,
    joinTeam: (team: Team) => void,
    takeLead: (team: Team) => void,
    endShift: (team: Team) => void,
    validateSelection: (team: Team, wordId: string) => void,
    changeWordSelected: (team: Team, wordId: string, isSelected: boolean) => void
}


const GameComponentDiv = styled.div<{  player: PlayerModel | undefined }>`
    background-color : ${props => props.player == null ? 'whitesmoke' : getBackgroundColor(props.player.team)};
`;

const GameComponent: FC<GameComponentProps> = ({game, player, joinTeam, takeLead, endShift, validateSelection, changeWordSelected}) => {

    const currentRound = game.rounds[game.roundId];
    const words = currentRound.words;
    const hasTeamLeader = (player === undefined)
        ? false
        : (player.team === Team.Blue ? currentRound.blueLeaderId : currentRound.redLeaderId) !== undefined;

    const handleTakeLeadClick = () => {
        if (player !== undefined) {
            takeLead(player.team);
        }
    }

    const handleEndShiftClick = () => {
        if (player !== undefined) {
            endShift(player.team);
        }
    }

    const handleValidateSelectionClick = () => {
        if (player !== undefined) {
            words.filter(w => w.isSelected).forEach(w => validateSelection(player.team, w.id));
        }
    }

    return (
            <GameComponentDiv player={player} className={'game-component'}>
                <h1>{RoundStatus[currentRound.roundStatus]}</h1>
                {
                    player?.isLeader
                        ? <div>
                            {player?.isPlaying
                                ? <div>
                                    <Button disabled={currentRound.roundStatus !== RoundStatus.Playing} onClick={() => handleValidateSelectionClick()}>Valider la sélection</Button>
                                    <Button disabled={currentRound.roundStatus !== RoundStatus.Playing} onClick={() => handleEndShiftClick()}>Terminer le tour</Button>
                                </div>
                                : <div></div>
                            }
                        </div>
                        : <div>
                            {hasTeamLeader
                                ? <div></div>
                                : <Button onClick={() => handleTakeLeadClick()}>Prendre le lead</Button>}
                        </div>
                }
                <PlayersComponent
                    game={game}
                    player={player}
                    joinTeam={(team: Team) => joinTeam(team)}

                />
                <div className='words-container'>
                    {words.map(word =>
                        <WordComponent
                            word={word}
                            changeWordSelected={(isSelected: boolean) => player !== undefined ? changeWordSelected(player.team, word.id, isSelected) : {}}
                            player={player}
                        />
                    )}
                </div>
            </GameComponentDiv>
    );
}

export default GameComponent;
