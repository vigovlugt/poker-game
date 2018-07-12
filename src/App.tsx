import * as React from 'react';
import './App.css';

class App extends React.Component<any,IState> {
  constructor(props: any){
    super(props);
    this.state = {
      game:{
        cards:[],
        localPlayerTurn:false,
        turn:0
      },
      local:{
        cards:[],
        money:1000
      },
      players:[]
    };


    this.state = {
      game:{
        cards:[
          {type:"10_of_hearts",image:"https://github.com/hayeah/playing-cards-assets/blob/master/png/10_of_hearts.png?raw=true"},
          {type:"10_of_hearts",image:"https://github.com/hayeah/playing-cards-assets/blob/master/png/10_of_hearts.png?raw=true"},
          {type:"10_of_hearts",image:"https://github.com/hayeah/playing-cards-assets/blob/master/png/10_of_hearts.png?raw=true"},
          {type:"10_of_hearts",image:"https://github.com/hayeah/playing-cards-assets/blob/master/png/10_of_hearts.png?raw=true"},          
          {type:"10_of_hearts",image:"https://github.com/hayeah/playing-cards-assets/blob/master/png/10_of_hearts.png?raw=true"}
        ],
        localPlayerTurn:false,
        turn:0
      },
      local:{
        cards:[
          {type:"10_of_hearts",image:"https://github.com/hayeah/playing-cards-assets/blob/master/png/10_of_hearts.png?raw=true"},
          {type:"10_of_hearts",image:"https://github.com/hayeah/playing-cards-assets/blob/master/png/10_of_hearts.png?raw=true"}
        ],
        money:1000
      },
      players:[]
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
                <div className="Card" key={index} style={{backgroundImage:`url(${card.image})`}}/>
              )
            })
          }
          </div>
          <div className="MyCards">
          {
            this.state.local.cards.map((card: ICard,index:number)=>{
              return (
                <div className="Card" key={index} style={{backgroundImage:`url(${card.image})`}}/>
              )
            })
          }
          </div>
          {
            !this.state.game.localPlayerTurn ?
            <div className="Options">
              <button className="btn btn-primary">Check</button>
              <button className="btn btn-warning">Raise</button>
              <button className="btn btn-secondary">Fold</button>
            </div>
            :
            null
          }
          
          {
            this.state.players.map((data : IPlayerData,index:number)=>{
              return (
                <div className="Card" key={index}>data.numCards</div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
