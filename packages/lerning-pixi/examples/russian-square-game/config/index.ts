
export const game = {
  cols: 10,
  rows: 20,
  hiddenRow: 2,
  // number of frames between block falls one row
  fallSpeed: 30,
  fallSpeedMin: 3,
  fallSpeedupStep: 2,
  fallSpeedupDelay: 1800,
  // block will fall this time faster when drop key pressed
  dropModifier: 10,
}

const SPACE_SIZE = 32;

export const display = {
  width: SPACE_SIZE * game.cols,
  height: SPACE_SIZE * game.rows,
  blockSize: SPACE_SIZE,
}

export const controls = {
  // controls key repeat speed
  repeatDelay: 2,
  initialRepeatDelay: 10,
}
