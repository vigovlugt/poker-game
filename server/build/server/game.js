"use strict";
exports.__esModule = true;
var Enums_1 = require("../shared/modules/Enums");
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.prototype.turn = function (turnType, raiseMoney) {
        switch (turnType) {
            case Enums_1.Turn.Check:
                break;
            case Enums_1.Turn.Raise:
                break;
            case Enums_1.Turn.Fold:
                break;
            default:
                break;
        }
        if (this.turnPlayerIndex + 1 >= this.players.length) {
            this.turnPlayerIndex = 0;
        }
        else {
            this.turnPlayerIndex++;
        }
        this.turnPlayer = this.players[this.turnPlayerIndex];
    };
    Game.prototype.join = function (player) {
        this.players.push(player);
    };
    Game.prototype.onLeave = function (player) {
        // Handle Leave
    };
    Game.prototype.getGameData = function () {
        return {
            turnPlayer: this.turnPlayer,
            cards: this.publicCards
        };
    };
    Game.prototype.refreshDeck = function () {
        var _this = this;
        [2, 3, 4, 5, 6, 7, 8, 9, 10, Enums_1.Rank.Jack, Enums_1.Rank.Queen, Enums_1.Rank.King, Enums_1.Rank.Ace].forEach(function (rank) {
            [Enums_1.Suit.Clubs, Enums_1.Suit.Diamonds, Enums_1.Suit.Hearts, Enums_1.Suit.Spades].forEach(function (suit) {
                _this.deck.push({ suit: suit, rank: rank });
            });
        });
    };
    return Game;
}());
exports["default"] = Game;
