import { Application } from 'pixi.js';
import {
  display
} from './config';
import {Game} from "./game";

export const App = new Application({
  width: display.width,
  height: display.height,
});

const game = new Game(App);

// load sprites and run game when done
App.loader.add('blocks', 'assets/sprites.json').load(() => game.run());

