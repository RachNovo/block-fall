export default function GameOverModal() {

    const handleRestart = () => {
        window.location.reload();
    };

    return (
        <div className='fixed z-50 flex flex-col items-center p-3 px-8 m-2 mt-20 bg-background-blue border-dark-blue border-[5px]'>
            <div className='text-dark-blue text-4xl'>game over</div>
            <button onClick={handleRestart} className='p-3 px-8 m-2 text-4xl bg-background-blue border-dark-blue border-[5px] hover:bg-hover-light-blue'> refresh </button>
        </div>
    )
  };
