export default function HelpModal({
  handleHelp,
  volume,
  volumeUp,
  volumeDown,
  musicTypeHandler,
  musicType,
}) {
  return (
    <div className="modalsSize z-20 mr-2 border-[5px] border-dark-blue bg-diagonal-stripes-dark p-2 pt-5">
      <div className="flex flex-col items-center border-[5px] border-dark-blue bg-background-blue p-4 px-2">
        <div className="text-4xl text-dark-blue">contorl keys</div>
        <ControlTable />
        <div className="text-4xl text-dark-blue">options</div>
        <div className="my-4 flex flex-col font-objectivityBold text-xs">
          <div className="mb-2 flex items-center text-grey">
            <div className="font-thin">MUSIC VOLUME</div>
            <div className="flex items-center space-x-2">
              <button
                className={`${volume > 0 ? "hover:bg-hover-light-blue" : ""} ml-1 border-[2px] border-dark-blue px-2 text-grey`}
                onClick={volumeDown}
              >
                -
              </button>
              <div className="w-8 text-center">{volume}%</div>
              <button
                className={`${volume < 100 ? "hover:bg-hover-light-blue" : ""} border-[2px] border-dark-blue px-2 text-grey`}
                onClick={volumeUp}
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-2 flex items-center space-x-2 text-grey">
            <div className="w-28 font-thin">MUSIC TYPE</div>
            <div
              className="mx-2 w-20 border-[2px] border-dark-blue px-2 py-1 text-center text-grey hover:bg-hover-light-blue"
              onClick={musicTypeHandler}
            >
              {musicType}
            </div>
          </div>
        </div>
        <button
          onClick={handleHelp}
          className="m-1 border-[5px] border-dark-blue bg-background-blue p-2 px-8 text-3xl text-dark-blue hover:bg-hover-light-blue"
        >
          {" "}
          done{" "}
        </button>
      </div>
    </div>
  );
}

function ControlTable() {
  return (
    <table className="my-4 font-objectivityBold text-xs text-dark-blue">
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
