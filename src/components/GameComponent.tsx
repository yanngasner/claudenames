import React, {FC} from 'react';
import {GameModel, PlayerModel} from "../types/gameTypes";
import WordComponent from "./WordComponent";
import './GameComponent.css'
import {Button} from "@material-ui/core";

interface GameComponentProps {
    game: GameModel,
    player: PlayerModel | undefined,
    takeShift: () => void,
    validateSelection: (wordId : string) => void,
    changeWordSelected: (id: string, isSelected: boolean) => void
}

const GameComponent: FC<GameComponentProps> = ({game, player, takeShift, validateSelection, changeWordSelected}) => {

    const handleTakeShiftClick = () => {
        takeShift();
    }

    const handleValidateSelectionClick = () => {
        game.words.filter(w => w.isSelected).forEach(w => validateSelection(w.id));
    }

    return (
        <div className={'game-component'}>
            {
                player?.isLeader
                    ? <div>
                        {player?.isPlaying
                        ? <Button onClick={() => handleValidateSelectionClick()}>Valider</Button>
                        : <Button onClick={() => handleTakeShiftClick()}>A mon tour!</Button>}
                    </div>
                    : <div></div>
            }

            <div className='words-container'>
                {game.words.map(word =>
                    <WordComponent
                        word={word}
                        changeWordSelected={(isSelected: boolean) => changeWordSelected(word.id, isSelected)}
                    />
                )}
            </div>
        </div>
    );
}

export default GameComponent;
