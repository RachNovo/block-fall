import NextPiece from './NextPiece.jsx';
import Stats from './Stats.jsx';
import Controls from './Controls.jsx';
import Legend from './Legend.jsx';

export default function Panel({context, nextPiece, level, lines, handlePaused}) {

  return (
    <div className='basis-1/2'>
      < NextPiece context={context} nextPiece={nextPiece}/>
      < Stats level={level} lines={lines}/>
      < Controls handlePaused={handlePaused}/>
      < Legend />
    </div>
  )
};