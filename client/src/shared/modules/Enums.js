"use strict";
exports.__esModule = true;
var Suit;
(function (Suit) {
    Suit["Hearts"] = "hearts";
    Suit["Diamonds"] = "diamonds";
    Suit["Clubs"] = "clubs";
    Suit["Spades"] = "spades";
})(Suit = exports.Suit || (exports.Suit = {}));
var Rank;
(function (Rank) {
    Rank["Ace"] = "ace";
    Rank["Jack"] = "jack";
    Rank["King"] = "king";
    Rank["Queen"] = "queen";
})(Rank = exports.Rank || (exports.Rank = {}));
var Turn;
(function (Turn) {
    Turn["Check"] = "check";
    Turn["Fold"] = "fold";
    Turn["Raise"] = "raise";
})(Turn = exports.Turn || (exports.Turn = {}));
var Action;
(function (Action) {
    Action["GameData"] = "gameData";
    Action["Disconnect"] = "disconnect";
    Action["Turn"] = "turn";
})(Action = exports.Action || (exports.Action = {}));
