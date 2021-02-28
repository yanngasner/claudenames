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
    Playing,
    BlueWins,
    RedWins,
    Deuce ,
}

export enum GameAction {
    Start,
    JoinBlue,
    JoinRed,
    LeadBlue,
    LeadRed,
    TakeShift,
}

export enum WordAction {
    Select,
    Unselect,
    Validate,
}