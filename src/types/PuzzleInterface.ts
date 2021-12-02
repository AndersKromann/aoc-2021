export interface PuzzleInterface {
  solveFirst: () => number;
  solveSecond: () => number;
  getFirstExpectedResult: () => number;
  getSecondExpectedResult: () => number;
}
