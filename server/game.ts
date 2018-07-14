import { ICard } from "../client/src/interfaces/ICard";
import { Rank, Suit, Turn, Action, MessageType } from "../client/src/shared/modules/Enums";
import { IGame } from "../client/src/interfaces/IGame";
import { IPlayerData } from "../client/src/interfaces/IPlayerData";

export default class Game{
    public deck: ICard[] = [];
    public publicCards: ICard[] = [];

    public players: string[] = [];

    public turnPlayer: string;
    public turnPlayerIndex: number;

    public io: SocketIO.Server;

    constructor(io: SocketIO.Server){
        this.io = io;
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

        if(this.turnPlayerIndex + 1 >= this.players.length){ // All players did their turn;
            this.turnPlayerIndex = 0;
            this.turnPlayer = this.players[this.turnPlayerIndex];

            if(this.publicCards.length === 5){
                this.endRound()
            }else{
                this.pickPublicCard();
                this.updateGameData();
            }
        }
        else{
            this.turnPlayerIndex++;
            this.turnPlayer = this.players[this.turnPlayerIndex];
            this.updateGameData();
        }
    }

    public startRound():void{
        this.turnPlayerIndex = 0;
        this.turnPlayer = this.players[0];
        this.publicCards = [];
        this.refreshDeck();
        this.updateGameData();

        this.players.forEach((player:string)=>{
            console.log(player)
            this.io.sockets.sockets[player].emit(Action.PrivateCards,[this.getCardFromDeck(),this.getCardFromDeck()])
        });

    }

    public endRound():void{
        // Tell client round is done and who the winner(s) are
        
        this.io.emit(Action.EndRound,this.getWinners())
        this.updateGameData();
        this.startRound();
    }

    public getWinners():string[]{
        return this.players;
    }

    public pickPublicCard():void{
        this.publicCards.push(
            //Remove card from deck and add to public cards
            this.getCardFromDeck()
        );
    }

    public getCardFromDeck():ICard{
        return this.deck.splice( Math.floor(Math.random() * this.deck.length), 1 )[0]
    }

    public onJoin(player:string):void{
        this.players.push(player);

        console.log(`${player} joined the game with ${this.players.length} player(s)`);

        if(this.players.length === 2){
            this.startRound();
        }
        else{
            this.io.emit(Action.Message,{text:`${ 2 - this.players.length} player(s) needed to start`,type:MessageType.Info})
            this.updateGameData();
        }
    }

    public onLeave(leavePlayer:string):void{
        // Handle Leave

        // console.log("begin:", this.players);

        if(this.turnPlayer === leavePlayer){ // Player had the turn 

            this.players.splice( this.players.indexOf(leavePlayer), 1)

            if(this.turnPlayerIndex === this.players.length){ // check if turnplayerindex outside array
                this.turnPlayerIndex = 0;
                this.turnPlayer = this.players[0];
            }else{
                // the next turnplayer is automatically the next player in players
                this.turnPlayer = this.players[this.turnPlayerIndex];
            }
        }else{ // Leaveplayer did not have the turn
            // console.log(this.players.indexOf(leavePlayer))
            this.players.splice( this.players.indexOf(leavePlayer), 1)
            
            // Leaveplayer could have affected the index so just update it with te name
            this.turnPlayerIndex = this.players.indexOf(this.turnPlayer);
        }

        console.log(`${leavePlayer} left the game with ${this.players.length} player(s)`);

        if(this.players.length < 2){
            this.endRound();
        }else{
            this.updateGameData();
        }

        // console.log("end:", this.players);
    }

    public updateGameData():void{
        this.io.emit(Action.GameData,this.getGameData());
    }

    public getGameData():IGame{
        return {
            turnPlayer: this.turnPlayer,
            cards: this.publicCards,
            players:this.players.map((playerId:string):IPlayerData=>{return {id:playerId,name:playerId,money:0} })
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