import {Container, Sprite, Application, ITextureDictionary } from 'pixi.js';
import {Board} from './board';
import {Tetromino} from './tetromino';

export class Renderer extends Container {

  private sprites: Sprite[][] = [];

  private textures: ITextureDictionary;

  /**
   * Initialize renderer
   * @param app
   * @param {Number} rows       Number of visible rows
   * @param {Number} cols       Number of visible columns
   * @param {Number} rowsOffset Number of rows in model to skip from rendering
   * @param {Number} blockSize  Target block size
   */
  constructor(
    protected readonly app: Application,
    protected readonly rows: number,
    protected readonly cols: number,
    protected readonly rowsOffset: number,
    protected readonly blockSize: number
  ) {
    super();
    this.sprites = [];
    this.textures = this.app.loader.resources.blocks.textures as ITextureDictionary;
    for (let i = 0; i < this.rows; ++i) {
      const row = [];
      for (let j = 0; j < this.cols; ++j) {
        let spr = new Sprite(this.textures.background);
        row.push(spr);
        spr.x = j * this.blockSize;
        spr.y = i * this.blockSize;
        this.addChild(spr);
      }
      this.sprites.push(row);
    }
  }

  /**
   *
   * @param row
   * @param col
   * @param color
   */
  updateColor(row: number, col: number, color: boolean | string | number) {
    if (row < 0) return ;
    const sprite = this.sprites[row][col];
    if ((sprite as any).blockColor  !== color) {
      (sprite as any).blockColor = color;
      sprite.texture = this.textures[color as any] || this.textures.background;
    }
  }

  updateFromBoard(board: Board) {
    for (let i = 0; i < this.rows; ++i) {
      for (let j = 0; j < this.cols; ++j) {
        this.updateColor(i, j, board.get(i + this.rowsOffset, j));
      }
    }
  }

  updateFromTetromino(tetromino: Tetromino) {
    if (tetromino) {
      tetromino.absolutePos().forEach(pos => {
        this.updateColor(pos[0] - this.rowsOffset, pos[1], tetromino.color);
      });
    }
  }

}
