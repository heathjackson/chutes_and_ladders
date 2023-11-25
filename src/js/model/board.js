import { Game } from "./game.js";

export class Board {
  HEAD = null;
  TOTAL_SPACES_ARRAY = [];
  constructor(specialArray, totalSpaces) {
    this.specialArray = specialArray;
    this.totalSpaces = totalSpaces;
  }

  createAllSpaces() {
    for (let i = 1; i < this.totalSpaces; i++) {
      for (let j = 0; j < this.specialArray.length; j++) {
        if(this.specialArray[j].value )
      }
    }
  }

  connectSpaces() {
    this.head = this.specialArray[0];
    let prev = this.head;

    for (let i = 1; i < this.totalSpaces; i++) {
      let temp = this.specialArray[i];
      prev.next = temp;
      prev = temp;
    }
  }

  print() {
    while (this.head !== null) {
      console.log(`value = ${this.head.value}, type = ${this.head.type}`);
      if (this.head.special) {
        console.log(`special = ${this.head.special.value}`);
      }
      this.head = this.head.next;
    }
  }

  clear() {
    this.head = null;
  }
}

let chutes = new Game(4, 4, 2, 2);
let newBoard = new Board(chutes.createBoardSpaces());
newBoard.connectSpaces();
newBoard.print();
