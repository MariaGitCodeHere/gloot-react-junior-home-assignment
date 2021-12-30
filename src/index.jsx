import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import { getGames, deleteGame, addGame, getGame, editGame } from './game-service';

class App extends React.Component {
  state = {
    games: [],
    newNameAdd: '',
    newNameEdit: ''
  };

  setRef = (ref) => {
    this.ref = ref;
  };

  componentDidMount = async () => {
    this.getGames();
  };

  getGames = async () => {
    const games = await getGames();
    this.setState({ games });
  };

  addGame = async () => {
    await addGame(this.state.newNameAdd);
    this.getGames();
    this.setState({ newNameAdd: '' });
  };

  getGame = async id => {
    const editGame = await getGame(id);
    this.getGames();
    this.buildEditForm(editGame);
  };

  buildEditForm(editGame) {
    let editGameId = editGame.id;
    let editGameName = editGame.name;

    let elementDiv = document.createElement('div');
    let elementInput = document.createElement('input');
    let elementButton = document.createElement('button');
    elementDiv.appendChild(elementInput);
    elementDiv.appendChild(elementButton);

    elementDiv.setAttribute('key', editGameId);
    elementDiv.classList.add("gameedit-container");
    elementInput.setAttribute('value', editGameName);
    elementInput.classList.add("validation");
    elementInput.classList.add("validation-editinput");
    elementButton.textContent = 'UPDATE';

    elementInput.onchange = () => 
  	{(event)=>this.setState({newNameEdit: event.target.value})};
    elementButton.onclick = () => 
  	{()=>this.editGame({id: editGame.id, name: this.state.newNameEdit})};

    this.ref.appendChild(elementDiv);
    console.log(this.ref);
  }

  editGame = async (id, name) => {
    await editGame(id, name);
    this.getGames();
    // удалить buildEditForm
  }

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
            <div key={game.id} className="game-container">
              <label>{game.name}</label>
              <div ref={this.setRef}></div>
              <div className="buttons-container">
                <button onClick={() => this.getGame(game.id)}>EDIT</button>
                <button onClick={() => this.deleteGame(game.id)}>DELETE</button>
              </div>
            </div>
          ))}
          <input 
              placeholder="new game" 
              onChange={(event)=>this.setState({newNameAdd: event.target.value})} 
              value={this.state.newNameAdd}
              className="validation" />
          <button onClick={()=>this.addGame()}>ADD</button>
      </div>
    );
  };
}

ReactDOM.render(<App />, document.getElementById('app-container'));

/*
запуливать в нужную секцию
расположить импут поверх названия игры

закончить edit функцию
запретить двойное нажатие на edit
автофокус
submit от enter
*/