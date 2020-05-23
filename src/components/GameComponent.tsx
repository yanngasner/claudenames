import React, {FC} from 'react';
import {GameModel, PlayerModel} from "../types/gameTypes";
import WordComponent from "./WordComponent";

interface GameComponentProps {
    game: GameModel,
    player: PlayerModel | undefined,
    takeShift: () => void,
    validateSelection: () => void,
    // selectWord: (id : string, selected : boolean) =>  void
}

const GameComponent : FC<GameComponentProps> = ({game, player, takeShift, validateSelection}) => {
    return (
        <div>
            <div><p>{`game = ${game.id}`}</p></div>
            {game.words.map(word => <WordComponent word={word}/>)}
        </div>
    );
}

export default GameComponent;
