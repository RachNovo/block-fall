import NextPiece from './NextPiece.jsx';
import Stats from './Stats.jsx';
import Controls from './Controls.jsx';
import Legend from './Legend.jsx';

export default function Panel({context, nextPiece, level, lines, handlePaused, gameActive}) {

  return (
    <div className='.panel'>
      < NextPiece context={context} nextPiece={nextPiece}/>
      < Stats level={level} lines={lines} gameActive={gameActive}/>
      < Controls handlePaused={handlePaused} gameActive={gameActive}/>
      < Legend />
    </div>
  )
};