import React, {useEffect, useState} from "react";
import {db, auth} from "./firebase";
import {DbGameModel} from "../types/dBTypes";



const useGames : () => [DbGameModel[], (
    inputName: string) => Promise<void>,
    (id : string) => Promise<void>,
    (id : string) => Promise<void>]
= () => {

    const [games, setGames] = useState<DbGameModel[]>([]);

    const createGame = async (name: string) => {
        const newGameRef = await db.ref("games").push({
            name: name,
            isStarted: false,
            startTime: Date.now(),
        });
        await newGameRef.update({"id" : newGameRef.key})
    }

    const endGame = async (id : string) => {
        await db.ref('games/'+id).update({
            endTime: Date.now()
        });
    }

    const startGame = async (id : string) => {
        await db.ref('games/'+id).update({
            isStarted: true,
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

    return [games, createGame, endGame, startGame]
}

export {useGames}
