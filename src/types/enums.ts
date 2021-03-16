export enum Team {
    Green,
    Red,
}

export enum WordType {
    Unassigned,
    Green,
    Red,
    Forbidden
}

export enum RoundStatus {
    Waiting,
    GreenPlaying,
    RedPlaying,
    GreenWins,
    RedWins,
    Deuce ,
}

export enum GameAction {
    Join,
    Lead,
    EndShift,
    NextRound,
}

export enum WordAction {
    Select,
    Unselect,
    Validate,
}