import {RoundStatus, Team, WordType} from "./enums";

export interface GameModel {
    readonly id: string,
    readonly name : string,
    readonly creationTime : Date,
    readonly players : readonly PlayerModel[],
    readonly rounds : readonly RoundModel[],
    readonly roundId : number
}

export interface RoundModel {
    readonly words : readonly WordModel[],
    readonly players : readonly string[],
    readonly greenLeaderId : string,
    readonly redLeaderId : string,
    readonly roundStatus : RoundStatus,
}

export interface PlayerModel {
    readonly userId : string,
    readonly userName : string,
    readonly team : Team,
}

export interface WordModel {
    readonly id:string,
    readonly text : string,
    readonly wordType : WordType,
    readonly isUnveiled : boolean
    readonly isSelected : boolean
}