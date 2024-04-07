import chai, { expect } from 'chai';
import * as movement from './boardStorage/movement.js';
import * as tetris from '../src/gameEngine.js';
import mockCanvas from './mockCanvas.js';
// import jsdom from 'jsdom';
// const { JSDOM } = jsdom;

describe('Tetris', () => {
  before(function () { //DELETE LATER
    //silence the console
    console.log = function () {};
  });

  after(function () {  //DELETE LATER
    //reset console
    delete console.log;
  });

  // const document = jsdom.jsdom(undefined, {
  //   virtualConsole: jsdom.createVirtualConsole().sendTo(console)
  // });
  // const window = document.defaultView;
  // mockCanvas(window);

  let board = [];

  const relativePositions = {
    I: {
      0: { a: [0,0], b: [1,0], c: [2,0], d: [3,0]},
      1: { a: [1,2], b: [1,1], c: [1,0], d: [1,-1]},
      2: { a: [3,1], b: [2,1], c: [1,1], d: [0,1]},
      3: { a: [2,-1], b: [2,0], c: [2,1], d: [2,2]}
    },
    J: {
      0: { a: [0,0], b: [1,0], c: [2,-1], d: [2,0]},
      1: { a: [1,1], b: [1,0], c: [0,-1], d: [1,-1]},
      2: { a: [2,0], b: [1,0], c: [0,1], d: [0,0]},
      3: { a: [1,-1], b: [1,0], c: [2,1], d: [1,1]}
    },
    L: {
      0: { a: [0,0], b: [1,0], c: [2,0], d: [2,1]},
      1: { a: [1,1], b: [1,0], c: [1,-1], d: [2,-1]},
      2: { a: [2,0], b: [1,0], c: [0,0], d: [0,-1]},
      3: { a: [1,-1], b: [1,0], c: [1,1], d: [0,1]}
    },
    O: {
      0: { a: [0,0], b: [0,1], c: [1,0], d: [1,1]},
      1: { a: [0,0], b: [0,1], c: [1,0], d: [1,1]},
      2: { a: [0,0], b: [0,1], c: [1,0], d: [1,1]},
      3: { a: [0,0], b: [0,1], c: [1,0], d: [1,1]}
    },
    S: {
      0: { a: [0,0], b: [0, 1], c: [1, -1], d: [1, 0] },
      1: { a: [1,1], b: [2,1], c: [0,0], d: [1,0] },
      2: { a: [2,0], b: [2,-1], c: [1, 1], d: [1, 0] },
      3: { a: [1,-1], b: [0,-1], c: [2,0], d: [1, 0] }
    },
    T: {
      0: { a: [0,0], b: [0, 1], c: [0, 2], d: [1, 1] },
      1: { a: [-1,1], b: [0,1], c: [1,1], d: [0,0] },
      2: { a: [0,2], b: [0, 1], c: [0,0], d: [-1, 1] },
      3: { a: [1,1], b: [0,1], c: [-1,1], d: [0,2] }
    },
    Z: {
      0: { a: [0,0], b: [0,1], c: [1, 1], d: [1,2] },
      1: { a: [0,2], b: [1,2], c: [1,1], d: [2,1] },
      2: { a: [2,2], b: [2,1], c: [1, 1], d: [1,0] },
      3: { a: [2,0], b: [1,0], c: [1, 1], d: [0,1] }
    }
  };

  const generateMockBoard = (piece, orientation, offSet = [3,3]) => {
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
      [null, null, null, null, null, null, null, null, null, null]
    ];
    const positions = relativePositions[piece][orientation];
    for (let subSection in positions) {
      let row = offSet[0] + positions[subSection][0];
      let column = offSet[1] + positions[subSection][1];
      let newPiece = { piece, isCurrent: true, subSection, orientation }
      board[row]?.splice(column, 1, newPiece);
    }
    return board;
  };

  describe('MOVEMENT', () => {
    it.skip('test test', () => {
      tetris.start(movement.blank);
    })
    it('current piece SHOULD move one place to the left WHEN the left arrow key is pressed', () => {
      // console.log('expect: ', tetris.move(movement.moveBefore, 'left'), 'to equal: ', movement.moveLeftAfter);
      tetris.move(movement.moveBefore, 'left');
      expect(board).to.eql(movement.moveLeftAfter);
    });
    it('current piece SHOULD NOT move one place to the left WHEN the left arrow key is pressed IF there is no room', () => {
      expect(tetris.move(movement.cannotMoveLeft, 'left')).to.eql(movement.cannotMoveLeft);
    });
    it('current piece SHOULD move one place to the right WHEN the right arrow key is pressed', () => {
      expect(tetris.move(movement.moveBefore, 'right')).to.eql(movement.moveRightAfter);
    });
    it('current piece SHOULD NOT move one place to the right WHEN the right arrow key is pressed IF there is no room', () => {
      expect(tetris.move(movement.cannotMoveRight, 'right')).to.eql(movement.cannotMoveRight);
    });
    it('current piece SHOULD move down WHEN the down arrow is pressed', () => {
      expect(tetris.move(movement.moveBefore, 'down')).to.eql(movement.moveDownAfter);
    });
    it('current piece SHOULD NOT move down WHEN the down arrow is pressed IF there is no room', () => {
      expect(tetris.move(movement.cannotMoveDown, 'down')).to.eql(movement.cannotMoveDown);
    });
    it('current piece SHOULD move down as far as possible WHEN the space bar is pressed', () => {
      // board = movement.hardMoveDownBefore;
      // console.log('board', tetris.board);
      tetris.addPiece();
      // tetris.hardMoveDown();
      expect(tetris.board).to.eql(movement.hardMoveDownAfter);
      //TODO: FIXME
    });
  });

  describe('ROTATION', () => {
    describe('current piece SHOULD rotate clockwise WHEN the up arrow is pressed', () => {
      const pieces = ['I', 'J', 'L', 'S', 'T', 'Z'];
      pieces.forEach((piece) => {
        describe(`piece ${piece}`, () => {
          const defaultPosition = generateMockBoard(piece, 0);
          const firstPosition = generateMockBoard(piece, 1);
          const secondPosition = generateMockBoard(piece, 2);
          const thirdPosition = generateMockBoard(piece, 3);
          it(`SHOULD go to rotation one from default orientation`, () => {
            expect(tetris.rotate(defaultPosition)).to.eql(firstPosition);
          });
          it(`SHOULD go to rotation two from rotation one orientation`, () => {
            expect(tetris.rotate(firstPosition)).to.eql(secondPosition);
          });
          it(`SHOULD go to rotation three from rotation two orientation`, () => {
            expect(tetris.rotate(secondPosition)).to.eql(thirdPosition);
          });
          it(`SHOULD go back to default from rotation three orientation`, () => {
            expect(tetris.rotate(thirdPosition)).to.eql(defaultPosition);
          });
        });
      });
    });
    describe('current piece SHOULD NOT rotate IF there is no space at the rotated location', () => {
      const pieces = ['I', 'J', 'L', 'S', 'T', 'Z'];
      const cannotRotateOffSet = {
        I: [[2,9], [18,2], [4,0], [17,2]],
        J: [[2,9], [18,2], [2,0], [-1,3]],
        L: [[0,0], [-1,2], [1,9], [18,2]],
        S: [[18,2], [12,0], [-1,3], [0,9]],
        T: [[0,2], [2,8], [19,1], [3,-1]],
        Z: [[18,2], [7,-1], [-1,2], [2,8]]
      };
      pieces.forEach((piece) => {
        describe(`piece ${piece}`, () => {
          const cannotRotateDefault = generateMockBoard(piece, 0, cannotRotateOffSet[piece][0]);
          const cannotRotateFirst = generateMockBoard(piece, 1, cannotRotateOffSet[piece][1]);
          const cannotRotateSecond = generateMockBoard(piece, 2, cannotRotateOffSet[piece][2]);
          const cannotRotateThird = generateMockBoard(piece, 3, cannotRotateOffSet[piece][3]);
          it(`SHOULD NOT go to rotation one from default orientation`, () => {
            expect(tetris.rotate(cannotRotateDefault)).to.eql(cannotRotateDefault);
          });
          it(`SHOULD NOT go to rotation two from rotation one orientation`, () => {
            expect(tetris.rotate(cannotRotateFirst)).to.eql(cannotRotateFirst);
          });
          it(`SHOULD NOT go to rotation three from rotation two orientation`, () => {
            expect(tetris.rotate(cannotRotateSecond)).to.eql(cannotRotateSecond);
          });
          it(`SHOULD NOT go back to default from rotation three orientation`, () => {
            expect(tetris.rotate(cannotRotateThird)).to.eql(cannotRotateThird);
          });
        });
      });
    });
  });
  describe('ADDING PIECES', () => {
    it('next piece SHOULD be added WHEN the current piece hits the bottom', () => {
      const board = generateMockBoard('I', 1, [18,1]);
      expect(tetris.addPiece(board)).to.eql(board);
      expect(false).to.eql(true);
      // TODO: Complete this integration test
    });
    it.skip('next piece SHOULD be added WHEN the current piece hits another piece', () => {
      expect(false).to.eql(true);
      // TODO: Complete this integration test
    });
    it.skip('next piece SHOULD NOT be added if there is no room', () => {
      expect(false).to.eql(true);
      // TODO: Complete this integration test
    });
    it('next piece SHOULD NOT be added if a current piece exists', () => {
      const board = generateMockBoard('I', 1, [18,1]);
      expect(tetris.existsCurrentPiece(board)).to.equal(true);
    });
    const pieces = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    pieces.forEach((piece) => {
      it(`piece ${piece} SHOULD be added in the correct position`, () => {
        const board = generateMockBoard(piece, 0, tetris.spawnPositions[piece]['a']);
        tetris.bag.push(piece);
        // console.log(`board with ${piece} `, tetris.addPiece(movement.blank));
        expect(tetris.addPiece(movement.blank)).to.eql(board);
      });
    });
  });
  describe('GAME MECHANICS', () => {
    it('game SHOULD end IF there is no room for the next piece to start', () => {
      expect(false).to.eql(true);
    });
    it('the bag should be filled before adding a new piece is it is empty', () => {
      tetris.addPiece(movement.blank);
      expect(tetris.bag).to.have.lengthOf(6);
    });
    it('game SHOULD pause and resume WHEN pause key is selected', () => {
      tetris.pause();
      expect(tetris.paused).to.be.true;
      tetris.pause();
      expect(tetris.paused).to.be.false;
    });
    it('all pieces SHOULD adjust down and lines SHOULD disappear WHEN one or more lines are created', () => {
      expect(tetris.lineHandler(movement.withLine)).to.eql(movement.blank);
      expect(tetris.lineHandler(movement.withMultipleLines)).to.eql(movement.blank);
    });
    it('score placeholder (multiple tests)', () => {
      expect(false).to.eql(true);
    });
    it('levels', () => {
      expect(false).to.eql(true);
    });
    it('speed', () => {
      expect(false).to.eql(true);
    });
    it('lines count', () => {
      expect(false).to.eql(true);
    });
  });
  describe('UTILITIES', () => {
    it('blankBoard SHOULD create a blank board', () => {
      expect(tetris.createBlankBoard()).to.eql(movement.blank);
    });
    it('createCopy SHOULD create a copy of the given board', () => {
      expect(tetris.createCopy(movement.blank)).to.eql(movement.blank);
      expect(tetris.createCopy(movement.withMultipleLines)).to.eql(movement.withMultipleLines);
      expect(tetris.createCopy(movement.cannotMoveRight)).to.eql(movement.cannotMoveRight);
      expect(tetris.createCopy(movement.hardMoveDownBefore)).to.eql(movement.hardMoveDownBefore);
    });
  });
});
