export default function HelpModal({
  handleHelp,
  volume,
  volumeUp,
  volumeDown,
  musicTypeHandler,
  musicType,
}) {
  return (
    <div className="z-20 modalsSize p-2 pt-5 bg-diagonal-stripes-dark border-dark-blue border-[5px] mr-2">
      <div className="flex flex-col items-center p-4 px-2 bg-background-blue border-dark-blue border-[5px]">
        <div className="text-dark-blue text-4xl">contorl keys</div>
        <ControlTable />
        <div className="text-dark-blue text-4xl">options</div>
        <div className="my-4 flex flex-col font-objectivityBold text-xs">
          <div className="flex items-center text-grey mb-2">
            <div className="font-thin">MUSIC VOLUME</div>
            <div className="flex items-center space-x-2">
              <button
                className={`${volume > 0 ? "hover:bg-hover-light-blue" : ""} text-grey border-dark-blue border-[2px] ml-1 px-2`}
                onClick={volumeDown}
              >
                -
              </button>
              <div className="w-8 text-center">{volume}%</div>
              <button
                className={`${volume < 100 ? "hover:bg-hover-light-blue" : ""} text-grey border-dark-blue border-[2px] px-2`}
                onClick={volumeUp}
              >
                +
              </button>
            </div>
          </div>
          <div className="text-grey mb-2 flex items-center space-x-2">
            <div className="font-thin w-28">MUSIC TYPE</div>
            <div
              className="w-20 text-center text-grey border-dark-blue border-[2px] mx-2 px-2 py-1 hover:bg-hover-light-blue"
              onClick={musicTypeHandler}
            >
              {musicType}
            </div>
          </div>
        </div>
        <button
          onClick={handleHelp}
          className="text-dark-blue p-2 px-8 m-1 text-3xl bg-background-blue border-dark-blue border-[5px] hover:bg-hover-light-blue"
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
    <table className="my-4 text-dark-blue font-objectivityBold text-xs">
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
