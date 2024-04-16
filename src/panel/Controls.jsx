export default function Controls({ handlePaused, gameActive }) {
    return (
        <div className='text-4xl pl-2 pt-2 pr-2 pb-2 flex justify-center'>
            <div className='text-dark-blue hover:text-hover-dark-blue'>
                {gameActive ?
                  <button onClick={handlePaused}>• pause •</button> : <div></div>
                }
            </div>
        </div>
    )
};