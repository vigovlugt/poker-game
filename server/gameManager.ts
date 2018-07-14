import * as socketIo from 'socket.io';

import { Action, Turn } from '../client/src/shared/modules/Enums';
import Game from './game';
import * as http from 'http';

export function setup(server:http.Server){

    const io = socketIo(server);

    const game = new Game(io);

    io.on('connection',(socket:socketIo.Socket)=>{
        // Let game class know to let socket join
        game.onJoin(socket.id);
        socket.emit(Action.ClientConnect,socket.id);

        // Send game data to socket
        socket.emit(Action.GameData,game.getGameData());
        
        socket.on(Action.Turn,(turnType: Turn, raiseMoney: number | undefined) => {
            // Apply turn
            if(game.turnPlayer === socket.id){
                game.turn(turnType,raiseMoney);
                // Send turn to all clients
                io.emit(Action.GameData,game.getGameData());
            }
            
        })

        socket.on(Action.Disconnect,()=>{
            game.onLeave(socket.id);
        })
    });

}
