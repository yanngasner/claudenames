import React, {FC} from 'react';
import {GameModel, PlayerModel} from "../types/gameTypes";
import WordComponent from "./WordComponent";
import PlayersComponent from "./PlayersComponent";
import './GameComponent.css'
import {Button} from "@material-ui/core";
import styled from "styled-components";
import {getBackgroundColor} from "../resources/colors";
import {RoundStatus, Team} from "../types/enums";
import {usePlayer} from "../services/usePlayer";

interface GameComponentProps {
    game: GameModel,
    player: PlayerModel | undefined,
    joinTeam: (team: Team) => void,
    takeLead: (team: Team) => void,
    endShift: (team: Team) => void,
    requestNextRound: (team: Team) => void
    validateSelection: (team: Team, wordId: string) => void,
    changeWordSelected: (team: Team, wordId: string, isSelected: boolean) => void
}


const GameComponentDiv = styled.div<{  player: PlayerModel | undefined }>`
    background-color : ${props => props.player == null ? 'whitesmoke' : getBackgroundColor(props.player.team)};
`;

const GameComponent: FC<GameComponentProps> = ({game, player, joinTeam, takeLead, endShift, requestNextRound, validateSelection, changeWordSelected}) => {

    const currentRound = game.rounds[game.roundId];
    const words = currentRound.words;

    const [hasTeamLeader, isLeader, isPlaying] = usePlayer(player, currentRound);

    const hasSelectedWords = words.some(w=>w.isSelected);
    const blueScore = game.rounds.filter(r => r.roundStatus === RoundStatus.BlueWins).length;
    const redScore = game.rounds.filter(r => r.roundStatus === RoundStatus.RedWins).length;

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

    const handleRequestNextRoundClick = () => {
        if (player !== undefined) {
            requestNextRound(player.team);
        }
    }

    const handleValidateSelectionClick = () => {
        if (player !== undefined) {
            words.filter(w => w.isSelected).forEach(w => validateSelection(player.team, w.id));
        }
    }

    return (
            <GameComponentDiv player={player} className={'game-component'}>
                <div>
                    <h3>{RoundStatus[currentRound.roundStatus]}</h3>
                    <h3>{`Blue: ${blueScore} - Red: ${redScore}`}</h3>
                    {currentRound.roundStatus >= RoundStatus.BlueWins
                    ? <Button onClick={() => handleRequestNextRoundClick()}>Démarrer le prochain round</Button>
                    : <div></div>
                }
                </div>
                {
                    isLeader
                        ? <div>
                            {isPlaying
                                ? <div>
                                    <Button onClick={() => handleValidateSelectionClick()}>Valider la sélection</Button>
                                    <Button disabled={hasSelectedWords} onClick={() => handleEndShiftClick()}>Terminer le tour</Button>
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
                            game={game}
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
