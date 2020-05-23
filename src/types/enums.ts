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

export enum GameAction {
    Start,
    End,
    JoinBlue,
    JoinRed,
    Quit,
    Lead,
    Unlead = 6,
}