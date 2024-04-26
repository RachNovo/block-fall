import * as chai from "chai";
import * as boards from "./boardStorage/boards.js";
import { SPAWNPOSITIONS } from "../src/gameEngine/constants.js";
import {
  existsCurrentPiece,
  pause,
  lineHandler,
} from "../src/gameEngine/gameActions.js";
import { addPiece } from "../src/gameEngine/gameBoard.js";
import { move, hardMoveDown, rotate } from "../src/gameEngine/gameMovements.js";
import { gameLoop } from "../src/gameEngine/gameState.js";
import {
  createBlankBoard,
  calculateDelay,
  createCopy,
} from "../src/gameEngine/util.js";
const expect = chai.expect;

let mockGameState = {
  board: createBlankBoard(),
  bag: [],
  level: 1,
  lines: 0,
  delay: calculateDelay(1000, 1),
  paused: false,
  gameOver: false,
  context: {
    fillStyle: () => {},
    canvas: { width: 0, height: 0 },
    clearRect: () => {},
    fillRect: () => {},
    strokeRect: () => {},
  },
  currentPiece: "",
  state: {
    setNextPiece: () => {},
    setGameOver: () => {},
    setPaused: () => {},
    setLevel: () => {},
    setLines: () => {},
  },
  intervalID: 0,
};

describe("Tetris", () => {
  afterEach(() => {
    mockGameState.bag = [];
  });

  const relativePositions = {
    I: {
      0: { a: [0, 0], b: [1, 0], c: [2, 0], d: [3, 0] },
      1: { a: [1, 2], b: [1, 1], c: [1, 0], d: [1, -1] },
      2: { a: [3, 1], b: [2, 1], c: [1, 1], d: [0, 1] },
      3: { a: [2, -1], b: [2, 0], c: [2, 1], d: [2, 2] },
    },
    J: {
      0: { a: [0, 0], b: [1, 0], c: [2, -1], d: [2, 0] },
      1: { a: [1, 1], b: [1, 0], c: [0, -1], d: [1, -1] },
      2: { a: [2, 0], b: [1, 0], c: [0, 1], d: [0, 0] },
      3: { a: [1, -1], b: [1, 0], c: [2, 1], d: [1, 1] },
    },
    L: {
      0: { a: [0, 0], b: [1, 0], c: [2, 0], d: [2, 1] },
      1: { a: [1, 1], b: [1, 0], c: [1, -1], d: [2, -1] },
      2: { a: [2, 0], b: [1, 0], c: [0, 0], d: [0, -1] },
      3: { a: [1, -1], b: [1, 0], c: [1, 1], d: [0, 1] },
    },
    O: {
      0: { a: [0, 0], b: [0, 1], c: [1, 0], d: [1, 1] },
      1: { a: [0, 0], b: [0, 1], c: [1, 0], d: [1, 1] },
      2: { a: [0, 0], b: [0, 1], c: [1, 0], d: [1, 1] },
      3: { a: [0, 0], b: [0, 1], c: [1, 0], d: [1, 1] },
    },
    S: {
      0: { a: [0, 0], b: [0, 1], c: [1, -1], d: [1, 0] },
      1: { a: [1, 1], b: [2, 1], c: [0, 0], d: [1, 0] },
      2: { a: [2, 0], b: [2, -1], c: [1, 1], d: [1, 0] },
      3: { a: [1, -1], b: [0, -1], c: [2, 0], d: [1, 0] },
    },
    T: {
      0: { a: [0, 0], b: [0, 1], c: [0, 2], d: [1, 1] },
      1: { a: [-1, 1], b: [0, 1], c: [1, 1], d: [0, 0] },
      2: { a: [0, 2], b: [0, 1], c: [0, 0], d: [-1, 1] },
      3: { a: [1, 1], b: [0, 1], c: [-1, 1], d: [0, 2] },
    },
    Z: {
      0: { a: [0, 0], b: [0, 1], c: [1, 1], d: [1, 2] },
      1: { a: [0, 2], b: [1, 2], c: [1, 1], d: [2, 1] },
      2: { a: [2, 2], b: [2, 1], c: [1, 1], d: [1, 0] },
      3: { a: [2, 0], b: [1, 0], c: [1, 1], d: [0, 1] },
    },
  };

  const generateMockBoard = (
    piece,
    orientation,
    offSet = [3, 3],
    isCurrent = true,
  ) => {
    const board = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
    const positions = relativePositions[piece][orientation];
    for (let subSection in positions) {
      let row = offSet[0] + positions[subSection][0];
      let column = offSet[1] + positions[subSection][1];
      let newPiece = { piece, isCurrent, subSection, orientation };
      board[row]?.splice(column, 1, newPiece);
    }
    return board;
  };

  describe("MOVEMENT", () => {
    it("current piece SHOULD move one place to the left WHEN the left arrow key is pressed", () => {
      mockGameState.board = boards.moveBefore;
      move("left", mockGameState);
      expect(mockGameState.board).to.eql(boards.moveLeftAfter);
    });
    it("current piece SHOULD NOT move one place to the left WHEN the left arrow key is pressed IF there is no room", () => {
      mockGameState.board = boards.cannotMoveLeft;
      move("left", mockGameState);
      expect(mockGameState.board).to.eql(boards.cannotMoveLeft);
    });
    it("current piece SHOULD move one place to the right WHEN the right arrow key is pressed", () => {
      mockGameState.board = boards.moveBefore;
      move("right", mockGameState);
      expect(mockGameState.board).to.eql(boards.moveRightAfter);
    });
    it("current piece SHOULD NOT move one place to the right WHEN the right arrow key is pressed IF there is no room", () => {
      mockGameState.board = boards.cannotMoveRight;
      move("right", mockGameState);
      expect(mockGameState.board).to.eql(boards.cannotMoveRight);
    });
    it("current piece SHOULD move down WHEN the down arrow is pressed", () => {
      mockGameState.board = boards.moveBefore;
      move("down", mockGameState);
      expect(mockGameState.board).to.eql(boards.moveDownAfter);
    });
    it("current piece SHOULD NOT move down WHEN the down arrow is pressed IF there is no room", () => {
      mockGameState.board = boards.cannotMoveDown;
      move("down", mockGameState);
      expect(mockGameState.board).to.eql(boards.cannotMoveDown);
    });
    it("current piece SHOULD move down as far as possible WHEN the space bar is pressed", () => {
      mockGameState.board = boards.hardMoveDownBefore;
      hardMoveDown(mockGameState);
      expect(mockGameState.board).to.eql(boards.hardMoveDownAfter);
    });
  });

  describe("ROTATION", () => {
    describe("current piece SHOULD rotate clockwise WHEN the up arrow is pressed", () => {
      const pieces = ["I", "J", "L", "S", "T", "Z"];
      pieces.forEach((piece) => {
        describe(`piece ${piece}`, () => {
          const defaultPosition = generateMockBoard(piece, 0);
          const firstPosition = generateMockBoard(piece, 1);
          const secondPosition = generateMockBoard(piece, 2);
          const thirdPosition = generateMockBoard(piece, 3);
          it(`SHOULD go to rotation one from default orientation`, () => {
            mockGameState.board = defaultPosition;
            rotate(mockGameState);
            expect(mockGameState.board).to.eql(firstPosition);
          });
          it(`SHOULD go to rotation two from rotation one orientation`, () => {
            mockGameState.board = firstPosition;
            rotate(mockGameState);
            expect(mockGameState.board).to.eql(secondPosition);
          });
          it(`SHOULD go to rotation three from rotation two orientation`, () => {
            mockGameState.board = secondPosition;
            rotate(mockGameState);
            expect(mockGameState.board).to.eql(thirdPosition);
          });
          it(`SHOULD go back to default from rotation three orientation`, () => {
            mockGameState.board = thirdPosition;
            rotate(mockGameState);
            expect(mockGameState.board).to.eql(defaultPosition);
          });
        });
      });
    });
    describe("current piece SHOULD NOT rotate IF there is no space at the rotated location", () => {
      const pieces = ["I", "J", "L", "S", "T", "Z"];
      const cannotRotateOffSet = {
        I: [
          [2, 9],
          [18, 2],
          [4, 0],
          [17, 2],
        ],
        J: [
          [2, 9],
          [18, 2],
          [2, 0],
          [-1, 3],
        ],
        L: [
          [0, 0],
          [-1, 2],
          [1, 9],
          [18, 2],
        ],
        S: [
          [18, 2],
          [12, 0],
          [-1, 3],
          [0, 9],
        ],
        T: [
          [0, 2],
          [2, 8],
          [19, 1],
          [3, -1],
        ],
        Z: [
          [18, 2],
          [7, -1],
          [-1, 2],
          [2, 8],
        ],
      };
      pieces.forEach((piece) => {
        describe(`piece ${piece}`, () => {
          const cannotRotateDefault = generateMockBoard(
            piece,
            0,
            cannotRotateOffSet[piece][0],
          );
          const cannotRotateFirst = generateMockBoard(
            piece,
            1,
            cannotRotateOffSet[piece][1],
          );
          const cannotRotateSecond = generateMockBoard(
            piece,
            2,
            cannotRotateOffSet[piece][2],
          );
          const cannotRotateThird = generateMockBoard(
            piece,
            3,
            cannotRotateOffSet[piece][3],
          );
          it(`SHOULD NOT go to rotation one from default orientation`, () => {
            mockGameState.board = cannotRotateDefault;
            rotate(mockGameState);
            expect(mockGameState.board).to.equal(cannotRotateDefault);
          });
          it(`SHOULD NOT go to rotation two from rotation one orientation`, () => {
            mockGameState.board = cannotRotateFirst;
            rotate(mockGameState);
            expect(mockGameState.board).to.equal(cannotRotateFirst);
          });
          it(`SHOULD NOT go to rotation three from rotation two orientation`, () => {
            mockGameState.board = cannotRotateSecond;
            rotate(mockGameState);
            expect(mockGameState.board).to.equal(cannotRotateSecond);
          });
          it(`SHOULD NOT go back to default from rotation three orientation`, () => {
            mockGameState.board = cannotRotateThird;
            rotate(mockGameState);
            expect(mockGameState.board).to.equal(cannotRotateThird);
          });
        });
      });
    });
  });
  describe("ADDING PIECES", () => {
    it("next piece SHOULD be added WHEN the current piece hits the bottom", () => {
      mockGameState.board = generateMockBoard("I", 1, [18, 1], false);
      mockGameState.bag = ["J"];
      gameLoop(mockGameState);
      expect(mockGameState.board).to.eql(boards.addPieceAfterPieceHitsBottom);
    });
    it("next piece SHOULD be added WHEN the current piece hits another piece", () => {
      mockGameState.board = boards.addPieceAfterPieceHitsPieceBefore;
      mockGameState.bag = ["J"];
      gameLoop(mockGameState);
      expect(mockGameState.board).to.eql(
        boards.addPieceAfterPieceHitsPieceAfter,
      );
    });
    it("next piece SHOULD NOT be added if there is no room", () => {
      mockGameState.board = boards.noMoreRoom;
      mockGameState.bag = ["J"];
      gameLoop(mockGameState);
      expect(mockGameState.board).to.eql(boards.noMoreRoom);
    });
    it("next piece SHOULD NOT be added if a current piece exists", () => {
      mockGameState.board = generateMockBoard("I", 1, [18, 1]);
      expect(existsCurrentPiece(mockGameState)).to.equal(true);
    });
    const pieces = ["I", "J", "L", "O", "S", "T", "Z"];
    pieces.forEach((piece) => {
      it(`piece ${piece} SHOULD be added in the correct position`, () => {
        const generatedBoard = generateMockBoard(
          piece,
          0,
          SPAWNPOSITIONS[piece]["a"],
        );
        mockGameState.bag = [];
        mockGameState.bag.push(piece);
        mockGameState.board = boards.blank;
        addPiece(mockGameState);
        expect(mockGameState.board).to.eql(generatedBoard);
      });
    });
  });
  describe("GAME MECHANICS", () => {
    it("game SHOULD end IF there is no room for the next piece to start", () => {
      mockGameState.board = boards.noMoreRoom;
      mockGameState.bag = ["J"];
      gameLoop(mockGameState);
      expect(mockGameState.board).to.eql(boards.noMoreRoom);
      expect(mockGameState.gameOver).to.eql(true);
    });
    it("the bag should be filled before adding a new piece is it is empty", () => {
      mockGameState.board = boards.blank;
      mockGameState.bag = ["J"];
      gameLoop(mockGameState);
      expect(mockGameState.bag).to.have.lengthOf(7);
    });
    it("game SHOULD pause and resume WHEN pause key is selected", () => {
      pause(mockGameState);
      expect(mockGameState.paused).to.be.true;
      pause(mockGameState);
      expect(mockGameState.paused).to.be.false;
    });
    it("all pieces SHOULD adjust down, lines SHOULD disappear and line counter SHOULD increase WHEN one or more lines are created", () => {
      mockGameState.lines = 0;
      mockGameState.board = boards.withLine;
      lineHandler(mockGameState);
      expect(mockGameState.board).to.eql(boards.blank);
      expect(mockGameState.lines).to.eql(1);
      mockGameState.board = boards.withMultipleLines;
      lineHandler(mockGameState);
      expect(mockGameState.board).to.eql(boards.blank);
      expect(mockGameState.lines).to.eql(5);
    });
    it("speed SHOULD increase each 10 lines", () => {
      mockGameState.lines = 9;
      mockGameState.delay = 1000;
      mockGameState.board = boards.withLine;
      lineHandler(mockGameState);
      expect(mockGameState.lines).to.eql(10);
      expect(mockGameState.delay).to.eql(950);
    });
  });
  describe("UTILITIES", () => {
    it("calculateDelay SHOULD calculate delay based on level", () => {
      const speeds = [1000, 950, 903, 857, 815, 774, 735, 698, 663, 630];
      speeds.forEach((speed, i) => {
        const level = i + 1;
        expect(calculateDelay(1000, level)).to.eql(speed);
      });
    });
    it("blankBoard SHOULD create a blank board", () => {
      expect(createBlankBoard()).to.eql(boards.blank);
    });
    it("createCopy SHOULD create a copy of the given board", () => {
      expect(createCopy(boards.blank)).to.eql(boards.blank);
      expect(createCopy(boards.withMultipleLines)).to.eql(
        boards.withMultipleLines,
      );
      expect(createCopy(boards.cannotMoveRight)).to.eql(boards.cannotMoveRight);
      expect(createCopy(boards.hardMoveDownBefore)).to.eql(
        boards.hardMoveDownBefore,
      );
    });
  });
});
