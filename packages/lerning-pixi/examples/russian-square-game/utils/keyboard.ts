import {Key, KEY_MAP} from "./key";


interface KeyboardInterface {
  space: Key;
}

export class Keyboard implements KeyboardInterface {

  public keys: {[s: string]: Key} = {};

  // @ts-ignore
  public space: Key;


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
