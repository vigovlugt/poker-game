import {IGame} from './IGame'
import {ILocalPlayerData} from './ILocalPlayerData'

export interface IState{
    game: IGame,
    local: ILocalPlayerData,
    players: IPlayerData[]
}