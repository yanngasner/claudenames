import {useEffect, useState} from "react";
import {db} from "./firebase";
import {DbGameModel} from "../types/dBTypes";
import {useRecoilValue} from "recoil"
import {userEmailState} from "../types/atoms";
import {GameAction, Team} from "../types/enums";
import firebase from "firebase";


const useGame =  () : [DbGameModel[], (inputName: string) => Promise<void>, (gameAction: GameAction, gameId : string) => Promise<void>] => {

    const [games, setGames] = useState<DbGameModel[]>([]);
    const userEmail = useRecoilValue(userEmailState);

    const createGame = async (name: string) => {
        const newGameRef = await db.ref("games").push({
            name: name,
            creationTime: new Date(),
            authorEmail: userEmail,
            players:[]
        });
        await newGameRef.update({"id": newGameRef.key})
        await newGameRef.child('players').child(`${userEmail.replace(/\./g, ',')}`).set({
            email : userEmail,
            name : '',
            team : 0,
            isPilot : false,
            isAuthor : true
        });
    }

    const joinGame = async (gameRef: firebase.database.Reference, team : Team) => {
        const playerRef = gameRef.child('players').child(`${userEmail.replace(/\./g, ',')}`);
        await playerRef.once("value", async snapshot => {
            if (snapshot.exists()) {
                await playerRef.update({"team": team})
            } else {
                await playerRef.set({
                    email: userEmail,
                    name: '',
                    team: team,
                    isPilot: false,
                    isAuthor: false
                })
            }
        });
    }

    const updateGame = async (gameRef : firebase.database.Reference, gameAction: GameAction) => {
        switch (gameAction) {
            case GameAction.Start :
                await gameRef.update({
                    startTime: new Date(),
                    endTime : null
                });
                break;
            case GameAction.End :
                await  gameRef.update({
                    endTime: Date.now()
                });
                break;

            case GameAction.JoinBlue :
                await joinGame(gameRef, Team.Blue);
                break;

            case GameAction.JoinRed :
                await joinGame(gameRef, Team.Red);
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
                let dbGames: DbGameModel[] = [];
                snapshot.forEach((snap) => {
                    const players = snap.val().players
                    dbGames.push({
                        ...snap.val(),
                        players: players == null ? [] : [...Object.keys(players).map(key => players[key])]
                    });
                });
                setGames(dbGames)
            })
        }
        , []);

    return [games, createGame, actOnGame]
}

export {useGame};
