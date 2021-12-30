/**
 * This file handles all the communication with the server.
 * The different endpoints are described in server.js.
 */
const apiUrl = 'http://localhost:3000';

export async function getGames() {
  const resp = await fetch(`${apiUrl}/game`);
  return await resp.json();
}

export async function addGame(gameName) {
  console.log(gameName);
  const resp = await fetch(`${apiUrl}/game`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: gameName}) 
  });
  return await resp.json();
}

export async function getGame(gameId) {
  console.log(gameId);
  const resp = await fetch(`${apiUrl}/game/${gameId}` );
  return await resp.json();
}

export async function editGame(gameId, gameName) {
  const resp = await fetch(`${apiUrl}/game`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: gameId, name: gameName})
  });
  return await resp.json();
}

export async function deleteGame(gameId) {
  const resp = await fetch(`${apiUrl}/game/${gameId}`, { method: 'DELETE' });
  return await resp.json();
}