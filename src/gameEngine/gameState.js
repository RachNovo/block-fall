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

const start = (contextStore, stateFuncs) => {
  if (gameState.intervalID === 0) {
    gameState.context = contextStore;
    gameState.state = stateFuncs;
    gameState.level = gameState.state.level;
    gameState.delay = calculateDelay(1000, gameState.level);
    gameState.paused = gameState.state.paused;
    gameState.gameOver = gameState.state.gameOver;
    console.log("Game has started");
    gameState.intervalID = setInterval(gameLoop, gameState.delay);
    listen();
  }
};

const gameLoop = () => {
  const {
    state: { setNextPiece },
    paused,
  } = gameState;
  if (!paused) {
    lineHandler();
    if (!existsCurrentPiece()) {
      addPiece();
    }
    gameState.bag.length === 0 && fillBag();
    setNextPiece(gameState.bag[0]);
    move("down");
  }
};

export { gameState, start, gameLoop };
