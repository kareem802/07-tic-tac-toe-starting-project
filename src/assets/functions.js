import GameBoard from "../components/GameBoard";
import { WINNING_COMBINATIONS } from "./combs";
export function deriveWinner(gameBoard, playerNames) {
  for (const comb of WINNING_COMBINATIONS) {
    let firstSquarsymbol = gameBoard[comb[0].row][comb[0].column];
    let secondSquarsymbol = gameBoard[comb[1].row][comb[1].column];
    let thirdSquarsymbol = gameBoard[comb[2].row][comb[2].column];
    if (
      firstSquarsymbol &&
      firstSquarsymbol === secondSquarsymbol &&
      secondSquarsymbol === thirdSquarsymbol
    ) {
      return playerNames[firstSquarsymbol];
    }
  }
}

export function setBoard(gameTurns) {
  const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

export function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

