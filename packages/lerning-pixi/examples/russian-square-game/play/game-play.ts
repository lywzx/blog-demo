import {Game} from "../game";
import {State} from "../utils/state";
import {game as gameConfig, display} from '../config/index';
import {Board} from './board';
import {Renderer} from './renderer';
import {Tetromino} from './tetromino';
import {TetronimoSpawner} from './tetronimo-spawner';

export class GamePlay extends State {

  protected board: Board | null = null;

  protected spawner: TetronimoSpawner | null = null;

  protected tetromino: Tetromino | null = null;

  protected renderer: Renderer;

  protected tetrominoFallSpeed?: number;
  protected tetrominoFallSpeedMin?: number;
  protected tetrominoFallSpeedupStep?: number;
  protected tetrominoFallSpeedupDelay?: number;
  protected tetrominoDropModifier?: number;
  protected tetrominoFallTimer?: number;
  protected tetrominoFallSpeedupTimer?: number;
  protected rowsCleared: number = 0;
  protected score: number = 0;

  constructor(protected game: Game) {
    super();
    this.renderer = new Renderer(this.game.app, gameConfig.rows, gameConfig.cols, gameConfig.hiddenRow, display.blockSize);
    this.addChild(this.renderer);
  }

  enter(opts: { restart: boolean }): void {
    if (opts.restart || this.board === null) {
      this.board = new Board(gameConfig.rows + gameConfig.hiddenRow, gameConfig.cols);
      this.spawner = new TetronimoSpawner();

      this.tetromino = null;
      this.tetrominoFallSpeed = gameConfig.fallSpeed;
      this.tetrominoFallSpeedMin = gameConfig.fallSpeedMin;
      this.tetrominoFallSpeedupStep = gameConfig.fallSpeedupStep;
      this.tetrominoFallSpeedupDelay = gameConfig.fallSpeedupDelay;
      this.tetrominoDropModifier = gameConfig.dropModifier;

      this.tetrominoFallTimer = this.tetrominoFallSpeed;
      this.tetrominoFallSpeedupTimer = this.tetrominoFallSpeedupDelay;

      this.rowsCleared = 0;
      this.score = 0;

      this.spawnTetromino();
    }
  }

  exit(opts: object): void {
  }

  update(dt: number): void {
    if (this.game.key.escape.trigger() || this.game.key.space.trigger()) {
      this.game.setState('pause', {
        keepVisible: true,
        score:{
          points: this.score as number,
          lines: this.rowsCleared as number,
        }
      });
    }

    if (this.tetromino) {
      this.updateTetromino();
    }

    this.renderer.updateFromBoard(this.board as Board);
    this.renderer.updateFromTetromino(this.tetromino as Tetromino);
  }

  /**
   * Spawn new active tetromino and test for end game condition
   */
  protected spawnTetromino() {
    if (!(this.spawner && this.board)) {
      return ;
    }
    this.tetromino = this.spawner.spawn();
    this.tetromino.row = 0;
    this.tetromino.col = this.board.cols / 2 - 2;

    if (this.board.collides(this.tetromino.absolutePos(0, 0))) {
      this.lockTetromino();
      this.gameOver();
    }
  }

  private lockTetromino() {
    if ( !(this.board && this.tetromino) ) {
      return ;
    }
    let fullRows = this.board.setAll(this.tetromino.absolutePos(), this.tetromino.color);
    this.tetromino = null;

    if (fullRows.length > 0) {
      this.updateScore(fullRows.length);
      this.board.cleanRows(fullRows);
    }
  }

  private gameOver() {
    this.game.scores.add(this.rowsCleared as number, this.score as number);
    this.game.setState('gameover', {keepVisible: true});
  }

  private updateTetromino() {
    if (!(this.board && this.tetromino)) {
      return ;
    }
    if (this.game.key.up.trigger()) {
      if (!this.board.collides(this.tetromino.absolutePos(0, 0, true))) {
        this.tetromino.rotate();
      } else if (!this.board.collides(this.tetromino.absolutePos(0, -1, true))) {
        --this.tetromino.col;
        this.tetromino.rotate();
      } else if (!this.board.collides(this.tetromino.absolutePos(0, 1, true))) {
        ++this.tetromino.col;
        this.tetromino.rotate();
      }
    }

    if (this.game.key.left.trigger() && !this.board.collides(this.tetromino.absolutePos(0, -1))) {
      --this.tetromino.col;
    }
    if (this.game.key.right.trigger() && !this.board.collides(this.tetromino.absolutePos(0, 1))) {
      ++this.tetromino.col;
    }

    if (typeof this.tetrominoFallSpeedupTimer === 'undefined'
      || typeof this.tetrominoDropModifier === 'undefined'
      || typeof this.tetrominoFallSpeedMin === 'undefined'
      || typeof this.tetrominoFallSpeed === 'undefined'
      || typeof this.tetrominoFallSpeedupStep === 'undefined'
      || typeof this.tetrominoFallTimer === 'undefined'
    ) {
      return ;
    }
    let tickMod = this.game.key.down.pressed ? this.tetrominoDropModifier : 1;
    if ((--this.tetrominoFallSpeedupTimer) <= 0) {
      this.tetrominoFallSpeed = Math.max(this.tetrominoFallSpeedMin, this.tetrominoFallSpeed - this.tetrominoFallSpeedupStep);
      this.tetrominoFallSpeedupTimer = this.tetrominoFallSpeedupDelay;
      console.log('speed: ', this.tetrominoFallSpeed);
    }
    if ((this.tetrominoFallTimer -= tickMod) <= 0) {
      if (this.board.collides(this.tetromino.absolutePos(1, 0))) {
        this.lockTetromino();
        this.spawnTetromino();
      } else {
        ++this.tetromino.row;
        this.tetrominoFallTimer = this.tetrominoFallSpeed;
      }
    }
  }

  private updateScore(rows: number) {
    this.rowsCleared += rows;
    this.score += Math.pow(2, rows - 1);
  }
}
