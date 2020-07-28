import {controls} from "../config";

export const KEY_MAP: {[s: string]: string} = {
  27: 'escape',
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};

export class Key {

  public name: string;

  public pressed = false;

  protected repeatsCount = 0;

  protected repeatTimer = 0;

  constructor(protected code: number | string) {
    this.name = KEY_MAP[code.toString()];
  }

  /**
   * Update repeat counters and check if action should be triggered
   * @returns {boolean} true if action should be triggered
   */
  trigger(): boolean {
    if (this.pressed) {
      --this.repeatTimer;
      if (this.repeatTimer <= 0) {
        this.repeatTimer = (this.repeatsCount > 0) ? controls.repeatDelay : controls.initialRepeatDelay;
        ++this.repeatsCount;
        return true;
      }
    }
    return false;
  }

  onPress() {
    this.pressed = true;
  }

  onRelease() {
    this.pressed = false;
    this.repeatsCount = 0;
    this.repeatTimer = 0;
  }
}

