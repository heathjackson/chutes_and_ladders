import { Game } from "./game.js";
import { SpaceType } from "./space.js";

export class Board {
  HEAD = null;
  TOTAL_SPACES_ARRAY = [];
  constructor(specialArray, totalSpaces, spaceMaker) {
    this.specialArray = specialArray;
    this.totalSpaces = totalSpaces;
    this.spaceMaker = spaceMaker;
  }

  createAllSpaces() {
    for (let i = 1; i <= this.totalSpaces; i++) {
      this.specialArray.forEach((e) => {
        if (e.value === i) {
          this.TOTAL_SPACES_ARRAY.push(e);
        } else {
          this.spaceMaker(i, SpaceType.NORMAL);
        }
      });
    }
  }

  connectSpaces() {
    this.HEAD = this.TOTAL_SPACES_ARRAY[0];
    let prev = this.HEAD;

    for (let i = 1; i < this.TOTAL_SPACES_ARRAY.length; i++) {
      let temp = this.TOTAL_SPACES_ARRAY[i];
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

let game = new Game(4, 4, 2, 2);
game.createChutesAndLadders();
let board = new Board(game.SPECIAL_ARRAY, game.TOTAL);
