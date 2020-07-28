
/**
 * Keep track of recent scores
 */
export class ScoreTable {

  protected scores: ScoreInterface[];

  constructor() {
    this.scores = [];
  }

  add(lines: number, points: number) {
    this.scores.unshift({
      lines,
      points,
      date: new Date()
    });
    console.log('Newest score: ', this.scores[0]);
  }

  getNewest() {
    if (this.scores.length > 0) {
      return this.scores[0];
    }
  }
}

export interface ScoreInterface {
  lines: any;
  points: any;
  date: Date;
}
