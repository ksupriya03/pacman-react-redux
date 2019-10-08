export const POP_GAMEBOARD = 'POP_GAMEBOARD';
export const KEY_EVENTDIRECTION = 'KEY_EVENTDIRECTION';

export function pop_Gameboard(gameboardlist) {
  console.log('gameboard' + gameboardlist);
  return { type: POP_GAMEBOARD, gameboardlist };
}
export function key_Direction(text) {
  console.log('event direction' + text);
  return { type: KEY_EVENTDIRECTION, text };
}
