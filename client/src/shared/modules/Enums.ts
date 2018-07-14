export enum Suit{
    Hearts = "hearts",
    Diamonds = "diamonds",
    Clubs = "clubs",
    Spades = "spades"
}

export enum Rank{
    Ace = "ace",
    Jack = "jack",
    King = "king",
    Queen = "queen"
}

export enum Turn {
    Check = 'check',
    Fold = 'fold',
    Raise = 'raise'
}

export enum Action {
    GameData = 'gameData',
    Disconnect = 'disconnect',
    Turn = 'turn',
    EndRound = 'endRound',
    Message = 'message'
}

export enum MessageType{
    Succes = 'succes',
    Info = 'info',
    Warning = 'warning',
    Danger = 'danger'
}