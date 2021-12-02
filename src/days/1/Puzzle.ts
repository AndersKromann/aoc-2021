import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): number {
    let increasedCount = 0;
    let last = 0;
    this.input.map(line => Number.parseInt(line)).forEach(measurement => {
      if (last === 0) {
        last = measurement;
        return;
      }
      if (measurement > last) {
        increasedCount++;
      }
      last = measurement;
    })
    return increasedCount;
  }
  public solveSecond(): number {
    const measurements = this.input.map(line => Number.parseInt(line));
    let increasedCount = 0;
    let last = 0;
    for (let i = 0; i < (measurements.length - 2); i++) {
      const slidingSum = measurements.slice(i, i + 3).reduce((partial_sum, curr) => partial_sum + curr, 0);
      if (last === 0) {
        last = slidingSum;
        continue;
      }
      if (slidingSum > last) {
        increasedCount++;
      }
      last = slidingSum;
    }
    return increasedCount;
  }

  public getFirstExpectedResult(): number {
    return 7;
  }
  public getSecondExpectedResult(): number {
    return 5;
  }
}
