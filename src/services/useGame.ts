import {useEffect, useState} from "react";
import {db} from "./firebase";
import {GameModel, RoundModel, WordModel} from "../types/gameTypes";
import {GameAction, RoundStatus, Team, WordAction, WordType} from "../types/enums";
import firebase from "firebase";
import wordsList from "../resources/wordsList";
import {useRecoilValue} from "recoil";
import {userIdState, userNameState} from "../types/atoms";


const useGame = ():
    [GameModel[],
        (inputName: string) => Promise<void>,
        (gameAction: GameAction, gameId: string, roundId: number, team: Team) => Promise<void>,
        (wordAction: WordAction, gameId: string, roundId: number, team: Team, wordId: string) => Promise<void>,
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

    const getWordTypesAndStartingTeam = () : [WordType[], Team] => {

        const firstTeam = Math.random() < 0.5 ? Team.Green : Team.Red;
        const secondTeam = firstTeam === Team.Green ? Team.Red : Team.Green;
        const firstWordType = firstTeam === Team.Green ? WordType.Green : WordType.Red;
        const secondWordType = secondTeam === Team.Green ? WordType.Green : WordType.Red;
        let assignedCount = 0;
        let wordTypesArray: WordType[] = Array(gameWordsCount).fill(WordType.Unassigned);

        let index = Math.floor(Math.random() * gameWordsCount);
        wordTypesArray[index] = WordType.Forbidden;
        assignedCount +=1;

        while (assignedCount < 10) {
            index = Math.floor(Math.random() * gameWordsCount);
            if (wordTypesArray[index] === WordType.Unassigned) {
                wordTypesArray[index] = firstWordType;
                assignedCount +=1;
            }
        }

        while (assignedCount < 18) {
            index = Math.floor(Math.random() * gameWordsCount);
            if (wordTypesArray[index] === WordType.Unassigned) {
                wordTypesArray[index] = secondWordType;
                assignedCount +=1;
            }
        }
        return [wordTypesArray, firstTeam];
    }

    const createGame = async (name: string) => {
        const newGameRef = await db.ref("games").push({
            name: name,
            creationTime: Date.now(),
            players: [],
            roundId : 0,
        });
        await newGameRef.update({id: newGameRef.key});

        await createRound(newGameRef, 0);
    }

    const createRound = async (gameRef: firebase.database.Reference, roundId: number) => {

        const words = getWords();
        const [wordTypes, startingTeam] = getWordTypesAndStartingTeam();

        await gameRef.child('rounds').child(`${roundId}`).set({
            roundStatus: RoundStatus.Waiting,
            startingTeam: startingTeam,
            words:[]
        });
        await gameRef.update({roundId: roundId})

        for (let i = 0; i < 25; i++) {
            await gameRef.child('rounds').child(`${roundId}`).child("words").child(`${i}`).set({
                id: i,
                text: words[i],
                wordType: wordTypes[i],
                isUnveiled: false,
                isSelected: false,
            });
        }
    }

    const nextRound = async (gameRef: firebase.database.Reference) => {
        await gameRef.once("value", async snapshot => {
            if (snapshot.exists()) {
                const roundId = snapshot.val().roundId;
                await createRound(gameRef, roundId + 1);
            }
        });
    }

    const joinGame = async (gameRef: firebase.database.Reference, team: Team) => {
        const playerRef = gameRef.child('players').child(userId);
        await playerRef.once("value", async snapshot => {
            if (snapshot.exists()) {
                await playerRef.update({team: team})
            } else {
                await playerRef.set({
                    userId: userId,
                    userName: userName,
                    team: team,
                })
            }
        });
    }

    const endShift = async (roundRef: firebase.database.Reference, team: Team) => {
        const roundStatusRef = roundRef.child('roundStatus')
        await roundStatusRef.once("value", async snapshot => {
            await roundRef.update({roundStatus: snapshot.val() === RoundStatus.GreenPlaying ? RoundStatus.RedPlaying : RoundStatus.GreenPlaying})
        });
    }

    const setLeader = async (roundRef: firebase.database.Reference, team: Team) => {

        const targetChild = team === Team.Green ? "greenLeaderId" : "redLeaderId";
        const leaderRef = roundRef.child(targetChild);
        await leaderRef.set(userId);

        const oppositeTargetChild = team === Team.Green ? "redLeaderId" : "greenLeaderId";
        const oppositeLeaderRef = roundRef.child(oppositeTargetChild);
        await oppositeLeaderRef.once("value", async snapshot => {
            if (snapshot.exists()) {
                const startingTeam = roundRef.child('startingTeam');
                await startingTeam.once("value", async snapshot => {
                    await roundRef.update({roundStatus: snapshot.val() === Team.Green ? RoundStatus.GreenPlaying : RoundStatus.RedPlaying})
                });
            }
        });

    }

    const setSelected = async (wordRef: firebase.database.Reference, selected: boolean) => {
        await wordRef.update({isSelected: selected});
    }

    const validateWord = async (roundRef: firebase.database.Reference, wordRef: firebase.database.Reference, team: Team) => {
        await wordRef.update({
            isSelected: false,
            isUnveiled: true,
        });

        await roundRef.once("value", async snapshot => {
            const words: WordModel[] = snapshot.val().words;
            const unveiledWords = words.filter(w => w.isUnveiled);
            const inGameWords = words.filter(w => !w.isUnveiled);
            const blackOut = unveiledWords.some(w => w.wordType === WordType.Forbidden);
            const greenDone = !inGameWords.some(w => w.wordType === WordType.Green);
            const redDone = !inGameWords.some(w => w.wordType === WordType.Red);
            if (blackOut) {
                await roundRef.update({roundStatus: team === Team.Green ? RoundStatus.RedWins : RoundStatus.GreenWins});
            } else if (greenDone && redDone) {
                await roundRef.update({roundStatus: RoundStatus.Deuce});
            } else if (greenDone) {
                await roundRef.update({roundStatus: RoundStatus.GreenWins});
            } else if (redDone) {
                await roundRef.update({roundStatus: RoundStatus.RedWins});
            }
        });
    }

    const updateGame = async (gameRef: firebase.database.Reference, roundRef: firebase.database.Reference, team: Team, gameAction: GameAction) => {
        switch (gameAction) {

            case GameAction.Join :
                await joinGame(gameRef, team);
                break;

            case GameAction.Lead :
                await setLeader(roundRef, team);
                break;

            case GameAction.EndShift :
                await endShift(roundRef, team);
                break;

            case GameAction.NextRound :
                await nextRound(gameRef);
                break;
        }
    }

    const updateWord = async (roundRef: firebase.database.Reference, wordRef: firebase.database.Reference, team: Team, wordAction: WordAction) => {

        switch (wordAction) {

            case WordAction.Select :
                await setSelected(wordRef, true);
                break;

            case WordAction.Unselect :
                await setSelected(wordRef, false);
                break;

            case WordAction.Validate :
                await validateWord(roundRef, wordRef, team);
                break;

        }
    }

    const actOnGame = async (gameAction: GameAction, gameId: string, roundId : number, team: Team) => {
        const gamePath = `games/${gameId}`;
        const gameRef = db.ref(gamePath);
        const roundPath = `${gamePath}/rounds/${roundId}`;
        const roundRef = db.ref(roundPath);
        await updateGame(gameRef, roundRef, team, gameAction);
    }

    const actOnWord = async (wordAction: WordAction, gameId: string, roundId : number, team: Team, wordId: string) => {
        const roundPath = `games/${gameId}/rounds/${roundId}`;
        const roundRef = db.ref(roundPath);
        const path = `${roundPath}/words/${wordId}`;
        const wordRef = db.ref(path);
        await updateWord(roundRef, wordRef, team, wordAction);
    }

    const getGameModel = (snap: firebase.database.DataSnapshot) : GameModel => {
        const players = snap.val().players;
        const rounds = snap.val().rounds;
        let roundModels : RoundModel[] = [];
        rounds?.forEach((round: any) => {
            const words = round.words;
            roundModels.push({
                ...round,
                words: words == null ? [] : [...Object.keys(words).map(key => words[key])]
            })
        })
        return ({
            ...snap.val(),
            players: players == null ? [] : [...Object.keys(players).map(key => players[key])],
            rounds: roundModels,
        })
    }

    useEffect(() => {
            db.ref("games").on('value', snapshot => {
                let dbGames: GameModel[] = [];
                snapshot.forEach((snap) =>{
                    dbGames.push(getGameModel(snap));
                });
                setGames(dbGames);
            })
            setGamesLoaded(true)
        }
        , [userId]);

    return [games, createGame, actOnGame, actOnWord, areGamesLoaded]
}

export {useGame};
