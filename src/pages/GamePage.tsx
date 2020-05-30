import React, {FC} from 'react';
import GameComponent from "../components/GameComponent";
import {GameAction, WordAction} from "../types/enums";
import {GameModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil";
import {userIdState} from "../types/atoms";

interface GamePageProps {
    game: GameModel,
    actOnGame: (gameAction: GameAction, gameId : string) => Promise<void>,
    actOnWord: (wordAction : WordAction, gameId :string, wordId : string) => Promise<void>
}

const GamePage : FC<GamePageProps> = ({game, actOnGame, actOnWord}) => {

    const userId = useRecoilValue(userIdState);

    return (
        <GameComponent
            game={game}
            // @ts-ignore
            player={game.players.find(p => p.userId === userId)}
            takeShift={() => actOnGame(GameAction.TakeShift, game.id)}
            validateSelection={(wordId : string) => actOnWord(WordAction.Validate, game.id, wordId)}
            changeWordSelected={(wordId : string, isSelected) => actOnWord(isSelected ? WordAction.Select :WordAction.Unselect, game.id, wordId)}
        />);
}

export default GamePage;