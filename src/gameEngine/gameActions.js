import { gameLoop } from "./gameState.js";
import { createCopy, calculateDelay } from "./util.js";
import { drawBoard } from "./gameBoard.js";
import { gameState } from "./gameState.js";

const existsCurrentPiece = () => {
  const { board } = gameState;
  return board.some((row) => row.some((space) => space?.isCurrent));
};

const pause = () => {
  const {
    state: { setPaused },
  } = gameState;
  gameState.paused = !gameState.paused;
  setPaused(gameState.paused);
  console.log(`Game is ${gameState.paused ? "paused" : "running"}`);
};

const lineHandler = () => {
  const {
    state: { setLevel, setLines },
    board,
  } = gameState;
  const newBoard = createCopy(board);
  board.forEach((row, rowIndex) => {
    if (!row.includes(null)) {
      gameState.lines++;
      setLines(gameState.lines);
      if (gameState.lines >= gameState.level * 10) {
        gameState.level++;
        setLevel(gameState.level);
        gameState.delay = calculateDelay(gameState.delay, gameState.level);
        clearInterval(gameState.intervalID);
        gameState.intervalID = setInterval(gameLoop, gameState.delay);
      }
      newBoard.splice(rowIndex, 1);
      newBoard.unshift(Array(row.length).fill(null));
    }
  });
  gameState.board = newBoard;
  drawBoard();
};

const quit = () => {
  const {
    intervalID,
    state: { setGameOver },
  } = gameState;
  gameState.gameOver = true;
  setGameOver(gameState.gameOver);
  clearInterval(intervalID);
  console.log("Game is over");
};

export { existsCurrentPiece, pause, lineHandler, quit };
