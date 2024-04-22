export default function Stats({ level, lines, gameActive }) {
  return (
    <div className="divide-y-4 divide-dark-blue border-[5px] border-dark-blue bg-light-blue">
      <div className="flex justify-between px-0.5 pl-2 pr-2 pt-2 text-4xl">
        <div className="text-dark-blue">level</div>
        <div>{gameActive ? level : ""}</div>
      </div>
      <div className="flex justify-between px-0.5 pl-2 pr-2 pt-2 text-4xl">
        <div className="text-dark-blue">lines</div>
        <div>{gameActive ? lines : ""}</div>
      </div>
    </div>
  );
}
