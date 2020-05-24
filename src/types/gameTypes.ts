import {Team, WordType} from "./enums";

export interface GameModel {
    readonly id: string,
    readonly name : string,
    readonly creationTime : Date,
    readonly startTime : Date | null,
    readonly endTime : Date | null,
    readonly words : readonly WordModel[],
    readonly players : readonly PlayerModel[],
    readonly authorEmail: string | null
}

export interface PlayerModel {
    readonly email : string,
    readonly name : string,
    readonly team : Team,
    readonly isLeader : boolean,
    readonly isAuthor : boolean,
    readonly isPlaying : boolean,
}


export interface WordModel {
    readonly id:string,
    readonly text : string,
    readonly wordType : WordType,
    readonly isUnveiled : boolean
    readonly isSelected : boolean
}