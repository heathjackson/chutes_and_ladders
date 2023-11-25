// import { Game } from "./game.js";
import { SpaceType } from "./space.js";

export class Board {
  HEAD = null;
  TOTAL_SPACES_ARRAY = [];
  constructor(specialArray, totalSpaces, spaceMaker) {
    this.specialArray = specialArray;
    this.totalSpaces = totalSpaces;
    this.spaceMaker = spaceMaker;
    this.connectSpaces();
  }

  createAllSpaces() {
    for (let i = 1; i <= this.totalSpaces; i++) {
      let found = this.specialArray.find((e) => e.value === i);
      found
        ? this.TOTAL_SPACES_ARRAY.push(found)
        : this.TOTAL_SPACES_ARRAY.push(this.spaceMaker(i, SpaceType.NORMAL));
    }
    return this.TOTAL_SPACES_ARRAY;
  }

  connectSpaces() {
    let totalArray = this.createAllSpaces();
    this.HEAD = totalArray[0];
    let prev = this.HEAD;

    for (let i = 1; i < totalArray.length; i++) {
      let temp = totalArray[i];
      prev.next = temp;
      prev = temp;
    }
  }

  print() {
    while (this.HEAD !== null) {
      console.log(`value = ${this.HEAD.value}, type = ${this.HEAD.type}`);
      if (this.HEAD.special) {
        console.log(`special = ${this.HEAD.special.value}`);
      }
      this.HEAD = this.HEAD.next;
    }
  }

  clear() {
    this.HEAD = null;
  }
}

// let game = new Game(4, 4, 2, 2);
// game.createChutesAndLadders();
// let board = new Board(game.SPECIAL_ARRAY, game.FINISH, game.spaceMaker);
// board.createAllSpaces();
// board.connectSpaces();
// board.print();
