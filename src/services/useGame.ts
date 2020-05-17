import React, {useEffect, useState} from "react";
import {GameModel} from "../types/game";
import {db} from "./firebase";


const emptyGame = {
    name:"",
    isStarted : false,
    startTime : null,
    endTime : null
}

const useGame : () => [GameModel, (inputName: string) => Promise<void>, () => Promise<void>]
= () => {

    const [game, setGame] = useState<GameModel>(emptyGame);

    const createGame = async (name: string) => {
        await db.ref("game").set({
            name: name,
            isStarted: false,
            startTime: Date.now(),
        });
    }

    const endGame = async () => {
        await db.ref("game").update({
            endTime: Date.now()
        });
    }

    useEffect(() => {
            db.ref("game").on('value', snaphshot => {
                const gameValue = snaphshot.val()
                setGame({...gameValue})
            })
        }
        , []);

    return [game, createGame, endGame]
}

export {useGame}
