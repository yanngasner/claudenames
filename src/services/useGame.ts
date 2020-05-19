import {useEffect, useState} from "react";
import {db} from "./firebase";
import {DbGameModel} from "../types/dBTypes";
import {useRecoilValue} from "recoil"
import {userEmailState} from "../types/atoms";
import {GameAction, Team} from "../types/enums";
import firebase from "firebase";


const useGames: () => [DbGameModel[], (inputName: string) => Promise<void>, (gameAction: GameAction, game: DbGameModel) => Promise<void>]
    = () => {

    const [games, setGames] = useState<DbGameModel[]>([]);
    const userEmail = useRecoilValue(userEmailState);

    const createGame = async (name: string) => {
        const newGameRef = await db.ref("games").push({
            name: name,
            creationTime: Date.now(),
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

    const updateGameRef = async (gameRef : firebase.database.Reference, gameAction: GameAction) => {
        switch (gameAction) {
            case GameAction.Start :
                await  gameRef.update({
                    startTime: Date.now(),
                    endTime : null
                });
                return;
            case GameAction.End :
                await  gameRef.update({
                    endTime: Date.now()
                });
                return;
            case GameAction.Join :
                await  gameRef.child('players').child(`${userEmail.replace(/\./g, ',')}`).set({
                    email : userEmail,
                    name : '',
                    team : 0,
                    isPilot : false,
                    isAuthor : false
                });
                return;
            case GameAction.Quit :
                await  gameRef.child('players').child(`${userEmail.replace(/\./g, ',')}`).remove();
                return;

        }
    }

    const actOnGame = async (gameAction: GameAction, game: DbGameModel) => {
        const path = `games/${game.id}`;
        const gameRef = db.ref(path);
        await updateGameRef(gameRef, gameAction);
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

export {useGames};
