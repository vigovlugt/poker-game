import * as socketIo from 'socket.io';

import { Action, Turn } from '../client/src/shared/modules/Enums';
import Game from './game';

const io = socketIo(3002);

const game = new Game(io);

io.on('connection',(socket)=>{
    // Let game class know to let socket join
    game.onJoin(socket.id);

    // Send game data to socket
    socket.emit(Action.GameData,game.getGameData());
    
    socket.on(Action.Turn,(turnType: Turn, raiseMoney: number | undefined) => {
        // Apply turn
        game.turn(turnType,raiseMoney);
        // Send turn to all clients
        io.emit(Action.GameData,game.getGameData());
    })

    socket.on(Action.Disconnect,()=>{
        game.onLeave(socket.id);
    })
});