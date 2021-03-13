import React, {FC} from 'react';
import GameComponent from "../components/GameComponent";
import {GameAction, Team, WordAction} from "../types/enums";
import {GameModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil";
import {userIdState} from "../types/atoms";
import {GameMenu} from "../components/GameMenu";
import './GamePage.css';
import RulesComponent from "../components/RulesComponent";

interface GamePageProps {
    games: GameModel[],
    createGame: (inputName: string) => Promise<void>,
    game: GameModel,
    actOnGame: (gameAction: GameAction, gameId: string, roundId: number, team: Team) => Promise<void>,
    actOnWord: (wordAction: WordAction, gameId: string, roundId: number, team: Team, wordId: string) => Promise<void>
}

const GamePage : FC<GamePageProps> = ({games, createGame, game, actOnGame, actOnWord}) => {

    const userId = useRecoilValue(userIdState);

    return (
        <div className='game-page'>
            <GameMenu
                games={games}
                createGame={createGame}
                actOnGame={actOnGame}
                fromMenu={false}
            />
            <GameComponent
                game={game}
                player={game.players.find(p => p.userId === userId)}
                joinTeam={(team : Team) => actOnGame(GameAction.Join, game.id, game.roundId, team)}
                takeLead={(team : Team) => actOnGame(GameAction.Lead, game.id, game.roundId, team)}
                endShift={(team: Team) => actOnGame(GameAction.EndShift, game.id, game.roundId, team)}
                requestNextRound={(team: Team) => actOnGame(GameAction.NextRound, game.id, game.roundId, team)}
                validateSelection={(team : Team, wordId : string) => actOnWord(WordAction.Validate, game.id, game.roundId, team, wordId)}
                changeWordSelected={(team : Team, wordId : string, isSelected) => actOnWord(isSelected ? WordAction.Select :WordAction.Unselect, game.id, game.roundId, team, wordId)}
            />
            <RulesComponent fromMenu={false}/>
        </div>
    );
}

export default GamePage;