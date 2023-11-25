import { Space, SpaceType } from "./space.js";
import { randomNumber } from "./utils.js";

export class Game {
  SPAN = 15;
  COLUMNS = 5;
  ROWS = 5;
  TOTAL = 25;
  SPECIAL_ARRAY = [];
  UNIQUE_VALUES = [];

  constructor(ladders, chutes) {
    this.ladders = ladders;
    this.chutes = chutes;
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
    return type === "ladder" ? start + this.COLUMNS : 2;
  };

  endMax = (type, start) => {
    return type === "ladder" ? this.TOTAL - 1 : start - this.COLUMNS;
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
    const ladders = this.createSpecialSpaces(
      2,
      this.TOTAL - this.COLUMNS,
      "ladder",
      this.ladders
    );

    const chutes = this.createSpecialSpaces(
      this.COLUMNS + 1,
      this.TOTAL - 1,
      "chute",
      this.chutes
    );

    return ladders, chutes;
  };
}
// let newBoard = new Game(4, 4);
// newBoard.createChutesAndLadders();
// console.log(newBoard.SPECIAL_ARRAY, newBoard.UNIQUE_VALUES);
