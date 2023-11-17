import { Game } from "./game.js";

export class Board {
  constructor(allSpacesArray) {
    this.allSpacesArray = allSpacesArray;
    this.head = null;
  }

  connectSpaces() {
    this.head = this.allSpacesArray[0];
    let prev = this.head;

    for (let i = 1; i < this.allSpacesArray.length; i++) {
      let temp = this.allSpacesArray[i];
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
