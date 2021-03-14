import React, {FC} from 'react';
import {GameModel, PlayerModel} from "../types/gameTypes";
import WordComponent from "./WordComponent";
import PlayersComponent from "./PlayersComponent";
import './GameComponent.css'
import styled from "styled-components";
import {RoundStatus, Team} from "../types/enums";
import {usePlayer} from "../services/usePlayer";
import {GameButton, LeftBallButton, RightBallButton} from "./GameButton";
import {gameGrey} from "../services/colorsProvider";
import leftBall from '../resources/bulle_Gauche.png'
import rightBall from '../resources/bulle_Droite.png'

interface GameComponentProps {
    game: GameModel,
    player: PlayerModel | undefined,
    joinTeam: (team: Team) => void,
    takeLead: (team: Team) => void,
    endShift: (team: Team) => void,
    requestNextRound: (team: Team) => void
    validateSelection: (team: Team, wordId: string) => void,
    changeWordSelected: (team: Team, wordId: string, isSelected: boolean) => void
    changeMenuVisibility: () => void
    changeRulesVisibility: () => void
}


const GameComponentDiv = styled.div<{  player: PlayerModel | undefined }>`
`;

const GameComponent: FC<GameComponentProps> = ({game, player, joinTeam, takeLead, endShift, requestNextRound, validateSelection, changeWordSelected, changeMenuVisibility, changeRulesVisibility}) => {

    const currentRound = game.rounds[game.roundId];
    const words = currentRound.words;

    const [hasTeamLeader, isLeader, isPlaying] = usePlayer(player, currentRound);

    const hasSelectedWords = words.some(w => w.isSelected);
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

    function getGameUpperButtons() {
        if (currentRound.roundStatus >= RoundStatus.BlueWins)
            return <div className={'game-upper-buttons'}>
                <GameButton team={player?.team} onClick={() => handleRequestNextRoundClick()}>Une autre!
                </GameButton>
            </div>
        else if (isLeader)
            return <div className={'game-upper-buttons'}>
                <GameButton team={player?.team} disabled={!isPlaying}
                            onClick={() => handleValidateSelectionClick()}>Valider
                </GameButton>
                <GameButton team={player?.team} disabled={!isPlaying || hasSelectedWords}
                            onClick={() => handleEndShiftClick()}>Terminer
                </GameButton>
            </div>
        else if (!hasTeamLeader)
            return <div className={'game-upper-buttons'}>
                <GameButton team={player?.team} onClick={() => handleTakeLeadClick()}>Lead</GameButton>
            </div>
        return <div></div>
    }


    return (
        <GameComponentDiv player={player} className={'game-component'}>
            <div className={'game-upper-container'}>
                <div className={'game-upper-left'}>
                    <LeftBallButton onClick={changeMenuVisibility}>Menu</LeftBallButton>
                </div>
                <div className={'game-upper-playing'}>
                    <h3>{RoundStatus[currentRound.roundStatus]}</h3>
                    <h3>{`Blue: ${blueScore} - Red: ${redScore}`}</h3>
                    {getGameUpperButtons()}
                </div>
                <div className={'game-upper-title'}>
                    <h1>Claude Names</h1>
                </div>
                <div className={'game-upper-players'}>
                    <PlayersComponent
                        game={game}
                        player={player}
                        joinTeam={(team: Team) => joinTeam(team)}
                    />
                </div>
                <div className={'game-upper-right'}>
                    <RightBallButton onClick={changeRulesVisibility}>Règles</RightBallButton>
                </div>
            </div>
            <div className='game-words-container'>
                {words.map(word =>
                    <WordComponent
                        game={game}
                        word={word}
                        changeWordSelected={(isSelected: boolean) => player !== undefined ? changeWordSelected(player.team, word.id, isSelected) : {}}
                        player={player}
                    />
                )}
            </div>
            <div className={'game-lower-container'}/>
        </GameComponentDiv>
    );
}

export default GameComponent;
