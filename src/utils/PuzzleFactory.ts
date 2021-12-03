import Puzzle from '../types/AbstractPuzzle';
import readFile from './readFile';

class PuzzleFactory {
  public async getPuzzle(puzzleName: string, useTestInput = false) {
    const puzzlePath = `src/days/${puzzleName}`;
    let input = [];
    try {
      const inputFileName = useTestInput ? `test_input.txt` : 'input.txt';
      const rawInput = await readFile(`${puzzlePath}/${inputFileName}`);
      input = rawInput.split(/\r?\n/).filter((val) => !!val);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }

    const puzzleModule: { default: { new (): Puzzle } } = await import(
      `../days/${puzzleName}/Puzzle`
    );

    const { default: puzzleClass } = puzzleModule;
    const puzzle = new puzzleClass();
    await puzzle.setInput(input);
    return puzzle;
  }
}

export default new PuzzleFactory();
