import './globals.css';
import React, { useEffect, useState, useRef } from 'react';
import Board from './board/Board.jsx';
import StartModal from './modals/StartModal.jsx';
import PausedModal from './modals/PausedModal.jsx';
import GameOverModal from './modals/GameOverModal.jsx';
import HelpModal from './modals/HelpModal.jsx';
import Panel from './panel/Panel.jsx';
import * as tetris from './gameEngine.js';

export default function App() {

  const [nextPiece, setNextPiece] = useState(tetris?.bag[0]);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [paused, setPaused] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const state = {
    setNextPiece,
    setLevel,
    setLines,
    paused,
    setPaused,
    setGameActive,
    level,
    gameOver,
    setGameOver
  };

  const handlePaused = () => {
    tetris.pause();
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
    if (canvas && gameActive) {
      const context = canvas.getContext('2d');
      tetris.start(context, state);
    }
  }, [canvasRef, state, gameActive]);

  const handleRestart = () => {
    window.location.reload();
  };

  const handleHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <main className="fixed bg-diagonal-stripes-light font-['Angies-New-House']">
      <div className="my-10 mx-12 flex flex-row">
        {(paused && showHelp) && (
          <HelpModal handleHelp={handleHelp} />
        )}
        {(paused && !showHelp) && (
          <PausedModal
            handlePaused={handlePaused}
            handleRestart={handleRestart}
            handleHelp={handleHelp}
            paused={paused}
          />
        )}
        {!gameActive && !paused && (
          <StartModal
            handleGameActive={handleGameActive}
            handleUpdateLevel={handleUpdateLevel}
            level={level}
            handleHelp={handleHelp}
          />
        )}
        { gameOver && (
          < GameOverModal />
        )
        }
        <Board
          canvasRef={canvasRef}
          paused={paused}
          gameActive={gameActive}
          gameOver={gameOver}
          showHelp={showHelp}
        />
        < Panel
          context={canvasRef.current ? canvasRef.current.getContext('2d') : null}
          nextPiece={nextPiece}
          level={level}
          lines={lines}
          handlePaused={handlePaused}
          paused={paused}
          gameActive={gameActive}
          gameOver={gameOver}
        />
      </div>
    </main>
  )
};
