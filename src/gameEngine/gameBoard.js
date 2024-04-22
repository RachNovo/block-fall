import { quit } from './gameActions.js';
import { COLORS, SPAWNPOSITIONS, PIECES } from './constants.js';
import { createCopy } from './util.js';
import { gameEngineState } from './gameState.js';

const drawBoard = () => {
    let { context, board } = gameEngineState;
    const pieceSize = 10;
    context?.clearRect(0, 0, context?.canvas.width, context?.canvas.height);
    board?.forEach((row, rowIndex) => {
        row?.forEach((space, spaceIndex) => {
        if (space !== null) {
            context.fillStyle = COLORS[space.piece];
            context.fillRect(spaceIndex * pieceSize, rowIndex * pieceSize, pieceSize, pieceSize);
            context.strokeStyle = "black";
            context.strokeRect(spaceIndex * pieceSize + .5, rowIndex * pieceSize - .5, pieceSize, pieceSize);
        };
        })
    });
};

const addPiece = () => {
    let { board } = gameEngineState;
    let newBoard = createCopy(board);
    const newPiece = gameEngineState.bag.shift();
    const positions = SPAWNPOSITIONS[newPiece];
    if(!canAddPiece(positions)) {
        quit();
        return;
    }
    for(let subPiece in positions) {
        const piece = {
            ...PIECES[newPiece],
            subSection: subPiece
        }
        newBoard[positions[subPiece][0]][positions[subPiece][1]] = piece;
    }
    gameEngineState.board = newBoard;
};

const canAddPiece = (positions) => {
    let { board } = gameEngineState;
    if(board.length === 0) return true;
    let canAddPiece = true;
    for(let subPiece in positions) {
        if(board?.[positions[subPiece][0]]?.[positions[subPiece][1]] !== null) {
        canAddPiece = false;
        }
    }
    return canAddPiece;
};

const fillBag = () => {
    const pieceNames = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    let bag = pieceNames
        .map(el => ({ el, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ el }) => el);
    gameEngineState.bag = bag;
};

export {
    drawBoard,
    addPiece,
    fillBag
}