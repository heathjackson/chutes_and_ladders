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
 * The SummedRoll class represents a way to keep track of the sum of multiple rolls.
 * Player 1 rolls a single dice 3 times and gets the values { [3,1,5], 9 }
 * Player 2 rolls a single dice 3 times and gets the values { [6, 3, 3], 12 }
 */

export class SummedRoll {
  #Sum = -1;
  #Numbers = Array(0);

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