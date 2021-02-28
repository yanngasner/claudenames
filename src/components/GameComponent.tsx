import React, {FC} from 'react';
import {GameModel, PlayerModel} from "../types/gameTypes";
import WordComponent from "./WordComponent";
import './GameComponent.css'
import {Button} from "@material-ui/core";
import styled from "styled-components";
import {getBackgroundColor} from "../resources/colors";
import {Team} from "../types/enums";

interface GameComponentProps {
    game: GameModel,
    player: PlayerModel | undefined,
    takeLead: (team: Team) => void,
    takeShift: () => void,
    validateSelection: (wordId : string) => void,
    changeWordSelected: (id: string, isSelected: boolean) => void
}


const GameComponentDiv = styled.div<{  player: PlayerModel | undefined }>`
    background-color : ${props => props.player == null ? 'whitesmoke' : getBackgroundColor(props.player.team)};
`;

const GameComponent: FC<GameComponentProps> = ({game, player, takeLead, takeShift, validateSelection, changeWordSelected}) => {

    const getWords = (game : GameModel) => game.rounds[game.roundId].words;

    const handleTakeLeadClick = () => {
        if (player != undefined)
            takeLead(player.team);
    }

    const handleTakeShiftClick = () => {
        takeShift();
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
                        ? <Button onClick={() => handleValidateSelectionClick()}>Valider</Button>
                        : <Button onClick={() => handleTakeShiftClick()}>A mon tour!</Button>}
                    </div>
                    : <Button onClick={() => handleTakeLeadClick()}>Prendre le lead</Button>
            }

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
