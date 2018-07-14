import {ICard} from './ICard';
import {IPlayerData} from './IPlayerData';

export interface IGame {
    turnPlayer:string,
    players: IPlayerData[],
    cards:ICard[]
}