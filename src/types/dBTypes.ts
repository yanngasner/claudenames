import {Team, WordType} from "./enums";

export interface DbGameModel {
    readonly id: string,
    readonly name : string,
    readonly creationTime : Date,
    readonly startTime : Date | null,
    readonly endTime : Date | null,
    readonly words : readonly DbWordModel[],
    readonly players : readonly DbPlayerModel[],
    readonly roundNumber : number,
    readonly authorEmail: string | null
}

export interface DbPlayerModel {
    readonly email : string,
    readonly name : string,
    readonly team : Team,
    readonly isPilote : boolean,
    readonly isAuthor : boolean,
}


export interface DbWordModel {
    readonly wordType : WordType,
    readonly unveiled : boolean
    readonly isSelected : boolean
}