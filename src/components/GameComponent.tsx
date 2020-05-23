import React, {FC} from 'react';
import {GameModel, PlayerModel} from "../types/gameTypes";
import WordComponent from "./WordComponent";

interface GameComponentProps {
    game: GameModel,
    player: PlayerModel | undefined,
    takeShift: () => void,
    validateSelection: () => void,
    changeWordSelected: (id: string, isSelected: boolean) => void
}

const GameComponent: FC<GameComponentProps> = ({game, player, takeShift, validateSelection, changeWordSelected}) => {
    return (
        <div>
            <div><p>{`game = ${game.id}`}</p></div>
            {game.words.map(word =>
                <WordComponent
                    word={word}
                    changeWordSelected={(isSelected: boolean) => changeWordSelected(word.id, isSelected)}
                />
            )}
        </div>
    );
}

export default GameComponent;
