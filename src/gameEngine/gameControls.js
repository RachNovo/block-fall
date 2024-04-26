import { hardMoveDown, move, rotate } from "./gameMovements.js";
import { pause, quit } from "./gameActions.js";

const handleKeyDown = (event, gameState) => {
  const codes = {
    Space: (gameState) => hardMoveDown(gameState),
    ArrowLeft: (gameState) => move("left", gameState),
    ArrowUp: (gameState) => rotate(gameState),
    ArrowRight: (gameState) => move("right", gameState),
    ArrowDown: (gameState) => move("down", gameState),
    KeyP: (gameState) => pause(gameState),
    KeyQ: (gameState) => quit(gameState),
  };
  const action = codes[event.code];
  if (action) {
    event.preventDefault();
    action(gameState);
  }
};

const listen = (gameState) => {
  if (typeof window !== "undefined") {
    const boundHandleKeyDown = (event) => handleKeyDown(event, gameState);
    document.addEventListener("keydown", boundHandleKeyDown);
  }
};

export { listen };
