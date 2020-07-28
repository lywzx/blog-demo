import PIXI = require("pixi.js");

export const App = new PIXI.Application({
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
  antialias: true,
  transparent: false, // default: false
  resolution: 1,       // default: 1
  backgroundColor: 0xffffff,
});

