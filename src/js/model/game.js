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

  verifyUniqueValue(array, value) {
    return array.indexOf(value) === -1;
  }

  verifySpan(startSpace, endSpace) {
    return Math.abs(startSpace - endSpace) < this.SPAN;
  }

  spaceMaker(startValue, type) {
    return new Space(startValue, type);
  }

  // endMin(type, start) {
  //   return type === "ladder" ? start + this.COLUMNS : 2;
  // }

  createSpecialSpace(startMin, startMax, type, total) {
    let i = 0;
    while (i < total) {
      const specialStart = randomNumber(startMin, startMax);
      const endMin = type === "ladder" ? specialStart + this.COLUMNS : 1;
      const endMax =
        type === "ladder" ? this.TOTAL - 1 : specialStart - this.COLUMNS;
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
  }

  //refactor this and create object instead
  // createChuteAndLadderSpaces() {
  //   let totalLadders = 0;

  //   while (totalLadders < this.ladders) {
  //     if (createSpecialSpace(2, this.Total - this.COLUMNS));
  //   }
  // }
  //   const specialSpacesArray = this.createTotalSpecialSpaces();
  //   const specialStartValues = new Array(0);
  //   const totalSpaces = new Array(0);
  //   specialSpacesArray.forEach((spec) => {
  //     specialStartValues.push(spec[0]);
  //   });
  //   const ladders = specialStartValues.slice(0, this.ladders);
  //   const chutes = specialStartValues.slice(this.ladders);
  //   for (let i = 1; i <= this.total; i++) {
  //     if (i === 1) {
  //       totalSpaces.push(new Space(i, SpaceType.START));
  //     } else if (i === this.total) {
  //       totalSpaces.push(new Space(i, SpaceType.FINISH));
  //     } else if (ladders.includes(i)) {
  //       totalSpaces.push(new Space(i, SpaceType.LADDER));
  //     } else if (chutes.includes(i)) {
  //       totalSpaces.push(new Space(i, SpaceType.CHUTE));
  //     } else {
  //       totalSpaces.push(new Space(i, SpaceType.NORMAL));
  //     }
  //   }
  //   specialSpacesArray.forEach((space) => {
  //     let startSpace = null;
  //     let endSpace = null;
  //     totalSpaces.forEach((ss) => {
  //       if (ss.value === space[0]) startSpace = ss;
  //       if (ss.value === space[1]) endSpace = ss;
  //     });
  //     startSpace.special = endSpace;
  //   });
  //   return totalSpaces;
  // }
}
let newBoard = new Game(4, 0);
// let spaces = newBoard.createBoardSpaces();
// spaces.forEach((sp) => {
//   console.log(`value = ${sp.value} type = ${sp.type}`);
//   if (sp.special !== null) {
//     console.log(`special = ${sp.special.value}`);
//   }
// });
newBoard.createSpecialSpace(
  2,
  newBoard.TOTAL - newBoard.COLUMNS,
  "ladder",
  newBoard.ladders
);

console.log(newBoard.SPECIAL_ARRAY, newBoard.UNIQUE_VALUES);
