import {Key, KEY_MAP} from "./key";


interface KeyboardInterface {
  space: Key;
  escape: Key;
  left: Key;
  up: Key;
  right: Key;
  down: Key;
}

export class Keyboard implements KeyboardInterface {

  public keys: {[s: string]: Key} = {};

  // @ts-ignore
  public space: Key;
  // @ts-ignore
  public down: Key;
  // @ts-ignore
  public escape: Key;
  // @ts-ignore
  public left: Key;
  // @ts-ignore
  public right: Key;
  // @ts-ignore
  public up: Key;

  constructor() {
    this.keys = {};

    Object.keys(KEY_MAP).forEach(k => {
      let key = new Key(k);
      this.keys[k] = key;
      (this as any)[key.name] = key;
    });

    window.addEventListener('keydown', (evt) => {
      let key = this.keys[evt.keyCode];
      if (key) {
        key.onPress();
      }
    });
    window.addEventListener('keyup', (evt) => {
      let key = this.keys[evt.keyCode];
      if (key) {
        key.onRelease();
      }
    });

  }


}
