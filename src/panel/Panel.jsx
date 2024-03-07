import NextPiece from './NextPiece.jsx';
import Stats from './Stats.jsx';

export default function Panel({context, nextPiece, level, lines}) {

  return (
    <div className='basis-1/2'>
      < NextPiece context={context} nextPiece={nextPiece}/>
      < Stats level={level} lines={lines}/>
    </div>
  )
};