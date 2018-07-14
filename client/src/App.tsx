import * as React from 'react';
import './App.css';

// import {Rank,Suit} from '../src/shared/modules/Enums';
import {ICard} from './interfaces/ICard';
import {IState} from './interfaces/IState'
import * as io from 'socket.io-client';  
import { Action, MessageType, Turn } from './shared/modules/Enums';
import { IGame } from './interfaces/IGame';
import { IMessage } from './interfaces/IMessage';
import { IPlayerData } from './interfaces/IPlayerData';

class App extends React.Component<any,IState> {
  constructor(props: any){
    super(props);
    this.state = {
      game:{
        cards:[],
        turnPlayer:"",
        players:[]
      },
      local:{
        cards:[],
        money:0,
        name:''
      },
      socket: undefined,
      message: undefined
    };

    //#region testdata

    // this.state = {
    //   game:{
    //     cards:[
    //       {
    //         rank:Rank.Jack,suit:Suit.Spades
    //       },
    //       {
    //         rank:Rank.King,suit:Suit.Clubs
    //       },
    //       {
    //         rank:Rank.Queen,suit:Suit.Diamonds
    //       },
    //       {
    //         rank:Rank.Ace,suit:Suit.Hearts
    //       },
    //       {
    //         rank:Rank.Jack,suit:Suit.Diamonds
    //       }
    //     ],
    //     turnPlayer:"hai"
    //   },
    //   local:{
    //     cards:[
    //       {suit:Suit.Diamonds,rank:2},
    //       {suit:Suit.Diamonds,rank:2}
    //     ],
    //     money:1000,
    //     name:"HeyHo"
    //   },
    //   players:[
    //     {
    //       money:1000,
    //       name:"test"
    //     },
    //     {
    //       money:2000,
    //       name:"hai"
    //     }
    //   ]
    // };

    //#endregion 
    this.check = this.check.bind(this);
    this.fold = this.fold.bind(this);
    this.raise = this.raise.bind(this);
  }

  public componentDidMount(){
    const socket = io( window.location.host === 'play-poker.herokuapp.com' ? 'play-poker.herokuapp.com' : 'localhost:3001');
    this.setState({socket});

    socket.on(Action.ClientConnect,(name:string)=>{
      this.setState({local:{...this.state.local,name}})
    })

    socket.on(Action.GameData,(game:IGame)=>{
      // console.log(game.players)
      // sort so local is top
      let players = [];
      players = game.players.filter((player:IPlayerData)=>player.id !== this.state.socket!.id );

      game.players = players;
      // console.log('clientside:')
      // console.log(game.players)
      this.setState({game});
      // this.setState
    });

    socket.on(Action.EndRound,(winner:string)=>{
      this.setState({message:{text:`The winner is ${winner}`,type:MessageType.Succes}});
    })

    socket.on(Action.Message,(message: IMessage)=>{
      this.setState({message});
      setInterval(()=>{
        this.setState({message:undefined});
      },3000)
    })

    socket.on(Action.PrivateCards,(cards:ICard[])=>{
      console.log(cards);
      const local = this.state.local;
      local.cards = cards
      this.setState({local});
    })
  }

  public render() {
    return (
      <div className="App">
        <div className="Game">
          <div className="GlobalCards">
          {
            this.state.game.cards.map((card: ICard,index:number)=>{
              return (
                <div className="Card" key={index} style={{backgroundImage:`url(https://github.com/hayeah/playing-cards-assets/blob/master/png/${ `${card.rank}_of_${card.suit}.png` }?raw=true)`}}/>
              )
            })
          }
          </div>

          {
            this.state.message ?
            <div className={"alert alert-"+ this.state.message.type}>
              <a href="#" className="alert-link">{this.state.message.text}</a>.
            </div>
            :
            null
          }
          
          <div className="MyCards">
          {
            this.state.local.cards.map((card: ICard,index:number)=>{
              return (
                <div className="Card" key={index} style={{backgroundImage:`url(https://github.com/hayeah/playing-cards-assets/blob/master/png/${ `${card.rank}_of_${card.suit}.png` }?raw=true)`}}/>
              )
            })
          }
          </div>
            
            <div className="Options" style={this.state.game.turnPlayer === this.state.local.name ? {opacity:1} : {opacity:0} }>
              <button className="btn btn-primary" onClick={this.check}>Check</button>
              
              <div className="btn-group">
              <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Raise
              </button>
              <div className="dropdown-menu">
              {
                [10,20,50,100,200,500,1000,2000,5000].reverse().map((n:number)=>{
                  return (
                    this.state.local.money >= n ?
                    // tslint:disable-next-line:jsx-no-lambda
                    <a className="dropdown-item" key={n} href="#" onClick={(e)=>{ this.raise(e,n) }}>{n}</a>
                    :
                    null
                  )
                })
              }
                
              </div>
            </div>

              <button className="btn btn-secondary" onClick={this.fold}>Fold</button>
            </div>
          <div className='Players'>

            <div className="Player" style={ this.state.local.name === this.state.game.turnPlayer ? {backgroundColor:"#007bff",color:"white"} : {} }>
              <h2>{this.state.local.name}</h2>
              <p>{this.state.local.money}</p>
            </div>

            {
              this.state.game.players.map((player : IPlayerData,index:number)=>{
                return (
                  <div className="Player" key={index} style={ player.name === this.state.game.turnPlayer ? {backgroundColor:"#007bff",color:"white"} : {} }>
                    <h2>{player.name}</h2>
                    <p>{player.money}</p>
                  </div>
                )
              })
            }
          </div>
          
        </div>
      </div>
    );
  }

  public check(){
    this.state.socket!.emit(Action.Turn,Turn.Check);
  }

  public fold(){
    //
  }

  public raise(e:any,n:number){
    e.preventDefault();

  }
}

export default App;
