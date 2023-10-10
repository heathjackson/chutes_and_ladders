// Copyright 2023 Ryan McGuinness
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * The Die class represents the idea of a single dice (die) that may have four or more sides.
 */

import { SummedRoll } from "./summed_roll.js";

const minSides = 4;

export class Die {
  #Sides;

  constructor(sides) {
    this.#Sides = (sides >= minSides) ? sides : console.log("sides must be greater than or equal to 4");
  }

  // Should return a number of sides
  get sides() {
    return this.#Sides;
  }

  // Should return a random number between one and the total sides
  roll() {
    return Math.floor(Math.random() * this.#Sides) + 1;
  }

  sumOfRolls(numberOfRolls) {
    const array = [];
    for (let i = 0; i < numberOfRolls; i++) {
        array.push(this.roll());
    }
    
    const summedRolls = new SummedRoll(array);
    console.log(summedRolls.numbers);
    console.log(summedRolls.sum);

    return summedRolls.sum; 
  }

  sumOfRollsAndNumberOfDice(numberOfRolls, numberOfDice) {
    const array = [];
    for (let i = 0; i < numberOfDice; i++) {
      array.push(this.sumOfRolls(numberOfRolls));
    }

    const summedRolls = new SummedRoll(array);
    console.log(summedRolls.numbers);

    return (summedRolls.sum);
  }


}

const D6 = new Die(6);


console.log(D6.sumOfRollsAndNumberOfDice(3, 2));


