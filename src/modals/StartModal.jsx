export default function StartModal({ handleGameActive, handleUpdateLevel, level }) {

    return (
      <div className='flex flex-col items-center modalsSize p-2 pt-5 bg-diagonal-stripes-dark border-dark-blue border-[5px] mr-2'>
        <button onClick={handleGameActive} className='p-3 px-8 m-2 text-4xl bg-background-blue border-dark-blue border-[5px] hover:bg-hover-light-blue'> play game </button>
        <button onClick={handleUpdateLevel} className='p-2 px-9 m-1 text-3xl text-dark-blue bg-background-blue border-dark-blue border-[5px] hover:bg-hover-light-blue'> level: {level} </button>
        <div className='p-2 m-1 mt-2 text-s text-dark-blue bg-background-blue border-dark-blue border-[5px] font-objectivityBold'>
          <i><u>Fun Fact:</u> The iconic Tetris theme song, known as "Korobeiniki," is a Russian folk tune dating back to the 19th century.</i>
        </div>
      </div>
    )
  };
