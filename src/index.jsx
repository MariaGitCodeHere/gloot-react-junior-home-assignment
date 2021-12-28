import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import { getGames, deleteGame, addGame } from './game-service';

class App extends React.Component {
  state = {
    games: [],
    newName: ''
  };

  componentDidMount = async () => {
    this.getGames();
  };

  getGames = async () => {
    const games = await getGames();
    this.setState({ games });
  }

  addGame = async () => {
    await addGame(this.state.newName);
    this.getGames();
    this.setState({ newName: '' });
  };

  deleteGame = async id => {
    await deleteGame(id);
    this.getGames();
  };

  render() {
    const { games } = this.state;
    
    return (
      <div>
        <h1>Game Library</h1>
        <hr />
        {games &&
          games.map(game => (
            <div key={game.id}>
              <label>{game.name}</label>
              <div>
                <button>EDIT</button>
                <button onClick={() => this.deleteGame(game.id)}>DELETE</button>
              </div>
            </div>
          ))}
          <input 
              placeholder="new game" 
              onChange={(event)=>this.setState({newName: event.target.value})} 
              value={this.state.newName}
              className="validation" />
          <button onClick={()=>this.addGame()}>ADD</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app-container'));
