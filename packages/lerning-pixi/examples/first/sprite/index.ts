import PIXI = require("pixi.js");
import {App} from "../app.module";

function setup() {
  //Create the cat sprite
  let cat = new PIXI.Sprite(App.loader.resources["public/images/cat.png"].texture);

  cat.x = 1;
  //Add the cat to the stage
  App.stage.addChild(cat);

  let rate = 1;
  App.ticker.add((time: number) => {
    if (cat.x >= 180) {
      rate = -1 - time;
    } else if (cat.x <= 0) {
      rate = 1 + time;
    }
    cat.x += rate;
  })
}

// 加载一只猫
App.loader.add("public/images/cat.png").load(setup);
