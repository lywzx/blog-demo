import {Application, TilingSprite} from 'pixi.js';
import {Keyboard} from "./utils/keyboard";
import {ScoreTable} from "./utils/score-table";
import {GamePlay} from "./play/game-play";
import {State} from "./utils/state";
import {GamePaused} from "./menu/game-paused";
import {GameMenu} from "./menu/game-menu";
import {GameOver} from "./menu/game-over";

export class Game {

  protected gameStates: {[s: string]: State} = {};

  protected state: State | null = null;

  public key: Keyboard;

  public scores: ScoreTable;

  constructor(public app: Application) {
    this.key = new Keyboard();
    this.scores = new ScoreTable();
  }

  /**
   * start game, execute after all assets are loaded
   */
  public run() {
    if (!(this.app.loader.resources.blocks && this.app.loader.resources.blocks.textures)) {
      return ;
    }

    const background = new TilingSprite(this.app.loader.resources.blocks.textures.background, this.app.renderer.width, this.app.renderer.height);
    this.app.stage.addChild(background);

    // define available game states
    this.addState('play', new GamePlay(this));
    this.addState('pause', new GamePaused(this))
    this.addState('menu', new GameMenu(this));
    this.addState('gameover', new GameOver(this));

    // 初始化默认状态
    this.setState('menu', {});

    // start the updates
    this.app.ticker.add(this.update, this);
  }

  /**
   *
   * @param stateName
   * @param state
   */
  protected addState(stateName: string, state: State) {
    this.gameStates[stateName] = state;
    this.app.stage.addChild(state);
  }

  /**
   *
   * @param stateName
   * @param opts
   */
  public setState(stateName: string, opts: {keepVisible?: boolean;restart?: boolean; score?: any}) {
    const oldState = this.state;

    this.state = null;

    if (oldState) {
      if (!opts.keepVisible) {
        oldState.visible = false;
      }
      oldState.exit(opts);
    }

    const newState = this.gameStates[stateName];
    newState.enter(opts);
    newState.visible = true;
    this.state = newState;
  }

  /**
   * Handle game update
   * @param {Number} dt PIXI timer deltaTime
   */
  protected update(dt: number) {
    if (this.state) {
      this.state.update(dt);
    }
  }

}
