import { quit } from "./gameActions.js";
import { COLORS, SPAWNPOSITIONS, PIECES } from "./constants.js";
import { createCopy } from "./util.js";

const drawBoard = (gameState) => {
  const { context, board } = gameState;
  const pieceSize = 10;
  context?.clearRect(0, 0, context?.canvas.width, context?.canvas.height);
  board?.forEach((row, rowIndex) => {
    row?.forEach((space, spaceIndex) => {
      if (space !== null) {
        context.fillStyle = COLORS[space.piece];
        context.fillRect(
          spaceIndex * pieceSize,
          rowIndex * pieceSize,
          pieceSize,
          pieceSize,
        );
        context.strokeStyle = "black";
        context.strokeRect(
          spaceIndex * pieceSize + 0.5,
          rowIndex * pieceSize - 0.5,
          pieceSize,
          pieceSize,
        );
      }
    });
  });
};

const canAddPiece = (positions, gameState) => {
    const { board } = gameState;
    for (let subPiece in positions) {
      let position = positions[subPiece];
      if (board?.[position[0]]?.[position[1]] !== null) {
        return false;
      }
    }
    return true;
};

const addPiece = (gameState) => {
  const { board, bag } = gameState;
  let newBoard = createCopy(board);
  const newPiece = bag.shift();
  const positions = SPAWNPOSITIONS[newPiece];
  if (!canAddPiece(positions, gameState)) {
    quit(gameState);
    return;
  }
  for (let subPiece in positions) {
    const position = positions[subPiece];
    const piece = {
      ...PIECES[newPiece],
      subSection: subPiece,
    };
    newBoard[position[0]][position[1]] = piece;
  }
  gameState.board = newBoard;
};

const fillBag = (gameState) => {
  const pieceNames = ["I", "J", "L", "O", "S", "T", "Z"];
  let shuffledBag = pieceNames
    .map((piece) => ({ piece, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ piece }) => piece);
  gameState.bag = shuffledBag;
};

export { drawBoard, addPiece, fillBag };
