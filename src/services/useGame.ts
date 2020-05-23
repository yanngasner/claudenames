import {useEffect, useState} from "react";
import {db} from "./firebase";
import {GameModel} from "../types/gameTypes";
import {useRecoilValue} from "recoil"
import {userEmailState} from "../types/atoms";
import {GameAction, Team, WordType} from "../types/enums";
import firebase from "firebase";


const useGame = (): [GameModel[],
    (inputName: string) => Promise<void>,
    (gameAction: GameAction, gameId: string) => Promise<void>,
    boolean] => {

    const [games, setGames] = useState<GameModel[]>([]);
    const userEmail = useRecoilValue(userEmailState);
    const [areGamesLoaded, setGamesLoaded] = useState(false);

    const createGame = async (name: string) => {
        const newGameRef = await db.ref("games").push({
            name: name,
            creationTime: new Date(),
            authorEmail: userEmail,
            players: []
        });
        await newGameRef.update({"id": newGameRef.key})
        await newGameRef.child('players').child(`${userEmail.replace(/\./g, ',')}`).set({
            email: userEmail,
            name: '',
            team: Team.Blue,
            lead: false,
            isAuthor: true
        });
        for (let i = 0; i < 25; i++) {
            const newWordRef = await newGameRef.child('words').push({
                text: '',
                wordType: WordType.Unassigned,
                unveiled: false,
                isSelected: false,
            });
            await newWordRef.update({"id": newWordRef.key});
        }
    }

    const joinGame = async (gameRef: firebase.database.Reference, team: Team) => {
        const playerRef = gameRef.child('players').child(`${userEmail.replace(/\./g, ',')}`);
        await playerRef.once("value", async snapshot => {
            if (snapshot.exists()) {
                await playerRef.update({"team": team})
            } else {
                await playerRef.set({
                    email: userEmail,
                    name: '',
                    team: team,
                    lead: false,
                    isAuthor: false
                })
            }
        });
    }

    const setLeader = async (gameRef: firebase.database.Reference, lead: boolean) => {
        const playerRef = gameRef.child('players').child(`${userEmail.replace(/\./g, ',')}`);
        await playerRef.once("value", async snapshot => {
            if (snapshot.exists()) {
                await playerRef.update({"lead": lead})
            }
        });
    }

    const updateGame = async (gameRef: firebase.database.Reference, gameAction: GameAction) => {
        switch (gameAction) {
            case GameAction.Start :
                await gameRef.update({
                    startTime: new Date(),
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

            case GameAction.Quit :
                await gameRef.child('players').child(`${userEmail.replace(/\./g, ',')}`).remove();
                break;
        }
    }

    const actOnGame = async (gameAction: GameAction, gameId: string) => {
        const path = `games/${gameId}`;
        const gameRef = db.ref(path);
        await updateGame(gameRef, gameAction);
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

    return [games, createGame, actOnGame, areGamesLoaded]
}

export {useGame};
