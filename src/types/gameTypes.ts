import {DbGameModel} from "./dBTypes";


export interface GameDescriptionModel extends DbGameModel {
    readonly startGame : () => void,
    readonly endGame : () => void,
    readonly joinBlueGame : () => void,
    readonly joinRedGame : () => void,
    readonly quitGame : () => void,
}

