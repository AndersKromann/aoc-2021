import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): number {
    const fish = [...this.input[0].split(',')].map((str) =>
      Number.parseInt(str)
    );

    let day = 0;
    while (day < 80) {
      const newFishToday: number[] = [];
      fish.forEach((f, i) => {
        if (f === 0) {
          newFishToday.push(8);
          fish[i] = 6;
        } else {
          fish[i] = f - 1;
        }
      });
      fish.push(...newFishToday);
      day++;
    }

    return fish.length;
  }

  public getFirstExpectedResult(): number {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 5934;
  }

  public solveSecond(): number {
    const fishCounter: number[] = new Array(9).fill(0);
    const initialFish = [...this.input[0].split(',')].map((str) =>
      Number.parseInt(str)
    );
    initialFish.forEach((fish) => {
      fishCounter[fish] = fishCounter[fish] + 1;
    });

    let day = 0;
    while (day < 256) {
      const newFishCount = fishCounter[0];
      for (let i = 1; i < fishCounter.length; i++) {
        fishCounter[i - 1] = fishCounter[i];
      }
      fishCounter[6] = fishCounter[6] + newFishCount;
      fishCounter[8] = newFishCount;
      day++;
    }

    return fishCounter.reduce((count, curr) => count + curr, 0);
  }

  public getSecondExpectedResult(): number {
    return 26984457539;
  }
}
