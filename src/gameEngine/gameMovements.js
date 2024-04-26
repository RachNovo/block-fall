import { createBlankBoard } from "./util.js";
import { drawBoard } from "./gameBoard.js";
import { ROTATIONFORMULA } from "./constants.js";

const canMove = (direction, gameState) => {
  const { board } = gameState;
  if (!board) return false;
  let canMove = true;
  board.forEach((row, rowIndex) => {
    row.forEach((space, spaceIndex) => {
      if (space?.isCurrent) {
        let targetSpace;
        if (direction === "left") targetSpace = row[spaceIndex - 1];
        if (direction === "right") targetSpace = row[spaceIndex + 1];
        if (direction === "down")
          targetSpace = board[rowIndex + 1] && board[rowIndex + 1][spaceIndex];
        if (!(targetSpace?.isCurrent || targetSpace === null)) {
          canMove = false;
        }
      }
    });
    if (!canMove) return;
  });
  return canMove;
};

const move = (direction, gameState) => {
  const { paused, gameOver, board } = gameState;
  if (paused || gameOver) return;
  if (!canMove(direction, gameState)) {
    if (direction === "down") {
      board?.forEach((row) => {
        row?.forEach((space) => {
          if (space?.isCurrent) {
            space.isCurrent = false;
          }
        });
      });
    } else {
      return;
    }
  }
  const newBoard = createBlankBoard();
  board?.forEach((row, rowIndex) => {
    row?.forEach((space, spaceIndex) => {
      if (space?.isCurrent) {
        if (direction === "down")
          newBoard[rowIndex + 1].splice(spaceIndex, 1, space);
        if (direction === "left")
          newBoard[rowIndex].splice(spaceIndex - 1, 1, space);
        if (direction === "right")
          newBoard[rowIndex].splice(spaceIndex + 1, 1, space);
      } else if (space !== null) {
        newBoard[rowIndex].splice(spaceIndex, 1, space);
      }
    });
  });
  gameState.board = newBoard;
  drawBoard(gameState);
};

const hardMoveDown = (gameState) => {
  for (let i = 0; i < 20; i++) {
    move("down", gameState);
  }
};

const canRotate = (gameState) => {
  const { board } = gameState;
  let canRotate = true;
  board?.forEach((row, rowIndex) => {
    row?.forEach((space, spaceIndex) => {
      if (space?.isCurrent) {
        const nextOrientation =
          space.orientation < 3 ? space.orientation + 1 : 0;
        const positionFormula =
          ROTATIONFORMULA[space.piece][space.subSection][nextOrientation];
        const targetSpace =
          board?.[rowIndex + positionFormula[0]]?.[
            spaceIndex + positionFormula[1]
          ];
        if (!(targetSpace?.isCurrent || targetSpace === null)) {
          canRotate = false;
        }
      }
    });
  });
  return canRotate;
};

const rotate = (gameState) => {
  const { paused, gameOver, board } = gameState;
  if (paused || gameOver || !canRotate(gameState)) return;
  let newBoard = createBlankBoard();
  board?.forEach((row, rowIndex) => {
    row?.forEach((space, spaceIndex) => {
      if (space?.isCurrent) {
        const nextOrientation =
          space.orientation < 3 ? space.orientation + 1 : 0;
        const positionFormula =
          ROTATIONFORMULA[space.piece][space.subSection][nextOrientation];
        const targetRow = newBoard[rowIndex + positionFormula[0]];
        const targetIndex = spaceIndex + positionFormula[1];
        targetRow[targetIndex] = { ...space, orientation: nextOrientation };
      } else if (space !== null) {
        newBoard[rowIndex][spaceIndex] = space;
      }
    });
  });
  gameState.board = newBoard;
  drawBoard(gameState);
};

export { move, canMove, hardMoveDown, rotate, canRotate };
