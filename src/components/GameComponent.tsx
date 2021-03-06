import React, {FC} from 'react';
import {GameModel, PlayerModel} from "../types/gameTypes";
import WordComponent from "./WordComponent";
import PlayersComponent from "./PlayersComponent";
import './GameComponent.css'
import {Button} from "@material-ui/core";
import styled from "styled-components";
import {getBackgroundColor} from "../resources/colors";
import {Team} from "../types/enums";

interface GameComponentProps {
    game: GameModel,
    player: PlayerModel | undefined,
    joinTeam: (team: Team) => void,
    takeLead: (team: Team) => void,
    endShift: (team: Team) => void,
    validateSelection: (wordId : string) => void,
    changeWordSelected: (id: string, isSelected: boolean) => void
}


const GameComponentDiv = styled.div<{  player: PlayerModel | undefined }>`
    background-color : ${props => props.player == null ? 'whitesmoke' : getBackgroundColor(props.player.team)};
`;

const GameComponent: FC<GameComponentProps> = ({game, player, joinTeam, takeLead, endShift, validateSelection, changeWordSelected}) => {

    const getCurrentRound = (game : GameModel) => game.rounds[game.roundId];
    const getWords = (game : GameModel) => getCurrentRound(game).words;
    const hasTeamLeader = (game : GameModel, team : Team | undefined) =>
    {
        if (team === undefined) {
            return false
        } else {
            return (team === Team.Blue ? getCurrentRound(game).blueLeaderId : getCurrentRound(game).redLeaderId) !== undefined
        }
    }

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
        getWords(game).filter(w => w.isSelected).forEach(w => validateSelection(w.id));
    }

    return (
            <GameComponentDiv player={player} className={'game-component'}>
                {

                    player?.isLeader
                        ? <div>
                            {player?.isPlaying
                                ? <div>
                                    <Button onClick={() => handleValidateSelectionClick()}>Valider la sélection</Button>
                                    <Button onClick={() => handleEndShiftClick()}>Terminer le tour</Button>
                                </div>
                                : <div></div>
                            }
                        </div>
                        : <div>
                            {hasTeamLeader(game, player?.team)
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
                    {getWords(game).map(word =>
                        <WordComponent
                            word={word}
                            changeWordSelected={(isSelected: boolean) => changeWordSelected(word.id, isSelected)}
                            player={player}
                        />
                    )}
                </div>
            </GameComponentDiv>
    );
}

export default GameComponent;
