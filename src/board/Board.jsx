export default function Board({canvasRef, paused, gameActive, gameOver, showHelp}) {
  const display = (gameActive && !paused && !showHelp) ? '' : 'hidden';
  const opacity = (gameActive && !paused && !gameOver && !showHelp) ? '' : 'opacity-75';
  return (
    <div className={`${display} ${opacity} bg-diagonal-stripes-dark border-dark-blue border-[5px] mr-2`}>
      <canvas ref={canvasRef} id="boardCanvas" width="101px" height="200"></canvas>
    </div>
  )
};