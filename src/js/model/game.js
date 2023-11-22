import { Space, SpaceType } from "./space.js";
import { randomNumber } from "./utils.js";

export class Game {
  SPAN = 10;
  COLUMNS = 5;
  ROWS = 5;
  TOTAL = 25;
  SPECIAL_ARRAY = [];
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

  spaceMaker(startValue, type) {
    return new Space(startValue, type);
  }

  createSpecialSpace(specialTotal, startMin, startMax, endMin, endMax) {
    let specialSpaces = {};
    for (let i = 0; i < specialTotal; i++) {
      let specialStart = randomNumber(startMin, startMax);
      let specialEnd = randomNumber(endMin, endMax);
      if (
        this.verifyUniqueValue(specialStart, specialEnd, specialTotal) &&
        this.verifySpan(specialStart, specialEnd)
      ) {
        {
          specialSpaces[specialStart] = specialEnd;
        }
      } else {
        i--;
      }
    }
    this.SPECIAL_ARRAY.push(specialSpaces);
  }

  //refactor this and create object instead
  createBoardSpaces() {
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
