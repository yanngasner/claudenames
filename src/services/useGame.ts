import {useEffect, useState} from "react";
import {db} from "./firebase";
import {GameModel} from "../types/gameTypes";
import {GameAction, Team, WordAction, WordType} from "../types/enums";
import firebase from "firebase";
import wordsList from "../resources/wordsList";
import {useRecoilValue} from "recoil";
import {userIdState, userNameState} from "../types/atoms";


const useGame = ():
    [GameModel[],
        (inputName: string) => Promise<void>,
        (gameAction: GameAction, gameId: string) => Promise<void>,
        (wordAction: WordAction, gameId: string, wordId: string) => Promise<void>,
        boolean] => {

    const userId = useRecoilValue(userIdState);
    const userName = useRecoilValue(userNameState);

    const gameWordsCount = 25;
    const [games, setGames] = useState<GameModel[]>([]);
    const [areGamesLoaded, setGamesLoaded] = useState(false);

    const getWords = () : string[] => {

        const completeWordsArray = wordsList;
        const completeWordsCount = completeWordsArray.length;
        let wordsCount = 0;
        let indexesArray: number[] = [];

        while (wordsCount < gameWordsCount) {
            const index = Math.floor(Math.random() * completeWordsCount);
            if (!indexesArray.includes(index)) {
                indexesArray.push(index);
                wordsCount+=1;
            }
        }

        return indexesArray.map(i => completeWordsArray[i]);
    }

    const getWordTypes = () : WordType[] => {

        const firstTeam = Math.random() < 0.5 ? WordType.Blue : WordType.Red;
        const secondTeam = firstTeam === WordType.Blue ? WordType.Red : WordType.Blue;
        let assignedCount = 0;
        let wordTypesArray: WordType[] = Array(gameWordsCount).fill(WordType.Unassigned);

        let index = Math.floor(Math.random() * gameWordsCount);
        wordTypesArray[index] = WordType.Forbidden;
        assignedCount +=1;

        while (assignedCount < 10) {
            index = Math.floor(Math.random() * gameWordsCount);
            if (wordTypesArray[index] === WordType.Unassigned) {
                wordTypesArray[index] = firstTeam;
                assignedCount +=1;
            }
        }

        while (assignedCount < 18) {
            index = Math.floor(Math.random() * gameWordsCount);
            if (wordTypesArray[index] === WordType.Unassigned) {
                wordTypesArray[index] = secondTeam;
                assignedCount +=1;
            }
        }
        return wordTypesArray;
    }

    const createGame = async (name: string) => {
        const words = getWords();
        const types = getWordTypes();
        const newGameRef = await db.ref("games").push({
            name: name,
            creationTime: Date.now(),
            authorId: userId,
            players: []
        });
        await newGameRef.update({id: newGameRef.key})
        await newGameRef.child('players').child(userId).set({
            userId: userId,
            userName: userName,
            team: Team.Blue,
            isLeader: false,
            isAuthor: true
        });
        for (let i = 0; i < 25; i++) {
            await newGameRef.child('words').child(`${i}`).set({
                id: i,
                text: words[i],
                wordType: types[i],
                isUnveiled: false,
                isSelected: false,
            });
        }
    }

    const joinGame = async (gameRef: firebase.database.Reference, team: Team) => {
        const playerRef = gameRef.child('players').child(userId);
        await playerRef.once("value", async snapshot => {
            if (snapshot.exists()) {
                await playerRef.update({team: team})
            } else {
                await playerRef.set({
                    userName: userName,
                    name: '',
                    team: team,
                    isLeader: false,
                    isAuthor: false
                })
            }
        });
    }

    const takeShift = async (gameRef: firebase.database.Reference) => {
        const playersRef = gameRef.child('players');
        await playersRef.once("value", async snapshot => {
            await snapshot.ref.update({isPlaying:false})
        });
        const playerRef = playersRef.child(userId);
        await playerRef.once("value", async snapshot => {
            if (snapshot.exists()) {
                await playerRef.update({isPlaying: true})
            }
        });
    }

    const setLeader = async (gameRef: firebase.database.Reference, isLeader: boolean) => {
        const playerRef = gameRef.child('players').child(userId);
        await playerRef.once("value", async snapshot => {
            if (snapshot.exists()) {
                await playerRef.update({isLeader: isLeader})
            }
        });
    }

    const setSelected = async (wordRef: firebase.database.Reference, selected: boolean) => {
        await wordRef.once("value", async snapshot => {
            if (snapshot.exists()) {
                await wordRef.update({isSelected: selected})
            }
        });
    }

    const validateWord = async (wordRef: firebase.database.Reference) => {
        await wordRef.once("value", async snapshot => {
            if (snapshot.exists()) {
                await wordRef.update({
                    isSelected: false,
                    isUnveiled: true,
                })
            }
        });
    }

    const updateGame = async (gameRef: firebase.database.Reference, gameAction: GameAction) => {
        switch (gameAction) {
            case GameAction.Start :
                await gameRef.update({
                    startTime: Date.now(),
                    endTime: null
                });
                break;

            case GameAction.End :
                await gameRef.update({
                    endTime: Date.now()
                });
                break;

            case GameAction.JoinBlue :
                await joinGame(gameRef, Team.Blue);
                break;

            case GameAction.JoinRed :
                await joinGame(gameRef, Team.Red);
                break;

            case GameAction.Lead :
                await setLeader(gameRef, true);
                break;

            case GameAction.Unlead :
                await setLeader(gameRef, false);
                break;

            case GameAction.TakeShift :
                await takeShift(gameRef);
                break;
        }
    }

    const updateWord = async (wordRef: firebase.database.Reference, wordAction: WordAction) => {

        switch (wordAction) {

            case WordAction.Select :
                await setSelected(wordRef, true);
                break;

            case WordAction.Unselect :
                await setSelected(wordRef, false);
                break;

            case WordAction.Validate :
                await validateWord(wordRef);
                break;

        }
    }

    const actOnGame = async (gameAction: GameAction, gameId: string) => {
        const path = `games/${gameId}`;
        const gameRef = db.ref(path);
        await updateGame(gameRef, gameAction);
    }

    const actOnWord = async (wordAction: WordAction, gameId: string, wordId: string) => {
        const path = `games/${gameId}/words/${wordId}`;
        const wordRef = db.ref(path);
        await updateWord(wordRef, wordAction);
    }

    useEffect(() => {
            db.ref("games").on('value', snapshot => {
                let dbGames: GameModel[] = [];
                snapshot.forEach((snap) => {
                    const players = snap.val().players;
                    const words = snap.val().words;
                    dbGames.push({
                        ...snap.val(),
                        players: players == null ? [] : [...Object.keys(players).map(key => players[key])],
                        words: words == null ? [] : [...Object.keys(words).map(key => words[key])],
                    });
                });
                setGames(dbGames);
                setGamesLoaded(true);
            })
        }
        , []);

    return [games, createGame, actOnGame, actOnWord, areGamesLoaded]
}

export {useGame};
