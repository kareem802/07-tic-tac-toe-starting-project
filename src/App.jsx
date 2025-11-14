import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import { deriveWinner, setBoard, deriveActivePlayer } from "./assets/functions";
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(PLAYERS);

  const gameBoard = setBoard(gameTurns);
  const winner = deriveWinner(gameBoard, playerNames);
  const aDraw = gameTurns.length === 9;
  const activePayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }
      const currGameTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return currGameTurn;
    });
  }

  function handleNameChange(symbol, name) {
    setPlayerNames((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: name,
    }));
  }

  function handleRestart() {
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePayer === "X"}
            onChangeName={handleNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePayer === "O"}
            onChangeName={handleNameChange}
          />
        </ol>
        {(aDraw || winner) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
