import {Team, WordType} from "./enums";

export interface DbGameModel {
    id: string,
    name : string,
    creationTime : Date,
    startTime : Date | null,
    endTime : Date | null,
    words : DbWordModel[],
    players : DbPlayerModel[],
    roundNumber : number,
    authorEmail: string | null
}

export interface DbPlayerModel {
    email : string,
    name : string,
    team : Team,
    isPilote : boolean,
    isAuthor : boolean,
}


export interface DbWordModel {
    wordType : WordType,
    unveiled : boolean
    isSelected : boolean
}