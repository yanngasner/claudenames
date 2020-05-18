import {Team, WordType} from "./enums";

export interface DbGameModel {
    id: string,
    name : string,
    startTime : Date | null,
    endTime : Date | null,
    isStarted : boolean,
    words : DbWordModel[],
    players : DbPlayerModel[],
    roundNumber : 1,
}

export interface DbPlayerModel {
    email : string,
    name : string,
    team : Team,
    isPilote : boolean,
}


export interface DbWordModel {
    wordType : WordType,
    unveiled : boolean
    isSelected : boolean
}