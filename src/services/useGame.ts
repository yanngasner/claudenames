import React, {useEffect, useState} from "react";
import {db, auth} from "./firebase";
import {DbGameModel} from "../types/dBTypes";
import {useRecoilValue} from "recoil"
import {userEmailState} from "../types/atoms";


const useGames : () => [DbGameModel[], (
    inputName: string) => Promise<void>,
    (id : string) => Promise<void>,
    (id : string) => Promise<void>]
= () => {

    const [games, setGames] = useState<DbGameModel[]>([]);
    const userEmail = useRecoilValue(userEmailState);

    const createGame = async (name: string) => {
        const newGameRef = await db.ref("games").push({
            name: name,
            creationTime: Date.now(),
            authorEmail: userEmail
        });
        await newGameRef.update({"id" : newGameRef.key})
    }

    const startGame = async (id : string) => {
        const gameRef = db.ref('games/'+id);
        // const snapshot = await gameRef.child('authorEmail').once('value');
        // if (snapshot.val() != userEmail)
        //     return;
        await gameRef.update({
            startTime: Date.now(),
            endTime: null,
        });
    }

    const endGame = async (id : string) => {
        const gameRef = db.ref('games/'+id);
        // const snapshot = await gameRef.child('authorEmail').once('value');
        // if (snapshot.val() != userEmail)
        //     return;
        await gameRef.update({
            endTime: Date.now()
        });
    }

    useEffect(() => {
            db.ref("games").on('value', snapshot => {
                let dbGames: DbGameModel[] = [];
                snapshot.forEach((snap) => {
                    dbGames.push({...snap.val()});
                });
                setGames(dbGames)
            })
        }
        , []);

    return [games, createGame, startGame, endGame]
}

export {useGames}
