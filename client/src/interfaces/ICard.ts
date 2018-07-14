import {Rank,Suit} from '../../src/shared/modules/Enums'

export interface ICard {
    suit: Suit,
    rank: Rank | number
}