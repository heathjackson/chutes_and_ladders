import { Space, SpaceType } from "./space.js";
import { randomNumber } from "./utils.js";
import { Board } from "./board.js";

export class Game {
  START = 1;
  FINISH = 25;
  SPAN = 15;
  COLUMNS = 5;
  ROWS = 5;
  SPECIAL_ARRAY = [];
  UNIQUE_VALUES = [];

  constructor(ladders, chutes) {
    this.ladders = ladders;
    this.chutes = chutes;
    this.board = new Board(this.SPECIAL_ARRAY, this.FINISH, this.spaceMaker);
  }

  verifyUniqueValue = (array, value) => {
    return array.indexOf(value) === -1;
  };

  verifySpan = (startSpace, endSpace) => {
    return Math.abs(startSpace - endSpace) < this.SPAN;
  };

  spaceMaker = (startValue, type) => {
    return new Space(startValue, type);
  };

  endMin = (type, start) => {
    return type === SpaceType.LADDER ? start + this.COLUMNS : 2;
  };

  endMax = (type, start) => {
    return type === SpaceType.LADDER ? this.FINISH - 1 : start - this.COLUMNS;
  };

  createSpecialSpaces = (startMin, startMax, type, total) => {
    let i = 0;
    while (i < total) {
      const specialStart = randomNumber(startMin, startMax);
      const endMin = this.endMin(type, specialStart);
      const endMax = this.endMax(type, specialStart);
      const specialEnd = randomNumber(endMin, endMax);

      if (
        this.verifySpan(specialStart, specialEnd) &&
        this.verifyUniqueValue(this.UNIQUE_VALUES, specialStart) &&
        this.verifyUniqueValue(this.UNIQUE_VALUES, specialEnd)
      ) {
        const specialS = this.spaceMaker(specialStart, type);
        const specialE = this.spaceMaker(specialEnd, SpaceType.NORMAL);
        specialS.special = specialE;
        this.SPECIAL_ARRAY.push(specialS, specialE);
        this.UNIQUE_VALUES.push(specialStart, specialEnd);
        i++;
      } else {
        continue;
      }
    }
  };

  createChutesAndLadders = () => {
    this.SPECIAL_ARRAY.push(
      this.spaceMaker(this.START, SpaceType.START),
      this.spaceMaker(this.FINISH, SpaceType.FINISH)
    );

    this.createSpecialSpaces(
      2,
      this.FINISH - this.COLUMNS,
      SpaceType.LADDER,
      this.ladders
    );

    this.createSpecialSpaces(
      this.COLUMNS + 1,
      this.FINISH - 1,
      SpaceType.CHUTE,
      this.chutes
    );
  };
}

let game = new Game(2, 2);
game.createChutesAndLadders();
game.board.createAllSpaces();
game.board.connectSpaces();
game.board.print();
