import { Space, SpaceType } from "./space.js";
import { randomNumber } from "./utils.js";

export class Game {
  // spacesArray = new Array(0);

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

  correctStartLoc(startSpace, type) {
    if (type === "ladder") {
      return startSpace < this.total - this.columns && startSpace > 1;
    } else {
      return startSpace > this.columns && startSpace < this.total;
    }
  }

  correctEndLoc(startSpace, endSpace, type) {
    if (type === "ladder") {
      return (
        endSpace > startSpace + this.columns &&
        endSpace < startSpace + 15 &&
        endSpace < this.total
      );
    } else {
      return (
        endSpace < startSpace - this.columns &&
        endSpace > startSpace - 15 &&
        endSpace > 1
      );
    }
  }

  boardValidator(startSpace, endSpace, specialArray, type) {
    return (
      this.verifyUniqueValue(startSpace, endSpace, specialArray) &&
      this.correctStartLoc(startSpace, type) &&
      this.correctEndLoc(startSpace, endSpace, type)
    );
  }

  createLadders() {
    let totalLadders = new Array(0);
    for (let i = 0; i < this.ladders; i++) {
      let ladderStart = randomNumber(0, this.total);
      let ladderEnd = randomNumber(0, this.total);
      if (this.boardValidator(ladderStart, ladderEnd, totalLadders, "ladder")) {
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
      let chuteStart = randomNumber(0, this.total);
      let chuteEnd = randomNumber(0, this.total);
      if (
        this.boardValidator(chuteStart, chuteEnd, totalSpecialSpaces, "chute")
      ) {
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
      });
      totalSpaces.forEach((se) => {
        if (se.value === space[1]) {
          endSpace = se;
        }
      });
      startSpace.special = endSpace;
    });

    return totalSpaces;
  }
}
