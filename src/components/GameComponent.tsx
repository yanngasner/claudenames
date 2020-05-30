import React, {FC} from 'react';
import {GameModel, PlayerModel} from "../types/gameTypes";
import WordComponent from "./WordComponent";
import './GameComponent.css'
import {Button} from "@material-ui/core";
import styled from "styled-components";
import {getBackgroundColor} from "../resources/colors";

interface GameComponentProps {
    game: GameModel,
    player: PlayerModel,
    takeShift: () => void,
    validateSelection: (wordId : string) => void,
    changeWordSelected: (id: string, isSelected: boolean) => void
}


const GameComponentDiv = styled.div<{ player: PlayerModel }>`
    background-color : ${props => getBackgroundColor(props.player.team)};
`;

const GameComponent: FC<GameComponentProps> = ({game, player, takeShift, validateSelection, changeWordSelected}) => {

    const getWords = (game : GameModel) => game.rounds[game.roundId].words;

    const handleTakeShiftClick = () => {
        takeShift();
    }

    const handleValidateSelectionClick = () => {
        getWords(game).filter(w => w.isSelected).forEach(w => validateSelection(w.id));
    }

    return (
        <GameComponentDiv player={player} className={'game-component'}>
            {
                player.isLeader
                    ? <div>
                        {player.isPlaying
                        ? <Button onClick={() => handleValidateSelectionClick()}>Valider</Button>
                        : <Button onClick={() => handleTakeShiftClick()}>A mon tour!</Button>}
                    </div>
                    : <div></div>
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
