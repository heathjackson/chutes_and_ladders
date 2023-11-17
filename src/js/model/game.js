import { Space, SpaceType } from "./space.js";
import { randomNumber } from "./utils.js";

export class Game {
  SPAN = 45;
  constructor(columns, rows, ladders, chutes) {
    this.columns = columns;
    this.rows = rows;
    this.ladders = ladders;
    this.chutes = chutes;
    this.total = this.columns * this.rows;
  }

  verifyUniqueValue(startSpace, endSpace, specialArray) {
    let specialValues = new Array(0);
    specialArray.forEach((array) => {
      array.forEach((arr) => {
        specialValues.push(arr);
      });
    });

    return (
      !specialValues.includes(startSpace) && !specialValues.includes(endSpace)
    );
  }

  verifySpan(startSpace, endSpace) {
    return Math.abs(startSpace - endSpace) < this.SPAN;
  }

  boardValidator(startSpace, endSpace, specialArray) {
    return (
      this.verifyUniqueValue(startSpace, endSpace, specialArray) &&
      this.verifySpan(startSpace, endSpace)
    );
  }

  createLadders() {
    let totalLadders = new Array(0);
    for (let i = 0; i < this.ladders; i++) {
      let ladderStart = randomNumber(2, this.total - this.columns);
      let ladderEnd = randomNumber(ladderStart + this.columns, this.total - 1);
      if (this.boardValidator(ladderStart, ladderEnd, totalLadders)) {
        totalLadders.push([ladderStart, ladderEnd]);
      } else {
        i--;
      }
    }
    return totalLadders;
  }

  createTotalSpecialSpaces() {
    let totalSpecialSpaces = this.createLadders();
    for (let i = 0; i < this.chutes; i++) {
      let chuteStart = randomNumber(this.columns + 1, this.total - 1);
      let chuteEnd = randomNumber(2, chuteStart - this.columns);
      if (this.boardValidator(chuteStart, chuteEnd, totalSpecialSpaces)) {
        totalSpecialSpaces.push([chuteStart, chuteEnd]);
      } else {
        i--;
      }
    }
    return totalSpecialSpaces;
  }

  createBoardSpaces() {
    const specialSpacesArray = this.createTotalSpecialSpaces();
    const specialStartValues = new Array(0);
    const totalSpaces = new Array(0);

    specialSpacesArray.forEach((spec) => {
      specialStartValues.push(spec[0]);
    });

    const ladders = specialStartValues.slice(0, this.ladders);
    const chutes = specialStartValues.slice(this.ladders);

    for (let i = 1; i <= this.total; i++) {
      if (i === 1) {
        totalSpaces.push(new Space(i, SpaceType.START));
      } else if (i === this.total) {
        totalSpaces.push(new Space(i, SpaceType.FINISH));
      } else if (ladders.includes(i)) {
        totalSpaces.push(new Space(i, SpaceType.LADDER));
      } else if (chutes.includes(i)) {
        totalSpaces.push(new Space(i, SpaceType.CHUTE));
      } else {
        totalSpaces.push(new Space(i, SpaceType.NORMAL));
      }
    }

    specialSpacesArray.forEach((space) => {
      let startSpace = null;
      let endSpace = null;

      totalSpaces.forEach((ss) => {
        if (ss.value === space[0]) {
          startSpace = ss;
        }
        if (ss.value === space[1]) {
          endSpace = ss;
        }
      });
      startSpace.special = endSpace;
    });

    return totalSpaces;
  }
}
