export interface GameModel {
    name : string,
    startTime : Date | null,
    endTime : Date | null,
    isStarted : boolean,
    //words : Word[],
    //players : Player[],
    //roundNumber : 1
}

export interface Player {
    email : string,
    name : string,
    team : Team,
    isPilote : boolean,
}

export interface Round {
    roundNumber : number,
    player : string,

}

export enum Team {
    Blue,
    Red,
}

export enum WordType {
    Blue,
    Red,
    Yellow,
    Black
}

export interface Word {
    wordType : WordType,
    unveiled : boolean
    isSelected : boolean
}