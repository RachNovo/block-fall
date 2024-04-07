import './globals.css';
import React, { useEffect, useState, useRef } from 'react';
import Board from './board/Board.jsx';
import Panel from './panel/Panel.jsx';
import * as tetris from './gameEngine.js';

export default function App() {

  const [nextPiece, setNextPiece] = useState(tetris?.bag[0]);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [paused, setPaused] = useState(false);

  const state = {
    setNextPiece,
    setLevel,
    setLines,
    setPaused
  }

  const canvasRef = useRef(null);
  let context = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    context = canvas.getContext('2d');
    tetris.start(context, state);
  }, []);

  return (
    <main className="fixed bg-diagonal-stripes-light font-['Angies-New-House']">
      <div className="my-10 mx-12 flex flex-row">
        < Board
          canvasRef={canvasRef}
        />
        < Panel
          context={context}
          nextPiece={nextPiece}
          level={level}
          lines={lines}
          paused={paused}
          setPaused={setPaused}
        />
      </div>
    </main>
  )
};
