import Puzzle from '../../types/AbstractPuzzle';

type Direction = 'up' | 'down' | 'right' | 'left';

class Location {
  private i: number;
  private j: number;
  private neighbors: {
    up?: number;
    right?: number;
    down?: number;
    left?: number;
  } = {};
  constructor(public height: number) {}

  isLowPoint(): boolean {
    return Object.values(this.neighbors).reduce(
      (isLowPoint: boolean, curr) => isLowPoint && curr > this.height,
      true
    );
  }

  setPosition(i: number, j: number) {
    this.i = i;
    this.j = j;
  }

  setNeighbor(pos: Direction, height: number) {
    this.neighbors[pos] = height;
  }

  getNeighbor(pos: Direction): number | undefined {
    return this.neighbors[pos];
  }
}

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): number {
    const map: number[][] = [...this.input].map((line) =>
      line.split('').map((height) => Number.parseInt(height))
    );
    const locations: Location[] = [];
    for (let i = 0; i < map.length; i++) {
      const row = map[i];
      for (let j = 0; j < row.length; j++) {
        const height = row[j];
        const location = new Location(height);
        if (i > 0) {
          location.setNeighbor('up', map[i - 1][j]);
        }
        if (i + 1 < map.length) {
          location.setNeighbor('down', map[i + 1][j]);
        }
        if (j > 0) {
          location.setNeighbor('left', row[j - 1]);
        }
        if (j + 1 < row.length) {
          location.setNeighbor('right', row[j + 1]);
        }
        locations.push(location);
      }
    }

    return locations.reduce((sum, currLoc) => {
      return currLoc.isLowPoint() ? sum + currLoc.height + 1 : sum;
    }, 0);
  }

  public getFirstExpectedResult(): number {
    return 15;
  }

  public solveSecond(): number {
    const map: number[][] = [...this.input].map((line) =>
      line.split('').map((height) => Number.parseInt(height))
    );

    const locations: Location[] = [];
    for (let i = 0; i < map.length; i++) {
      const row = map[i];
      for (let j = 0; j < row.length; j++) {
        const height = row[j];
        const location = new Location(height);
        if (i > 0) {
          location.setNeighbor('up', map[i - 1][j]);
        }
        if (i + 1 < map.length) {
          location.setNeighbor('down', map[i + 1][j]);
        }
        if (j > 0) {
          location.setNeighbor('left', row[j - 1]);
        }
        if (j + 1 < row.length) {
          location.setNeighbor('right', row[j + 1]);
        }
        location.setPosition(i, j);
        locations.push(location);
      }
    }

    const lowPoints = locations.filter((loc) => loc.isLowPoint());

    console.log(locations);

    return 0;
  }

  public getSecondExpectedResult(): number {
    return 1134;
  }
}
