import { hardMoveDown, move, rotate } from "./gameMovements.js";
import { pause, quit } from "./gameActions.js";

const handleKeyDown = (event) => {
  const codes = {
    Space: () => hardMoveDown(),
    ArrowLeft: () => move("left"),
    ArrowUp: () => rotate(),
    ArrowRight: () => move("right"),
    ArrowDown: () => move("down"),
    KeyP: () => pause(),
    KeyQ: () => quit(),
  };
  const action = codes[event.code];
  if (action) {
    event.preventDefault();
    action();
  }
};
const listen = () => {
  if (typeof window !== "undefined") {
    document.addEventListener("keydown", handleKeyDown);
  }
};

export { listen };
