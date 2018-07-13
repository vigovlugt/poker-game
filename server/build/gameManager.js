"use strict";
exports.__esModule = true;
var socketIo = require("socket.io");
var Enums_1 = require("./shared/modules/Enums");
var game_1 = require("./game");
var io = socketIo(3002);
var game = new game_1["default"]();
io.on('connection', function (socket) {
    // Let game class know to let socket join
    game.join(socket.id);
    // Send game data to socket
    socket.emit(Enums_1.Action.GameData, game.getGameData());
    socket.on(Enums_1.Action.Turn, function (turnType, raiseMoney) {
        // Apply turn
        game.turn(turnType, raiseMoney);
        // Send turn to all clients
        io.emit(Enums_1.Action.GameData, game.getGameData());
    });
    socket.on(Enums_1.Action.Disconnect, function () {
        game.onLeave(socket.id);
    });
});
