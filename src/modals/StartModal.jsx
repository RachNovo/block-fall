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
    <div className="flex flex-col items-center modalsSize p-2 pt-5 bg-diagonal-stripes-dark border-dark-blue border-[5px] mr-2">
      <button
        onClick={handleGameActive}
        className="p-3 px-8 m-2 text-4xl bg-background-blue border-dark-blue border-[5px] hover:bg-hover-light-blue"
      >
        {" "}
        play game{" "}
      </button>
      <button
        onClick={handleUpdateLevel}
        className="p-2 px-9 m-1 text-3xl text-dark-blue bg-background-blue border-dark-blue border-[5px] hover:bg-hover-light-blue"
      >
        {" "}
        level: {level}{" "}
      </button>
      <div
        onClick={funFactHandler}
        className="p-2 m-1 mt-2 text-s text-dark-blue bg-background-blue border-dark-blue border-[5px] font-objectivityBold"
      >
        <u>Trivia:</u> <i>{funFact.fact} </i>
      </div>
    </div>
  );
}
