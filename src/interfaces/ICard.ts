import {Rank,Suit} from '../../shared/modules/Enums'

export interface ICard {
    suit: Suit,
    rank: Rank | number
}