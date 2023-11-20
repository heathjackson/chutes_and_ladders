import { Space, SpaceType } from "./space.js";
import { randomNumber } from "./utils.js";

export class Game {
  SPAN = 10;
  COLUMNS = 5;
  ROWS = 5;
  TOTAL = 25;
  constructor(ladders, chutes) {
    this.ladders = ladders;
    this.chutes = chutes;
  }

  verifyUniqueValue(startSpace, endSpace, specials) {
    let isUnique = true;
    if (
      endSpace in specials ||
      startSpace in specials ||
      Object.values(specials).includes(endSpace) ||
      Object.values(specials).includes(startSpace)
    ) {
      isUnique = false;
    }
    return isUnique;
  }

  verifySpan(startSpace, endSpace) {
    return Math.abs(startSpace - endSpace) < this.SPAN;
  }

  spaceVerifier(startSpace, endSpace, specialArray) {
    return (
      this.verifyUniqueValue(startSpace, endSpace, specialArray) &&
      this.verifySpan(startSpace, endSpace)
    );
  }

  createLadders() {
    let totalLadders = {};
    for (let i = 0; i < this.ladders; i++) {
      let ladderStart = randomNumber(2, this.TOTAL - this.COLUMNS);
      let ladderEnd = randomNumber(ladderStart + this.COLUMNS, this.TOTAL - 1);
      if (this.spaceVerifier(ladderStart, ladderEnd, totalLadders)) {
        {
          totalLadders[ladderStart] = ladderEnd;
        }
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
      if (this.spaceVerifier(chuteStart, chuteEnd, totalSpecialSpaces)) {
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
        if (ss.value === space[0]) startSpace = ss;
        if (ss.value === space[1]) endSpace = ss;
      });
      startSpace.special = endSpace;
    });

    return totalSpaces;
  }
}

let newBoard = new Game(4, 0);
// let spaces = newBoard.createBoardSpaces();
// spaces.forEach((sp) => {
//   console.log(`value = ${sp.value} type = ${sp.type}`);
//   if (sp.special !== null) {
//     console.log(`special = ${sp.special.value}`);
//   }
// });
newBoard.createLadders();
