export default function Board({canvasRef}) {

    return (
      <div className='bg-diagonal-stripes-dark border-dark-blue border-[5px] mr-2'>
        <canvas ref={canvasRef} id="boardCanvas" width="101px" height="200"></canvas>
      </div>
    )
  };