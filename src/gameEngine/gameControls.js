import { hardMoveDown, move, rotate } from './gameMovements.js';
import { pause, quit } from './gameActions.js';

const listen = () => {
    console.log('got to listen');
    if (typeof window !== 'undefined') {
      document.onkeydown = function(event) {
        event.preventDefault();
        const codes = {
          Space: () => hardMoveDown(),
          ArrowLeft: () => move('left'),
          ArrowUp: () => rotate(),
          ArrowRight: () => move('right'),
          ArrowDown: () => move('down'),
          KeyP: () => pause(),
          KeyQ: () => quit()
        }
        if (event.metaKey && event.code === 'KeyR') {
          document.location.reload();
        }
        const action = codes[event.code];
        if (action) {
          action();
        };
      };
    }
};

export { listen }