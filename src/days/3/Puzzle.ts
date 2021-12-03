import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): number {
    const diagnosticLength = this.input[0].length;

    const sums = new Array(diagnosticLength).fill(0);
    this.input.forEach((diagnostic) => {
      for (let i = 0; i < diagnostic.length; i++) {
        sums[i] += Number.parseInt(diagnostic[i]);
      }
    });
    const averages = sums.map((sum) => sum / this.input.length);
    const gammaRate = Number.parseInt(
      averages.map((avg) => (avg > 0.5 ? 1 : 0)).join(''),
      2
    );
    const epsilonRate = Number.parseInt(
      averages.map((avg) => (avg <= 0.5 ? 1 : 0)).join(''),
      2
    );
    return gammaRate * epsilonRate;
  }

  public getFirstExpectedResult(): number {
    return 198;
  }

  public solveSecond(): number {
    let index = 0;
    let remainingMostCommon = this.getFilteredList(this.input, index, false);
    while (remainingMostCommon.length > 1) {
      index++;
      remainingMostCommon = this.getFilteredList(
        remainingMostCommon,
        index,
        false
      );
    }
    const oxygenGeneratorRating = Number.parseInt(remainingMostCommon[0], 2);

    index = 0;
    let remainingLeastCommon = this.getFilteredList(this.input, index, true);
    while (remainingLeastCommon.length > 1) {
      index++;
      remainingLeastCommon = this.getFilteredList(
        remainingLeastCommon,
        index,
        true
      );
    }
    const co2ScrubberRating = Number.parseInt(remainingLeastCommon[0], 2);

    return oxygenGeneratorRating * co2ScrubberRating;
  }

  private getFilteredList(
    list: string[],
    index: number,
    useLeastCommon: boolean
  ) {
    let sum = 0;
    list.forEach((diagnostic) => {
      sum += Number.parseInt(diagnostic[index]);
    });
    const avg = sum / list.length;
    let mostCommon: number;
    if (avg === 0.5) {
      mostCommon = 1;
    } else {
      mostCommon = avg > 0.5 ? 1 : 0;
    }
    if (useLeastCommon) {
      mostCommon = mostCommon === 1 ? 0 : 1;
    }
    return list.filter(
      (diagnostic) => Number.parseInt(diagnostic[index]) === mostCommon
    );
  }

  public getSecondExpectedResult(): number {
    return 230;
  }
}
