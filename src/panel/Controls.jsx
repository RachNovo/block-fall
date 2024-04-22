import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

export default function Controls({
  sound,
  handleSound,
  handlePaused,
  paused,
  gameActive,
  gameOver,
}) {
  const buttonActive =
    !paused && gameActive && !gameOver ? "" : "pointer-events-none hover:none";

  return (
    <div className="pb-2 pl-2 pr-2 pt-2 text-4xl">
      <div
        className={`flex items-center justify-center text-dark-blue ${buttonActive}`}
      >
        {gameActive ? (
          <>
            <button className="sound-icon" onClick={handleSound}>
              <FontAwesomeIcon icon={sound ? faVolumeHigh : faVolumeXmark} />
            </button>
            <button
              className="pl-4 hover:text-hover-dark-blue"
              onClick={handlePaused}
            >
              • pause •
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
