export default function Controls({ handlePaused }) {
    return (
        <div className='text-4xl pl-2 pt-2 pr-2 flex justify-end'>
            <div className='text-dark-blue'>
                <button onClick={handlePaused}>• pause •</button>
            </div>
        </div>
    )
};