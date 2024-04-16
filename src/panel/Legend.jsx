export default function Legend() {
    return (
        <div className='bg-light-blue border-dark-blue border-[5px] divide-y-4 divide-dark-blue'>
            <div className='px-0.5 text-xs tracking-tighter pl-2 pt-2 pr-2 pb-2 flex justify-between text-dark-blue font-objectivityBold'>
                < ControlTable />
            </div>
        </div>
    )
};

function ControlTable() {
    return (
      <table className='w-full'>
        <tbody>
          <tr>
            <td className="text-left">MOVE RIGHT</td>
            <td>right arrow</td>
          </tr>
          <tr>
            <td className="text-left">MOVE LEFT</td>
            <td>left arrow</td>
          </tr>
          <tr>
            <td className="text-left">ROTATE RIGHT</td>
            <td>up arrow</td>
          </tr>
          <tr>
            <td className="text-left">SOFT DROP</td>
            <td>down arrow</td>
          </tr>
          <tr>
            <td className="text-left">HARD DROP</td>
            <td>space</td>
          </tr>
        </tbody>
      </table>
    );
}
