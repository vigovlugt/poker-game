import { ICard } from "./ICard";

export interface IRoundEndData{
    winners:string[],
    cardsByPlayer: {[playerId:string]:ICard[]}
}