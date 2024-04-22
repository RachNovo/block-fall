export default function GameOverModal() {
  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="fixed z-50 m-2 mt-20 flex flex-col items-center border-[5px] border-dark-blue bg-background-blue p-3 px-8">
      <div className="text-4xl text-dark-blue">game over</div>
      <button
        onClick={handleRestart}
        className="m-2 border-[5px] border-dark-blue bg-background-blue p-3 px-8 text-4xl hover:bg-hover-light-blue"
      >
        {" "}
        refresh{" "}
      </button>
    </div>
  );
}
