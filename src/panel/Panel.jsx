import NextPiece from './NextPiece.jsx';
import Stats from './Stats.jsx';
import Controls from './Controls.jsx';

export default function Panel({context, nextPiece, level, lines, handleSound, sound, handlePaused, paused, gameActive, gameOver}) {
  const opacity = !gameActive || paused || gameOver ? 'opacity-75' : '';

  return (
    <div className={`${opacity} .panel`}>
      < NextPiece context={context} nextPiece={nextPiece} paused={paused}/>
      < Stats level={level} lines={lines} gameActive={gameActive}/>
      < Controls handleSound={handleSound} sound={sound} handlePaused={handlePaused} paused={paused} gameOver={gameOver} gameActive={gameActive}/>
    </div>
  )
};