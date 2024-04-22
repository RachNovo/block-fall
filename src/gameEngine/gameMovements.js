import { createBlankBoard } from './util.js';
import { drawBoard } from './gameBoard.js';
import { ROTATIONFORMULA } from './constants.js';
import { gameEngineState } from './gameState.js';

const canMove = (direction) => {
    let { board } = gameEngineState;
    let canMove = true;
    board?.forEach((row, rowIndex) => {
        row?.forEach((space, spaceIndex) => {
        if (space?.isCurrent) {
            let targetSpace;
            if (direction === 'left') targetSpace = row[spaceIndex - 1];
            if (direction === 'right') targetSpace = row[spaceIndex + 1];
            if (direction === 'down') targetSpace = board[rowIndex + 1] && board[rowIndex + 1][spaceIndex];
            if (!(targetSpace?.isCurrent || targetSpace === null)) {
            canMove = false;
            }
        }
        })
    })
    return canMove;
};

const move = (direction) => {
    let { paused, gameOver, board } = gameEngineState;
    if (!paused && !gameOver) {
        if (!canMove(direction)) {
        if(direction === 'down') {
            board?.forEach((row) => {
            row?.forEach((space) => {
                if (space?.isCurrent) {
                space.isCurrent = false;
                };
            });
            });
        } else {
            return;
        };
        }
        const newBoard = createBlankBoard();
        board?.forEach((row, rowIndex) => {
        row?.forEach((space, spaceIndex) => {
            if (space?.isCurrent) {
            if (direction === 'down') newBoard[rowIndex + 1].splice(spaceIndex, 1, space);
            if (direction === 'left') newBoard[rowIndex].splice(spaceIndex - 1, 1, space);
            if (direction === 'right') newBoard[rowIndex].splice(spaceIndex + 1, 1, space);
            } else if (space !== null) {
            newBoard[rowIndex].splice(spaceIndex, 1, space);
            }
        })
        });
        gameEngineState.board = newBoard;
        drawBoard();
    }
};

const hardMoveDown = () => {
    for(let i = 0; i < 20; i++) {
        move('down');
    }
};

const canRotate = () => {
    let { board } = gameEngineState;
    let canRotate = true;
    board?.forEach((row, rowIndex) => {
        row?.forEach((space, spaceIndex) => {
        if (space?.isCurrent) {
            const nextOrientation = space.orientation < 3 ? space.orientation + 1 : 0;
            const positionFormula = ROTATIONFORMULA[space.piece][space.subSection][nextOrientation];
            const targetSpace = board?.[rowIndex + positionFormula[0]]?.[spaceIndex + positionFormula[1]];
            if (!(targetSpace?.isCurrent || targetSpace === null)) {
            canRotate = false;
            };
        };
        });
    });
    return canRotate;
};

const rotate = () => {
    let { paused, gameOver } = gameEngineState;
    if (!paused && !gameOver) {
        if (!canRotate()) return;
        let newBoard = createBlankBoard();
        // console.log('board', gameEngineState.board);
        gameEngineState.board?.forEach((row, rowIndex) => {
        row?.forEach((space, spaceIndex) => {
            if (space?.isCurrent) {
                const nextOrientation = space.orientation < 3 ? space.orientation + 1 : 0;
                const positionFormula = ROTATIONFORMULA[space.piece][space.subSection][nextOrientation];
                // console.log('formula', space.piece, space.subSection, positionFormula);
                newBoard[rowIndex + positionFormula[0]][spaceIndex + positionFormula[1]] = { ...space, orientation: nextOrientation };
            } else if (space !== null) {
                newBoard[rowIndex].splice(spaceIndex, 1, space);
            };
        });
        });
        gameEngineState.board = newBoard;
        drawBoard();
    }
};

export {
    move,
    canMove,
    hardMoveDown,
    rotate,
    canRotate
}