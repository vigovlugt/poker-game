import {IGame} from './IGame'
import {ILocalPlayerData} from './ILocalPlayerData'
import { IMessage } from './IMessage';

export interface IState{
    game: IGame,
    local: ILocalPlayerData,
    socket: SocketIOClient.Socket | undefined,
    message: IMessage | undefined
}