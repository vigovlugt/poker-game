"use strict";
exports.__esModule = true;
var Enums_1 = require("../client/src/shared/modules/Enums");
var chalk_1 = require("chalk");
var readline = require("readline");
var Game = /** @class */ (function () {
    function Game(io) {
        this.deck = [];
        this.publicCards = [];
        this.players = [];
        this.cardsByPlayer = {};
        this.ended = true;
        this.io = io;
    }
    Game.prototype.turn = function (turnType, raiseMoney) {
        if (this.ended)
            return;
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
        if (this.turnPlayerIndex + 1 >= this.players.length) { // All players did their turn;
            this.turnPlayerIndex = 0;
            this.turnPlayer = this.players[this.turnPlayerIndex];
            if (this.publicCards.length === 5) {
                this.endRound();
            }
            else {
                this.pickPublicCard();
                this.syncGameData();
            }
        }
        else {
            this.turnPlayerIndex++;
            this.turnPlayer = this.players[this.turnPlayerIndex];
            this.syncGameData();
        }
    };
    Game.prototype.startRound = function () {
        var _this = this;
        this.ended = false;
        this.turnPlayerIndex = 0;
        this.turnPlayer = this.players[0];
        this.cardsByPlayer = {};
        this.publicCards = [];
        this.refreshDeck();
        this.syncGameData();
        this.players.forEach(function (player) {
            _this.cardsByPlayer[player] = [_this.getCardFromDeck(), _this.getCardFromDeck()];
            _this.io.sockets.sockets[player].emit(Enums_1.Action.PrivateCards, _this.cardsByPlayer[player]);
        });
    };
    Game.prototype.endRound = function () {
        // Tell client round is done and who the winner(s) are
        var _this = this;
        var timeLeft = 15;
        var interval = setInterval(function () {
            readline.clearLine(process.stdout, 0);
            readline.cursorTo(process.stdout, 0);
            process.stdout.write('Round ended, starting new round in ' + --timeLeft);
            if (timeLeft <= 0) {
                clearInterval(interval);
                readline.clearLine(process.stdout, 0);
                readline.cursorTo(process.stdout, 0);
            }
        }, 1000);
        //console.log(chalk.blue);
        if (!this.ended && this.players.length > 1) {
            setTimeout(function () {
                _this.startRound();
            }, 15000);
        }
        this.ended = true;
        this.syncGameData();
        this.io.emit(Enums_1.Action.EndRound, {
            winners: this.getWinners(),
            cardsByPlayer: this.cardsByPlayer
        });
    };
    Game.prototype.getWinners = function () {
        return this.players;
    };
    Game.prototype.pickPublicCard = function () {
        this.publicCards.push(
        //Remove card from deck and add to public cards
        this.getCardFromDeck());
    };
    Game.prototype.getCardFromDeck = function () {
        return this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)[0];
    };
    Game.prototype.onJoin = function (player) {
        this.players.push(player);
        console.log(chalk_1["default"].green(player + " joined the game with " + this.players.length + " player(s)"));
        if (this.players.length === 2) {
            this.startRound();
        }
        else {
            this.io.emit(Enums_1.Action.Message, { text: 2 - this.players.length + " player(s) needed to start", type: Enums_1.MessageType.Info });
            this.syncGameData();
        }
    };
    Game.prototype.onLeave = function (leavePlayer) {
        // Handle Leave
        // console.log("begin:", this.players);
        delete this.cardsByPlayer[leavePlayer];
        if (this.turnPlayer === leavePlayer) { // Player had the turn 
            this.players.splice(this.players.indexOf(leavePlayer), 1);
            if (this.turnPlayerIndex === this.players.length) { // check if turnplayerindex outside array
                this.turnPlayerIndex = 0;
                this.turnPlayer = this.players[0];
            }
            else {
                // the next turnplayer is automatically the next player in players
                this.turnPlayer = this.players[this.turnPlayerIndex];
            }
        }
        else { // Leaveplayer did not have the turn
            // console.log(this.players.indexOf(leavePlayer))
            this.players.splice(this.players.indexOf(leavePlayer), 1);
            // Leaveplayer could have affected the index so just update it with te name
            this.turnPlayerIndex = this.players.indexOf(this.turnPlayer);
        }
        console.log(chalk_1["default"].red(leavePlayer + " left the game with " + this.players.length + " player(s)"));
        if (this.players.length < 2) {
            this.endRound();
        }
        else {
            this.syncGameData();
        }
        // console.log("end:", this.players);
    };
    Game.prototype.syncGameData = function () {
        this.io.emit(Enums_1.Action.GameData, this.getGameData());
    };
    Game.prototype.getGameData = function () {
        return {
            turnPlayer: this.turnPlayer,
            cards: this.publicCards,
            players: this.players.map(function (playerId) { return { id: playerId, name: playerId, money: 0 }; }),
            cardsByPlayer: (this.ended) ? this.cardsByPlayer : {}
        };
    };
    Game.prototype.refreshDeck = function () {
        var _this = this;
        this.deck = [];
        [2, 3, 4, 5, 6, 7, 8, 9, 10, Enums_1.Rank.Jack, Enums_1.Rank.Queen, Enums_1.Rank.King, Enums_1.Rank.Ace].forEach(function (rank) {
            [Enums_1.Suit.Clubs, Enums_1.Suit.Diamonds, Enums_1.Suit.Hearts, Enums_1.Suit.Spades].forEach(function (suit) {
                _this.deck.push({ suit: suit, rank: rank });
            });
        });
    };
    return Game;
}());
exports["default"] = Game;
