import React, {FC} from 'react';
import GameComponent from "../components/GameComponent";
import {GameAction, Team, WordAction} from "../types/enums";
import {GameModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil";
import {userIdState} from "../types/atoms";

interface GamePageProps {
    game: GameModel,
    actOnGame: (gameAction: GameAction, gameId : string, team: Team) => Promise<void>,
    actOnWord: (wordAction : WordAction, gameId :string, roundId : number, wordId : string) => Promise<void>
}

const GamePage : FC<GamePageProps> = ({game, actOnGame, actOnWord}) => {

    const userId = useRecoilValue(userIdState);

    return (
        <GameComponent
            game={game}
            player={game.players.find(p => p.userId === userId)}
            joinTeam={(team : Team) => actOnGame(GameAction.Join, game.id, team)}
            takeLead={(team : Team) => actOnGame(GameAction.Lead, game.id, team)}
            endShift={(team: Team) => actOnGame(GameAction.EndShift, game.id, team)}
            validateSelection={(wordId : string) => actOnWord(WordAction.Validate, game.id, game.roundId, wordId)}
            changeWordSelected={(wordId : string, isSelected) => actOnWord(isSelected ? WordAction.Select :WordAction.Unselect, game.id, game.roundId, wordId)}
        />);
}

export default GamePage;