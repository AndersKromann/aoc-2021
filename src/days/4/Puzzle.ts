import Puzzle from '../../types/AbstractPuzzle';

interface BingoNumber {
  value: number;
  marked: boolean;
}

class BingoCard {
  cardsByNum = new Map<number, BingoNumber>();

  rows: BingoNumber[][] = [[], [], [], [], []];
  columns: BingoNumber[][] = [[], [], [], [], []];

  constructor(cardNumbers: string[][]) {
    cardNumbers.forEach((row, i) => {
      row.forEach((num, j) => {
        const bingoNum: BingoNumber = { value: Number.parseInt(num), marked: false }
        this.cardsByNum.set(bingoNum.value, bingoNum)
        this.rows[i][j] = bingoNum;
        this.columns[j][i] = bingoNum;
      })
    })
  }

  markNumber(number: number) {
    const numberToMark = this.cardsByNum.get(number);
    if (numberToMark) {
      numberToMark.marked = true;
    }
  }

  hasBingo(): boolean {
    return this.rows.some(row => row.every(num => num.marked)) || this.columns.some(col => col.every(num => num.marked));
  }

  getUnmarkedSum(): number {
    let sum = 0;
    this.rows.forEach(row => row.forEach(num => {
      if (!num.marked) {
        sum += num.value
      }
    }))
    return sum;
  }
}

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): number {
    const inputCopy = [...this.input];
    const bingoNumbers: number[] = inputCopy.shift().split(',').map(num => Number.parseInt(num));

    const bingoCards: BingoCard[] = this.createBingoCards(inputCopy)

    let lastCalled: number;
    while (bingoNumbers && !bingoCards.some(card => card.hasBingo())) {
      lastCalled = bingoNumbers.shift();
      bingoCards.forEach(card => card.markNumber(lastCalled));
    }
    const cardWithBingo = bingoCards.find(card => card.hasBingo());

    return cardWithBingo.getUnmarkedSum() * lastCalled;
  }

  public getFirstExpectedResult(): number {
    return 4512;
  }

  public solveSecond(): number {
    const inputCopy = [...this.input];
    const bingoNumbers: number[] = inputCopy.shift().split(',').map(num => Number.parseInt(num));

    const bingoCards: BingoCard[] = this.createBingoCards(inputCopy);

    let lastCalled: number;
    let cardsWithoutBingo = [...bingoCards];
    while (bingoNumbers && !bingoCards.every(card => card.hasBingo())) {
      lastCalled = bingoNumbers.shift();
      bingoCards.forEach(card => card.markNumber(lastCalled));
      if (cardsWithoutBingo.length > 1) {
        cardsWithoutBingo = bingoCards.filter(card => !card.hasBingo());
      }
    }
    const lastCardToBingo = cardsWithoutBingo[0];

    return lastCardToBingo.getUnmarkedSum() * lastCalled;
  }

  public getSecondExpectedResult(): number {
    return 1924;
  }

  private createBingoCards(input: string[]): BingoCard[] {
    const bingoCards: BingoCard[] = [];

    while (input.length) {
      const numbers = input.splice(0, 5).map(row => row.split(' ').filter(num => !!num));
      const bingoCard = new BingoCard(numbers);
      bingoCards.push(bingoCard);
    }

    return bingoCards
  }
}
