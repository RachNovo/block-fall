export default function HelpModal({ handleHelp }) {

    return (
      <div className='z-20 modalsSize p-2 pt-5 bg-diagonal-stripes-dark border-dark-blue border-[5px] mr-2'>
        <div className='flex flex-col items-center p-4 px-2 m-2 mt-5 bg-background-blue border-dark-blue border-[5px]'>
            <div className='text-dark-blue text-3xl'>contorl keys</div>
            < ControlTable />
            <button onClick={handleHelp} className='text-dark-blue p-2 px-8 m-1 text-3xl bg-background-blue border-dark-blue border-[5px] hover:bg-hover-light-blue'> done </button>
        </div>
      </div>
    )
  };

  function ControlTable() {
    return (
      <table className='my-4 text-dark-blue font-objectivityBold text-xs'>
        <tbody>
          <tr>
            <td className="text-left">MOVE RIGHT</td>
            <td>- right arrow</td>
          </tr>
          <tr>
            <td className="text-left">MOVE LEFT</td>
            <td>- left arrow</td>
          </tr>
          <tr>
            <td className="text-left">ROTATE RIGHT</td>
            <td>- up arrow</td>
          </tr>
          <tr>
            <td className="text-left">SOFT DROP</td>
            <td>- down arrow</td>
          </tr>
          <tr>
            <td className="text-left">HARD DROP</td>
            <td>- space</td>
          </tr>
        </tbody>
      </table>
    );
}
