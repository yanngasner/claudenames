import React, {FC, useState} from 'react';
import GameComponent from "../components/GameComponent";
import {GameAction, Team, WordAction} from "../types/enums";
import {GameModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil";
import {userIdState} from "../types/atoms";
import {MenuComponent} from "../components/MenuComponent";
import './MainPage.css';
import RulesComponent from "../components/RulesComponent";

interface MainPageProps {
    games: GameModel[],
    createGame: (inputName: string) => Promise<void>,
    game: GameModel | undefined,
    actOnGame: (gameAction: GameAction, gameId: string, roundId: number, team: Team) => Promise<void>,
    actOnWord: (wordAction: WordAction, gameId: string, roundId: number, team: Team, wordId: string) => Promise<void>
}

const MainPage : FC<MainPageProps> = ({games, createGame, game, actOnGame, actOnWord}) => {

    const userId = useRecoilValue(userIdState);
    const [isMenuVisible, setMenuVisible] = useState(game == undefined)
    const [isRulesVisible, setRulesVisible] = useState(false)
    return (
        <div className='game-page'>
            <div className={'main-menu'}>
                <MenuComponent
                    games={games}
                    createGame={createGame}
                    isVisible={isMenuVisible}
                />
            </div>
            <div className={'main-game'}>
                {game != undefined
                    ? <GameComponent
                        game={game}
                        player={game.players.find(p => p.userId === userId)}
                        joinTeam={(team: Team) => actOnGame(GameAction.Join, game.id, game.roundId, team)}
                        takeLead={(team: Team) => actOnGame(GameAction.Lead, game.id, game.roundId, team)}
                        endShift={(team: Team) => actOnGame(GameAction.EndShift, game.id, game.roundId, team)}
                        requestNextRound={(team: Team) => actOnGame(GameAction.NextRound, game.id, game.roundId, team)}
                        validateSelection={(team: Team, wordId: string) => actOnWord(WordAction.Validate, game.id, game.roundId, team, wordId)}
                        changeWordSelected={(team: Team, wordId: string, isSelected) => actOnWord(isSelected ? WordAction.Select : WordAction.Unselect, game.id, game.roundId, team, wordId)}
                        changeMenuVisibility={() => setMenuVisible(!isMenuVisible)}
                        changeRulesVisibility={() => setRulesVisible(!isRulesVisible)}
                    />
                    : <div></div>
                }
            </div>
            <div className={'main-rules'}>
                <RulesComponent isVisible={isRulesVisible}/>
            </div>
        </div>
    );
}

export default MainPage;