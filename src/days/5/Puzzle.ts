import Puzzle from '../../types/AbstractPuzzle';

interface Coord {
  x: number;
  y: number;
}

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): number {
    const inputCopy = [...this.input];

    let linePoints: Coord[] = [];
    inputCopy.forEach((line) => {
      const [a, b] = line.split(' -> ').map((point) => {
        const [x, y] = point.split(',').map((num) => Number.parseInt(num));
        return { x, y };
      });
      linePoints.push(...this.getLinePoints(a, b));
    });
    const occurrencesOf = (coord: Coord, pointList: Coord[]) =>
      pointList.reduce(
        (count, curr) =>
          coord.x === curr.x && coord.y === curr.y ? count + 1 : count,
        0
      );
    let score = 0;
    linePoints.forEach((point) => {
      if (occurrencesOf(point, linePoints) >= 2) {
        score++;
        linePoints = linePoints.filter(
          (p) => !(p.x === point.x && p.y === point.y)
        );
      }
    });

    return score;
  }

  getLinePoints(a: Coord, b: Coord, allowDiagonals = false): Coord[] {
    const points: Coord[] = [];
    if (a.x === b.x) {
      const [low, high] = a.y > b.y ? [b.y, a.y] : [a.y, b.y];
      for (let i = low; i <= high; i++) {
        points.push({ x: a.x, y: i });
      }
    } else if (a.y === b.y) {
      const [low, high] = a.x > b.x ? [b.x, a.x] : [a.x, b.x];
      for (let i = low; i <= high; i++) {
        points.push({ x: i, y: a.y });
      }
    } else if (allowDiagonals) {
      const slope = (b.y - a.y) / (b.x - a.x);
      const yIntercept = a.y - slope * a.x;
      for (let i = a.x; ; a.x > b.x ? i-- : i++) {
        points.push({ x: i, y: slope * i + yIntercept });
        if (i === b.x) {
          break;
        }
      }
    }
    return points;
  }

  public getFirstExpectedResult(): number {
    return 5;
  }

  public solveSecond(): number {
    const inputCopy = [...this.input];

    let linePoints: Coord[] = [];
    inputCopy.forEach((line) => {
      const [a, b] = line.split(' -> ').map((point) => {
        const [x, y] = point.split(',').map((num) => Number.parseInt(num));
        return { x, y };
      });
      linePoints.push(...this.getLinePoints(a, b, true));
    });
    const occurrencesOf = (coord: Coord, pointList: Coord[]) =>
      pointList.reduce(
        (count, curr) =>
          coord.x === curr.x && coord.y === curr.y ? count + 1 : count,
        0
      );
    let score = 0;
    linePoints.forEach((point) => {
      if (occurrencesOf(point, linePoints) >= 2) {
        score++;
        linePoints = linePoints.filter(
          (p) => !(p.x === point.x && p.y === point.y)
        );
      }
    });

    return score;
  }

  public getSecondExpectedResult(): number {
    return 12;
  }
}
