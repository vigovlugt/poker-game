import { Rank, Suit, Turn } from "../shared/modules/Enums";
import { ICard } from "../src/interfaces/ICard";
import { IGame } from "../src/interfaces/IGame";

export default class Game{
    public deck: ICard[];
    public publicCards: ICard[];

    public players: string[];

    public turnPlayer: string;
    public turnPlayerIndex: number;

    public startRound(){
        
    }

    public turn(turnType: Turn, raiseMoney:number | undefined){
        switch (turnType) {
            case Turn.Check:
                
                break;
            
            case Turn.Raise:
                
                break;

            case Turn.Fold:
                
                break;
            default:
                break;
        }

        if(this.turnPlayerIndex + 1 >= this.players.length){
            this.turnPlayerIndex = 0;
        }
        else{
            this.turnPlayerIndex++;
        }

        this.turnPlayer = this.players[this.turnPlayerIndex];
    }

    public join(player:string):void{
        this.players.push(player);

    }

    public onLeave(player:string):void{
        // Handle Leave

    }

    public getGameData():IGame{
        return {
            turnPlayer: this.turnPlayer,
            cards: this.publicCards
        }
    }

    public refreshDeck():void{
        this.deck = [];
        [2,3,4,5,6,7,8,9,10,Rank.Jack,Rank.Queen,Rank.King,Rank.Ace].forEach((rank: Rank) : void=>{
            [Suit.Clubs,Suit.Diamonds,Suit.Hearts,Suit.Spades].forEach((suit:Suit):void =>{
                this.deck.push({suit,rank});
            })
        })
    }


}