import { lineHandler, existsCurrentPiece } from './gameActions.js';
import { addPiece, fillBag } from './gameBoard.js';
import { listen } from './gameControls.js';
import { move } from './gameMovements.js';
import { calculateDelay, createBlankBoard } from './util.js';

let gameEngineState = {
    board: createBlankBoard(),
    bag: [],
    level: 1,
    lines: 0,
    delay: calculateDelay(1000, 1),
    paused: false,
    gameOver: false,
    context: null,
    currentPiece: '',
    state: {},
    intervalID: 0
}

const start = (contextStore, stateFuncs) => {
  if (gameEngineState.intervalID === 0) {
    gameEngineState.context = contextStore;
    gameEngineState.state = stateFuncs;
    gameEngineState.level = gameEngineState.state.level;
    gameEngineState.delay = calculateDelay(1000, gameEngineState.level);
    gameEngineState.paused = gameEngineState.state.paused;
    gameEngineState.gameOver = gameEngineState.state.gameOver;
    console.log('game has started');
    gameEngineState.intervalID = setInterval(gameLoop, gameEngineState.delay);
    listen();
  }
};

const gameLoop = () => {
    let { state: { setNextPiece }, paused } = gameEngineState;
  if(!paused) {
    lineHandler();
    if(!existsCurrentPiece()) {
        addPiece();
    }
    gameEngineState.bag.length === 0 && fillBag();
    setNextPiece(gameEngineState.bag[0]);
    move('down');
  }
};

export {
    gameEngineState,
    start,
    gameLoop
}
