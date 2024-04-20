import './globals.css';
import React, { useEffect, useState, useRef } from 'react';
import Board from './board/Board.jsx';
import StartModal from './modals/StartModal.jsx';
import PausedModal from './modals/PausedModal.jsx';
import GameOverModal from './modals/GameOverModal.jsx';
import HelpModal from './modals/HelpModal.jsx';
import Panel from './panel/Panel.jsx';
import * as tetris from './gameEngine.js';
import piano from './assets/music/piano.mp3';
import strings from './assets/music/strings.mp3';
import cossack from './assets/music/cossack.mp3';

export default function App() {

  const [nextPiece, setNextPiece] = useState(tetris?.bag[0]);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [paused, setPaused] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [sound, setSound] = useState(false);
  const [volume, setVolume] = useState(100);
  const [musicType, setMusicType] = useState('piano');
  const pianoAudioRef = useRef(new Audio(piano));
  const stringsAudioRef = useRef(new Audio(strings));
  const cossackAudioRef = useRef(new Audio(cossack));
  const TYPES = {
    piano: pianoAudioRef.current,
    strings: stringsAudioRef.current,
    cossack: cossackAudioRef.current,
  };

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

  const handleSound = () => {
    setSound(!sound);
  };

  const volumeUp = () => {
    const newVolume = volume < 100 ? volume + 10 : volume
    setVolume(newVolume);
  };

  const volumeDown = () => {
    const newVolume = volume > 0 ? volume - 10 : volume;
    setVolume(newVolume);
  };

  const musicTypeHandler = () => {
    const typeKeys = Object.keys(TYPES);
    const currentIndex = typeKeys.indexOf(musicType);
    if (currentIndex >= 0 && currentIndex < typeKeys.length - 1) {
      setMusicType(typeKeys[currentIndex + 1]);
    } else {
      setMusicType(typeKeys[0]);
    }
    if (!sound) {
      handleSound(true);
    }
  };

  useEffect(() => {
    const currentAudio = TYPES[musicType];
    Object.values(TYPES).forEach(audio => {
      if (audio !== currentAudio) {
        audio.pause();
      }
    });
    const startTime = musicType === 'piano' ? 1.6 : 'strings' ? 1 : 0;
    currentAudio.currentTime = startTime;
    if (sound) {
      currentAudio.play();
    } else {
      currentAudio.pause();
    }
    currentAudio.loop = true;
    currentAudio.volume = musicType === 'cossack' ? (volume * 0.1) * 0.01 : volume * .01;
  }, [sound, volume, musicType]);

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
          <HelpModal
            handleHelp={handleHelp}
            volume={volume}
            volumeUp={volumeUp}
            volumeDown={volumeDown}
            musicTypeHandler={musicTypeHandler}
            musicType={musicType}
          />
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
          sound={sound}
          handleSound={handleSound}
          handlePaused={handlePaused}
          paused={paused}
          gameActive={gameActive}
          gameOver={gameOver}
        />
      </div>
    </main>
  )
};
