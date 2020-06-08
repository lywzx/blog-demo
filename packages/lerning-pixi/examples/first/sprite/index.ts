import PIXI = require("pixi.js");
import {App} from "../app.module";

function setup() {
  //Create the cat sprite
  let cat = new PIXI.Sprite(App.loader.resources["public/images/cat.png"].texture);

  //Add the cat to the stage
  App.stage.addChild(cat);
}

// 加载一只猫
App.loader.add("public/images/cat.png").load(setup);
