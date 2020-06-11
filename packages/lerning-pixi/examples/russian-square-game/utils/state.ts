import {Container} from 'pixi.js';
export abstract class State extends Container{
  protected constructor() {
    super();

    this.visible = false;
  }

  /**
   * action on state enter
   * @param {Object} opts additional options passed on state change
   */
  abstract enter(opts: object): void;

  /**
   * action on state exit
   * @param {Object} opts additional options passed on state change
   */
  abstract exit(opts: object): void;

  /**
   * action on state update (game loop)
   * @param {Number} dt PIXI timer deltaTime
   */
  abstract update(dt: number): void;
}
