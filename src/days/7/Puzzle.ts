import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): number {
    const crabPositions = [...this.input][0]
      .split(',')
      .map((str) => Number.parseInt(str))
      .sort();

    const median = crabPositions[crabPositions.length / 2];

    return this.findOptimalPosition(
      crabPositions,
      median,
      this.getSimpleFuelSum
    );
  }

  findOptimalPosition(
    crabPositions: number[],
    startingPosition: number,
    fuelFunction: (crabPos: number[], alignPos: number) => number
  ): number {
    const medianSum = fuelFunction(crabPositions, startingPosition);
    const oneUp = fuelFunction(crabPositions, startingPosition + 1);
    const oneDown = fuelFunction(crabPositions, startingPosition - 1);
    if (oneUp > medianSum && oneDown > medianSum) {
      return medianSum;
    }
    const goingUp = oneUp < oneDown;
    let lastSum = goingUp ? oneUp : oneDown;
    let i = goingUp ? startingPosition + 1 : startingPosition - 1;
    while (
      i < crabPositions[crabPositions.length - 1] &&
      i > crabPositions[0]
    ) {
      const nextSum = fuelFunction(crabPositions, i);
      if (nextSum > lastSum) {
        return lastSum;
      }
      lastSum = nextSum;
      if (goingUp) {
        i++;
      } else {
        i--;
      }
    }
  }

  getSimpleFuelSum(crabPositions: number[], alignPos: number): number {
    return crabPositions.reduce(
      (fuelSum, curr) => fuelSum + Math.abs(curr - alignPos),
      0
    );
  }

  public getFirstExpectedResult(): number {
    return 37;
  }

  public solveSecond(): number {
    const crabPositions = [...this.input][0]
      .split(',')
      .map((str) => Number.parseInt(str))
      .sort();

    const sum = crabPositions.reduce((count, curr) => count + curr, 0);
    const average = Math.round(sum / crabPositions.length);

    return this.findOptimalPosition(
      crabPositions,
      average,
      this.getAdvancedFuelSum
    );
  }

  getAdvancedFuelSum(crabPositions: number[], alignPos: number): number {
    return crabPositions.reduce((fuelSum, curr) => {
      const distance = Math.abs(curr - alignPos);
      return fuelSum + (distance * (distance + 1)) / 2;
    }, 0);
  }

  public getSecondExpectedResult(): number {
    return 168;
  }
}
