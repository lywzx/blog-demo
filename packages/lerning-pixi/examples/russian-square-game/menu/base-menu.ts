import {State} from "../utils/state";
import {Game} from "../game";
import {Graphics, Text, TextStyle} from 'pixi.js';


const fancyTextStyle = new TextStyle({
  fontFamily: 'Arial',
  fontSize: 42,
  fontWeight: 'bold',
  fill: ['#FD79A8', '#34AEFC', '#FC1051'],
  stroke: '#000000',
  strokeThickness: 4,
});


const simpleTextStyle = new TextStyle({
  fontFamily: 'Arial',
  fontSize: 18,
  fill: '#FFF1E9',
  stroke: '#000000',
  strokeThickness: 4,
})

export class BaseMenu extends State {

  protected background: Graphics;

  protected titleText: Text;

  protected infoText: Text;

  protected infoVisibilityCounter: number;


  constructor(protected game: Game, titleText = 'PIXIRIS', infoText = 'Press SPACE to play') {
    super();
    this.background = new Graphics();
    this.background.beginFill(0x000000, 0.5);
    this.background.drawRect(0, 0, this.game.app.renderer.width, this.game.app.renderer.height);
    this.background.endFill();
    this.addChild(this.background);

    this.titleText = new Text(titleText, fancyTextStyle);
    this.titleText.anchor.set(0.5);
    this.titleText.x = this.game.app.view.width * 0.5;
    this.titleText.y = this.game.app.view.height * 0.2;
    this.addChild(this.titleText);

    this.infoText = new Text(infoText, simpleTextStyle);
    this.infoText.anchor.set(0.5);
    this.infoText.x = this.game.app.view.width * 0.5;
    this.infoText.y = this.game.app.view.height * 0.9;
    this.addChild(this.infoText);

    this.infoVisibilityCounter = 20;
  }

  enter(opts: object): void {
  }

  exit(opts: object): void {
  }

  update(dt: number): void {
    if (--this.infoVisibilityCounter == 0) {
      this.infoVisibilityCounter = 45;
      this.infoText.visible = !this.infoText.visible;
    }
  }

}
