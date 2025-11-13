import { useState } from "react";
import { WINNING_COMBINATIONS } from "./assets/combs";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { Log } from "./components/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  let winner = null;

  let gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for (const comb of WINNING_COMBINATIONS) {
    let firstSquarsymbol = gameBoard[comb[0].row][comb[0].column];
    let secondSquarsymbol = gameBoard[comb[1].row][comb[1].column];
    let thirdSquarsymbol = gameBoard[comb[2].row][comb[2].column];
    if (
      firstSquarsymbol &&
      firstSquarsymbol === secondSquarsymbol &&
      secondSquarsymbol === thirdSquarsymbol
    ) {
      winner = firstSquarsymbol;
      console.log(winner);
    }
  }

  function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
      currentPlayer = "O";
    }
    return currentPlayer;
  }

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
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePayer === "O"}
          />
        </ol>
        {winner && <p>{`You won ${winner}`}</p>}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      LOG
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
