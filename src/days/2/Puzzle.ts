import Puzzle from '../../types/AbstractPuzzle';

type Instruction = [direction: string, magnitude: number]

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): number {
    const instuctions: Instruction[] = this.input.map(line => line.split(' ')).map(([dir, mag]) => [dir, Number.parseInt(mag)]);
    let depth = 0;
    let horizontal = 0;
    instuctions.forEach(instr => {
      const magnitude = instr[1];
      switch (instr[0]) {
        case 'forward':
          horizontal += magnitude;
          break;
        case 'down':
          depth += magnitude;
          break;
        case 'up':
          depth -= magnitude;
          break;
      }
    })
    return depth * horizontal;
  }

  public getFirstExpectedResult(): number {
    return 150;
  }

  public solveSecond(): number {
    const instuctions: Instruction[] = this.input.map(line => line.split(' ')).map(([dir, mag]) => [dir, Number.parseInt(mag)]);
    let depth = 0;
    let horizontal = 0;
    let aim = 0;
    instuctions.forEach(instr => {
      const magnitude = instr[1];
      switch (instr[0]) {
        case 'forward':
          horizontal += magnitude;
          depth += aim * magnitude;
          break;
        case 'down':
          aim += magnitude;
          break;
        case 'up':
          aim -= magnitude;
          break;
      }
    })
    return depth * horizontal;
  }

  public getSecondExpectedResult(): number {
    return 900;
  }
}
