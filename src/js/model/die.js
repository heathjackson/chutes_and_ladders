import { error } from "console";
import { SummedRoll } from "./summed_roll.js";

const minSides = 4;

export class Die {
  #Sides;

  constructor(sides) {
    this.#Sides = sides;

    if (this.#Sides < 4)
      throw new Error("sides must be greater than or equal to 4");
  }

  // Should return a number of sides
  get sides() {
    return this.#Sides;
  }

  // returns a random number between one and the total sides
  roll() {
    return Math.floor(Math.random() * this.#Sides) + 1;
  }

  //return sum of rolls when number of rolls is indicated
  sumOfRolls(numberOfRolls) {
    let array = [];
    for (let i = 0; i < numberOfRolls; i++) {
      array.push(this.roll());
    }

    const summedRolls = new SummedRoll(array);
    return summedRolls.sum;
  }
}
