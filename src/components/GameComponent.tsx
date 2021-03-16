import React, {FC} from 'react';
import {GameModel, PlayerModel} from "../types/gameTypes";
import WordComponent from "./WordComponent";
import PlayersComponent from "./PlayersComponent";
import './GameComponent.css'
import '../App.css'
import styled from "styled-components";
import {RoundStatus, Team} from "../types/enums";
import {usePlayer} from "../services/usePlayer";
import {GameButton, LeftBallButton, RightBallButton} from "./GameButton";
import title from '../resources/CLAUDE_NAMES_title_v2.png';
import {getRoundStatusColor, getScoreColor} from "../services/colorsProvider";

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

const RoundStatusDiv = styled.h3`
  color: ${(props: {roundStatus:RoundStatus}) => getRoundStatusColor(props.roundStatus)};
`;

const ScoreDiv = styled.h3`
  color: ${(props: {greenScore:number, redScore: number}) => getScoreColor(props.greenScore, props.redScore)};
`;

const GameComponent: FC<GameComponentProps> = ({game, player, joinTeam, takeLead, endShift, requestNextRound, validateSelection, changeWordSelected, changeMenuVisibility, changeRulesVisibility}) => {

    const currentRound = game.rounds[game.roundId];
    const words = currentRound.words;

    const [hasTeamLeader, isLeader, isPlaying] = usePlayer(player, currentRound);

    const hasSelectedWords = words.some(w => w.isSelected);
    const greenScore = game.rounds.filter(r => r.roundStatus === RoundStatus.GreenWins).length;
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
        if (currentRound.roundStatus >= RoundStatus.GreenWins)
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


    const getRoundStatus = (roundStatus: RoundStatus) => {
        if (roundStatus == RoundStatus.Waiting)
            return "En Attente..."
        else if (roundStatus == RoundStatus.GreenPlaying)
            return "Tour Vert"
        else if (roundStatus == RoundStatus.RedPlaying)
            return "Tour Rouge"
        else if (roundStatus == RoundStatus.GreenWins)
            return "Victoire Vert!"
        else if (roundStatus == RoundStatus.RedWins)
            return "Victoire Rouge!"
        else
            return "Egalité"
    }

    return (
        <div className={'game-component'}>
            <div className={'game-upper-container'}>
                <div className={'game-upper-left'}>
                    <LeftBallButton onClick={changeMenuVisibility}>Menu</LeftBallButton>
                </div>
                <div className={'game-upper-playing'}>
                    <RoundStatusDiv roundStatus={currentRound.roundStatus}>{getRoundStatus(currentRound.roundStatus)}</RoundStatusDiv>
                    <ScoreDiv greenScore={greenScore} redScore={redScore}>{`Vert: ${greenScore} - Rouge: ${redScore}`}</ScoreDiv>
                    {getGameUpperButtons()}
                </div>
                <div className={'game-upper-title'}>
                    <img src={title} alt={'title'}/>
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
        </div>
    );
}

export default GameComponent;
