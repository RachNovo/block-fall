export default function Board({canvasRef}) {

    return (
      <div className='basis-1/2 flex flex-col bg-diagonal-stripes-dark border-dark-blue border-4 mr-2'>
        <canvas ref={canvasRef} id="boardCanvas" width="101" height="200"></canvas>
      </div>
    )
  };