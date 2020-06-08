import PIXI = require("pixi.js");

export const App = new PIXI.Application({
  width: 256,
  height: 256,
  antialias: true,
  transparent: false, // default: false
  resolution: 1       // default: 1
});

