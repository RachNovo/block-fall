
export default function Stats({level, lines}) {
    return (
      <div className='bg-light-blue border-dark-blue border-4 divide-y-4 divide-dark-blue'>
        <div className='px-0.5 text-4xl pl-2 pt-2 pr-2 flex justify-between'>
          <div className='text-dark-blue'>
            level
          </div>
          <div>
            {level}
          </div>
        </div>
        <div className='px-0.5 text-4xl pl-2 pt-2 pr-2 flex justify-between'>
          <div className='text-dark-blue'>
            lines
          </div>
          <div>
            {lines}
          </div>
        </div>
      </div>
    )
  };
  