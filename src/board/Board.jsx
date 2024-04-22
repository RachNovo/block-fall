export default function Board({
  canvasRef,
  paused,
  gameActive,
  gameOver,
  showHelp,
}) {
  const display = gameActive && !paused && !showHelp ? "" : "hidden";
  const opacity =
    gameActive && !paused && !gameOver && !showHelp ? "" : "opacity-75";
  return (
    <div
      className={`${display} ${opacity} mr-2 border-[5px] border-dark-blue bg-diagonal-stripes-dark`}
    >
      <canvas
        ref={canvasRef}
        id="boardCanvas"
        width="101px"
        height="200"
      ></canvas>
    </div>
  );
}
