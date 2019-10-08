import { POP_GAMEBOARD, KEY_EVENTDIRECTION } from './Action';

let emptyBoard =
  //1=<div class="wall"></div>
  //2= <div class="coin"></div>
  //3=<div class="ground"></div>
  //5= <div class="pacman"></div>
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 1],
    [1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 1, 1, 1, 5, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 1],
    [1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

const initialState = {
  board: emptyBoard,
  player: {
    name: 'Player1',
    direction: 'right',
    x: 6,
    y: 4,
  },
};
function get_direction(keyCode) {
  let keyvalue = keyCode;
  let direction;
  if (keyvalue === 37) {
    direction = 'left';
  }
  if (keyvalue === 38) {
    direction = 'up';
  }
  if (keyvalue === 39) {
    direction = 'right';
  }
  if (keyvalue === 40) {
    direction = 'down';
  }
  return direction;
}
function Player(player, board) {
  console.log(
    'player function' + player.direction + 'x:' + player.x + 'y:' + player.y,
  );
  const checkcollision = ({ x, y, direction }) => {
    //let board = appState.board;
    let value = null;
    console.log(direction);
    if (direction === 'left') {
      value = board[y][x - 1];
    }
    if (direction === 'right') {
      value = board[y][x + 1];
    }
    if (direction === 'up') {
      value = board[y - 1][x];
    }
    if (direction === 'down') {
      value = board[y + 1][x];
    }
    return value;
    //console.log('value is' + value);
  };
  let direction = player.direction;
  let x = player.x;
  let y = player.y;
  let collisionVal = checkcollision({ x, y, direction });
  console.log('collisionVal' + collisionVal);
  if (collisionVal !== 1) {
    if (direction === 'left') {
      board[y][x] = 3;
      x = x - 1;
      board[y][x] = 5;
    }
    if (direction === 'right') {
      board[y][x] = 3;
      x = x + 1;
      board[y][x] = 5;
    }
    if (direction === 'up') {
      board[y][x] = 3;
      y = y - 1;
      board[y][x] = 5;
    }
    if (direction === 'down') {
      board[y][x] = 3;
      y = y + 1;
      board[y][x] = 5;
    }
    player.x = x;
    player.y = y;
    /*  if (collisionVal == 2) {
    appState.player.score += 10;
  } */
    console.log('appstate board' + board);
    //this.setState({ appState: appState });
  }
  return { board, player };
}

export default function pacmanApp(state = initialState, action) {
  console.log('switch type', action.type, state);
  switch (action.type) {
    case POP_GAMEBOARD:
      return { ...state, board: [...action.gameboardlist] };
    case KEY_EVENTDIRECTION:
      console.log(action.text.keyCode);
      const direction = get_direction(action.text.keyCode);
      const initState = {
        ...state,
        player: {
          ...state.player,
          direction,
        },
      };
      return Player(initState.player, initState.board);
    default:
      return state;
  }
}
