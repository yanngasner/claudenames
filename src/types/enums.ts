export enum Team {
    Blue,
    Red,
}

export enum WordType {
    Unassigned,
    Blue,
    Red,
    Forbidden
}

export enum RoundStatus {
    Waiting,
    BluePlaying,
    RedPlaying,
    BlueWins,
    RedWins,
    Deuce ,
}

export enum GameAction {
    Join,
    Lead,
    EndShift,
}

export enum WordAction {
    Select,
    Unselect,
    Validate,
}