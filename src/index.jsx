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
    this.runGetGames();
  };

  runGetGames = async () => {
    const games = await getGames();
    this.setState({ games });
  };

  runAddGame = async () => {
    await addGame(this.state.newNameAdd);
    this.runGetGames();
    this.setState({ newNameAdd: '' });
  };

  runGetGame = async id => {
    const editGame = await getGame(id);
    this.runGetGames();
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

    elementInput.onchange = () => {
      (event) => {
        this.setState({newNameEdit: event.target.value})
        console.log(event.target.value);
      }
    };
    elementButton.onclick = () => 
  	{()=>this.editGame({id: editGame.id, name: this.state.newNameEdit})
  // console.log({id: editGame.id, name: this.state.newNameEdit})
};

    this.ref.appendChild(elementDiv);
    console.log(this.ref);
  }

  runEditGame = async (id, name) => {
    await editGame(id, name);
    this.runGetGames();
    // удалить buildEditForm
  }

  runDeleteGame = async id => {
    await deleteGame(id);
    this.runGetGames();
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
                <button onClick={() => this.runGetGame(game.id)}>EDIT</button>
                <button onClick={() => this.runDeleteGame(game.id)}>DELETE</button>
              </div>
            </div>
          ))}
          <input 
              placeholder="new game" 
              onChange={(event)=>this.setState({newNameAdd: event.target.value})} 
              value={this.state.newNameAdd}
              className="validation" />
          <button onClick={()=>this.renAddGame()}>ADD</button>
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