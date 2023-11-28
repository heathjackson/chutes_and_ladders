import { SpaceType } from "./space.js";

export class Board {
  start;
  finish;
  total_spaces_array = [];
  constructor(specialArray, totalSpaces, spaceMaker) {
    this.spaceMaker = spaceMaker;
    this.specialArray = specialArray;
    this.totalSpaces = totalSpaces;
    this.connectSpaces();
  }

  createAllSpaces = () => {
    for (let i = 1; i <= this.totalSpaces; i++) {
      if (i === 1) {
        this.total_spaces_array.push(this.spaceMaker(i, SpaceType.START));
      } else if (i === this.totalSpaces) {
        this.finish = this.spaceMaker(i, SpaceType.FINISH);
        this.total_spaces_array.push(this.finish);
      } else {
        let found = this.specialArray.find((e) => e.value === i);
        found
          ? this.total_spaces_array.push(found)
          : this.total_spaces_array.push(this.spaceMaker(i, SpaceType.NORMAL));
      }
    }
    return this.total_spaces_array;
  };

  connectSpaces = () => {
    let totalArray = this.createAllSpaces();
    this.start = totalArray[0];
    let cur = this.start;

    for (let i = 1; i < totalArray.length; i++) {
      let nextSpace = totalArray[i];
      cur.next = nextSpace;
      nextSpace.back = cur;
      cur = nextSpace;
    }
  };

  print() {
    while (this.start !== null) {
      console.log(`value = ${this.start.value}, type = ${this.start.type}`);
      if (this.start.special) {
        console.log(`special = ${this.start.special.value}`);
      }
      this.start = this.start.next;
    }
  }

  clear() {
    this.start = null;
  }
}
