import { gameLoop } from './gameState.js';
import { createCopy, calculateDelay } from './util.js';
import { drawBoard } from './gameBoard.js';
import { gameEngineState } from './gameState.js';

const existsCurrentPiece = () => {
    let { board } = gameEngineState;
    let existsCurrentPiece = false;
    board.forEach((row) => {
        row.forEach((space) => {
        if (space?.isCurrent) {
            existsCurrentPiece = true;
        };
        })
    });
    return existsCurrentPiece;
};

const pause = () => {
    let { state: { setPaused } } = gameEngineState;
    gameEngineState.paused = !gameEngineState.paused;
    setPaused(gameEngineState.paused);
    console.log(`game is paused: ${gameEngineState.paused}`);
};

const lineHandler = () => {
    let { state: {setLevel, setLines}, board } = gameEngineState;
    const newBoard = createCopy(board);
    board?.forEach((row, rowIndex) => {
        if(!row.includes(null)) {
            gameEngineState.lines++
            setLines(gameEngineState.lines);
            if (gameEngineState.lines >= gameEngineState.level * 10) {
                gameEngineState.level++;
                setLevel(gameEngineState.level);
                gameEngineState.delay = calculateDelay(gameEngineState.delay, gameEngineState.level);
                clearInterval(gameEngineState.intervalID);
                gameEngineState.intervalID = setInterval(gameLoop, gameEngineState.delay);
            }
            newBoard.splice(rowIndex, 1);
            newBoard.unshift([null, null, null, null, null, null, null, null, null, null]);
        }
    })
    gameEngineState.board = newBoard;
    drawBoard();
};

const quit = () => {
    let { gameOver, intervalID, state: { setGameOver } } = gameEngineState;
    gameEngineState.gameOver = true;
    setGameOver(gameOver);
    clearInterval(intervalID);
    console.log('game is over/quit');
};

export {
    existsCurrentPiece,
    pause,
    lineHandler,
    quit
};
