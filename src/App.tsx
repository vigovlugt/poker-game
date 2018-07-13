import * as React from 'react';
import './App.css';

import {Rank,Suit} from '../shared/modules/Enums';
import {ICard} from './interfaces/ICard';
import {IState} from './interfaces/IState'

class App extends React.Component<any,IState> {
  constructor(props: any){
    super(props);
    this.state = {
      game:{
        cards:[],
        turnPlayer:""
      },
      local:{
        cards:[],
        money:0,
        name:''
      },
      players:[]
    };


    this.state = {
      game:{
        cards:[
          {
            rank:Rank.Jack,suit:Suit.Spades
          },
          {
            rank:Rank.King,suit:Suit.Clubs
          },
          {
            rank:Rank.Queen,suit:Suit.Diamonds
          },
          {
            rank:Rank.Ace,suit:Suit.Hearts
          },
          {
            rank:Rank.Jack,suit:Suit.Diamonds
          }
        ],
        turnPlayer:"hai"
      },
      local:{
        cards:[
          {suit:Suit.Diamonds,rank:2},
          {suit:Suit.Diamonds,rank:2}
        ],
        money:1000,
        name:"HeyHo"
      },
      players:[
        {
          money:1000,
          name:"test"
        },
        {
          money:2000,
          name:"hai"
        }
      ]
    };
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
              <button className="btn btn-primary">Check</button>
              
              <div className="btn-group">
              <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Raise
              </button>
              <div className="dropdown-menu">
              {
                [10,20,50,100,200,500,1000,2000,5000].reverse().map((n:number)=>{
                  return (
                    this.state.local.money >= n ?
                    <a className="dropdown-item" key={n} href="#">{n}</a>
                    :
                    null
                  )
                })
              }
                
              </div>
            </div>

              <button className="btn btn-secondary">Fold</button>
            </div>
          <div className='Players'>

            <div className="Player" style={ this.state.local.name === this.state.game.turnPlayer ? {backgroundColor:"#007bff",color:"white"} : {} }>
              <h2>{this.state.local.name}</h2>
              <p>{this.state.local.money}</p>
            </div>

            {
              this.state.players.map((player : IPlayerData,index:number)=>{
                // tslint:disable-next-line:no-console   
                console.log(player.name === this.state.game.turnPlayer)
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
}

export default App;
