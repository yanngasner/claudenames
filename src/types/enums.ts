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
    Lead,
    Unlead = 6,
    TakeShift = 7,
}

export enum WordAction {
    Select,
    Unselect,
    Validate,
}