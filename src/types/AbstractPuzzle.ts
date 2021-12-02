import { PuzzleInterface } from './PuzzleInterface';

export default abstract class Puzzle implements PuzzleInterface {
  protected input: string[];

  public async setInput(input: string[]) {
    this.input = input;
  }

  public abstract solveFirst(): number;
  public abstract getFirstExpectedResult(): number;
  public abstract solveSecond(): number;
  public abstract getSecondExpectedResult(): number;
}
