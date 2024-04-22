export default function PausedModal({
  handlePaused,
  handleHelp,
  handleRestart,
}) {
  return (
    <div className="modalsSize z-10 mr-2 border-[5px] border-dark-blue bg-diagonal-stripes-dark p-2 pt-5">
      <div className="m-4 mt-5 flex flex-col items-center border-[5px] border-dark-blue bg-background-blue p-3 px-8">
        <div className="text-4xl text-dark-blue">paused</div>
        <button
          onClick={handlePaused}
          className="m-2 border-[5px] border-dark-blue bg-background-blue p-2 px-8 text-4xl hover:bg-hover-light-blue"
        >
          {" "}
          resume{" "}
        </button>
        <button
          onClick={handleHelp}
          className="m-1 border-[5px] border-dark-blue bg-background-blue p-1 px-8 text-3xl text-dark-blue hover:bg-hover-light-blue"
        >
          {" "}
          help{" "}
        </button>
        <button
          onClick={handleRestart}
          className="m-1 border-[5px] border-dark-blue bg-background-blue p-1 px-8 text-3xl text-dark-blue hover:bg-hover-light-blue"
        >
          {" "}
          quit{" "}
        </button>
      </div>
    </div>
  );
}
