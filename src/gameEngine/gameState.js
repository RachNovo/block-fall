import { lineHandler, existsCurrentPiece } from "./gameActions.js";
import { addPiece, fillBag } from "./gameBoard.js";
import { listen } from "./gameControls.js";
import { move } from "./gameMovements.js";
import { calculateDelay, createBlankBoard } from "./util.js";

let gameState = {
  board: createBlankBoard(),
  bag: [],
  level: 1,
  lines: 0,
  delay: calculateDelay(1000, 1),
  paused: false,
  gameOver: false,
  context: null,
  currentPiece: "",
  state: {},
  intervalID: 0,
};

const start = (contextStore, stateFuncs, gameState) => {
  if (gameState.intervalID === 0) {
    gameState.context = contextStore;
    gameState.state = stateFuncs;
    gameState.level = gameState.state.level;
    gameState.delay = calculateDelay(1000, gameState.level);
    gameState.paused = gameState.state.paused;
    gameState.gameOver = gameState.state.gameOver;
    console.log("Game has started");
    gameState.intervalID = setInterval(
      () => gameLoop(gameState),
      gameState.delay,
    );
    listen(gameState);
  }
};

const gameLoop = (gameState) => {
  const {
    paused,
    bag,
    state: { setNextPiece },
  } = gameState;
  if (!paused) {
    lineHandler(gameState);
    if (!existsCurrentPiece(gameState)) {
      addPiece(gameState);
    }
    bag.length === 0 && fillBag(gameState);
    const nextPiece = gameState.bag[0];
    setNextPiece(nextPiece);
    move("down", gameState);
  }
};

export { gameState, start, gameLoop };
