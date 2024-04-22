import { useState } from "react";
import funFacts from "../funFacts.js";

export default function StartModal({
  handleGameActive,
  handleUpdateLevel,
  level,
}) {
  const [index, setIndex] = useState(
    Math.floor(Math.random() * funFacts.length),
  );
  const [funFact, setFunFact] = useState({
    index: Math.floor(Math.random() * funFacts.length),
    fact: funFacts[index],
  });

  const funFactHandler = () => {
    const newIndex = index < funFacts.length - 1 ? funFact.index + 1 : 0;
    setIndex(newIndex);
    setFunFact({ index: newIndex, fact: funFacts[newIndex] });
  };

  return (
    <div className="modalsSize mr-2 flex flex-col items-center border-[5px] border-dark-blue bg-diagonal-stripes-dark p-2 pt-5">
      <button
        onClick={handleGameActive}
        className="m-2 border-[5px] border-dark-blue bg-background-blue p-3 px-8 text-4xl hover:bg-hover-light-blue"
      >
        {" "}
        play game{" "}
      </button>
      <button
        onClick={handleUpdateLevel}
        className="m-1 border-[5px] border-dark-blue bg-background-blue p-2 px-9 text-3xl text-dark-blue hover:bg-hover-light-blue"
      >
        {" "}
        level: {level}{" "}
      </button>
      <div
        onClick={funFactHandler}
        className="text-s m-1 mt-2 border-[5px] border-dark-blue bg-background-blue p-2 font-objectivityBold text-dark-blue"
      >
        <u>Trivia:</u> <i>{funFact.fact} </i>
      </div>
    </div>
  );
}
