import React, { useRef } from 'react';

export default function NextPiece({nextPiece}) {

  const nextPieceRef = useRef(null);

  const colors = {
    I: '#58c4f4',
    J: '#0834f4',
    L: '#f87404',
    O: '#f8f404',
    S: '#10f404',
    T: '#b804f4',
    Z: '#fc2804'
  };
  const spawnPositions = {
    I: { a: [0, 5], b: [1, 5], c: [2, 5], d: [3, 5] },
    J: { a: [0, 5], b: [1, 5], c: [2, 4], d: [2, 5] },
    L: { a: [0, 4], b: [1, 4], c: [2, 4], d: [2, 5] },
    O: { a: [0, 4], b: [0, 5], c: [1, 4], d: [1, 5] },
    S: { a: [0, 4], b: [0, 5], c: [1, 3], d: [1, 4] },
    T: { a: [0, 3], b: [0, 4], c: [0, 5], d: [1, 4] },
    Z: { a: [0, 4], b: [0, 5], c: [1, 5], d: [1, 6] }
  };
  const pieceSize = 25;
  if (nextPiece) {
    const canvas = nextPieceRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for(let subPiece in spawnPositions[nextPiece]) {
      const y = spawnPositions[nextPiece][subPiece][0] + .5;
      const x = spawnPositions[nextPiece][subPiece][1] - 1;
      ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = colors[nextPiece];
      ctx.fillRect(x * pieceSize, y * pieceSize, pieceSize, pieceSize);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2.5;
      ctx.strokeRect(x * pieceSize + 1.5, y * pieceSize + 1.5, pieceSize, pieceSize);
    }
  }

  return (
    <div className='h-36 w-48 border-dark-blue border-4 mb-2 bg-light-blue p-2 w-40'>
      <canvas ref={nextPieceRef} id="nextPieceCanvas"></canvas>
    </div>
  )
};
