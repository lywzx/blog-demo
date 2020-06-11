import {Game} from "../game";
import {State} from "../utils/state";

export class GamePaused extends State{
  constructor(protected game: Game) {
    super();
  }

  enter(opts: object): void {
  }

  exit(opts: object): void {
  }

  update(dt: number): void {
  }


}
