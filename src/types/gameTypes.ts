import {DbGameModel} from "./dBTypes";


export interface GameModel extends DbGameModel {
    startGame : () => void,
    endGame : () => void,
}

