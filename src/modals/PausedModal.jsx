export default function PausedModal({ handlePaused, handleHelp, handleRestart }) {

    return (
      <div className='z-10 modalsSize p-2 pt-5 bg-diagonal-stripes-dark border-dark-blue border-[5px] mr-2'>
        <div className='flex flex-col items-center p-3 px-8 m-4 mt-5 bg-background-blue border-dark-blue border-[5px]'>
            <div className='text-dark-blue text-4xl'>paused</div>
            <button onClick={handlePaused} className='p-2 px-8 m-2 text-4xl bg-background-blue border-dark-blue border-[5px] hover:bg-hover-light-blue'> resume </button>
            <button onClick={handleHelp} className='text-dark-blue p-1 px-8 m-1 text-3xl bg-background-blue border-dark-blue border-[5px] hover:bg-hover-light-blue'> help </button>
            <button onClick={handleRestart} className='text-dark-blue p-1 px-8 m-1 text-3xl bg-background-blue border-dark-blue border-[5px] hover:bg-hover-light-blue'> quit </button>
        </div>
      </div>
    )
  };
