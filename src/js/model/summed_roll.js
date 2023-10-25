/**
 * The SummedRoll class represents a way to keep track of the sum of multiple rolls.
 * Player 1 rolls a single dice 3 times and gets the values { [3,1,5], 9 }
 * Player 2 rolls a single dice 3 times and gets the values { [6, 3, 3], 12 }
 */
export class SummedRoll {
  #Sum = -1;
  #Numbers = [];

  constructor(array) {
    this.#Numbers = [...array];
    this.#Sum = array.reduce((a, b) => a+ b);
  }

  // Should return an array of numbers
  get numbers() {
    return this.#Numbers;
  }
  // Should return a sum of all the roles as a number value
  get sum() {
    return this.#Sum;
  }
}