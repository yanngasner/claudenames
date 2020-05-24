import React, {FC} from 'react';
import GameComponent from "../components/GameComponent";
import {GameAction, WordAction} from "../types/enums";
import {GameModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil";
import {userEmailState} from "../types/atoms";

interface GamePageProps {
    game: GameModel,
    actOnGame: (gameAction: GameAction, gameId : string) => Promise<void>,
    actOnWord: (wordAction : WordAction, gameId :string, wordId : string) => Promise<void>
}

const GamePage : FC<GamePageProps> = ({game, actOnGame, actOnWord}) => {

    const userEmail = useRecoilValue(userEmailState);

    return (
        <GameComponent
            game={game}
            player={game.players.find(p => p.email === userEmail)}
            takeShift={() => actOnGame(GameAction.TakeShift, game.id)}
            validateSelection={(wordId : string) => actOnWord(WordAction.Validate, game.id, wordId)}
            changeWordSelected={(wordId : string, isSelected) => actOnWord(isSelected ? WordAction.Select :WordAction.Unselect, game.id, wordId)}
        />);
}

export default GamePage;