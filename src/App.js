import './globals.css';
import React, { useEffect, useState, useRef } from 'react';
import Board from './board/Board.jsx';
import StartModal from './modals/StartModal.jsx';
import Panel from './panel/Panel.jsx';
import * as tetris from './gameEngine.js';

export default function App() {

  const [nextPiece, setNextPiece] = useState(tetris?.bag[0]);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [paused, setPaused] = useState(true);
  const [gameActive, setGameActive] = useState(false);

  const state = {
    setNextPiece,
    setLevel,
    setLines,
    setPaused,
    setGameActive,
    level
  }

  const handlePaused = () => {
    setPaused(!paused);
  };

  const handleGameActive = () => {
    setGameActive(!gameActive);
  };

  const handleUpdateLevel = () => {
    if (level < 10) {
      setLevel(level + 1);
    } else {
      setLevel(1);
    }
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      tetris.start(context, state);
    }
  }, [canvasRef, state]);

  useEffect(() => {
    tetris.pause();
  }, [paused]);

  return (
    <main className="fixed bg-diagonal-stripes-light font-['Angies-New-House']">
      <div className="my-10 mx-12 flex flex-row">
        { gameActive ? (
          < Board
            canvasRef={canvasRef}
          />
         ) : (
          < StartModal
            handleGameActive={handleGameActive}
            handleUpdateLevel={handleUpdateLevel}
            level={level}
          />
        )}
        < Panel
          context={canvasRef.current ? canvasRef.current.getContext('2d') : null}
          nextPiece={nextPiece}
          level={level}
          lines={lines}
          handlePaused={handlePaused}
          gameActive={gameActive}
        />
      </div>
    </main>
  )
};
