import { gameLoop } from "./gameState.js";
import { createCopy, calculateDelay } from "./util.js";
import { drawBoard } from "./gameBoard.js";

const existsCurrentPiece = (gameState) => {
  const { board } = gameState;
  return board.some((row) => row.some((space) => space?.isCurrent));
};

const pause = (gameState) => {
  const {
    state: { setPaused },
  } = gameState;
  gameState.paused = !gameState.paused;
  setPaused(gameState.paused);
  console.log(`Game is ${gameState.paused ? "paused" : "running"}`);
};

const quit = (gameState) => {
  const {
    state: { setGameOver },
    intervalID,
  } = gameState;
  gameState.gameOver = true;
  setGameOver(gameState.gameOver);
  clearInterval(intervalID);
  console.log("Game is over");
};

const lineHandler = (gameState) => {
  const {
    board,
    state: { setLines, setLevel },
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
        gameState.intervalID = setInterval(
          () => gameLoop(gameState),
          gameState.delay,
        );
      }
      newBoard.splice(rowIndex, 1);
      newBoard.unshift(Array(row.length).fill(null));
    }
  });
  gameState.board = newBoard;
  drawBoard(gameState);
};

export { existsCurrentPiece, pause, lineHandler, quit };
