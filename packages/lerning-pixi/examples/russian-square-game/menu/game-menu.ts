import {Game} from "../game";
import {BaseMenu} from "./base-menu";

export class GameMenu extends BaseMenu {
  constructor(protected game: Game) {
    super(game);
  }

  enter(opts: object): void {
  }

  exit(opts: object): void {
  }

  update(dt: number): void {
    super.update(dt);

    if (this.game.key.space.trigger()) {
      this.game.setState('play', {restart: true});
    }
  }
}
