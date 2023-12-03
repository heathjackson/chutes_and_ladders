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

export class SpaceType {
  static START = 0;
  static NORMAL = 1;
  static CHUTE = 2;
  static LADDER = 3;
  static FINISH = 4;
}

Object.freeze(SpaceType);

export class Space {
  #Value = "";
  #Type = SpaceType.NORMAL;
  #Next = null;
  #Back = null;
  #Special = null;
  #Avatars = [];

  constructor(value, type) {
    this.#Value = value;
    this.#Type = type;
  }

  /**
   * Is a method to be invoked when an avatar leaves a space
   */
  leave() {
    this.#Avatars.pop();
  }

  /**
   *
   * @return {string}
   */
  get value() {
    return this.#Value;
  }

  /**
   *
   * @return {number}
   */
  get type() {
    return this.#Type;
  }

  /**
   *
   * @return {Space | null}
   */
  get next() {
    return this.#Next;
  }

  /**
   *
   * @param location {Space}
   * @return {Space} the current space
   */
  set next(space) {
    this.#Next = space;
  }

  get back() {
    return this.#Back;
  }

  set back(space) {
    this.#Back = space;
  }

  /**
   *
   * @return {Space | null}
   */
  get special() {
    return this.#Special;
  }

  /**
   *
   * @param location
   * @return {Space} the current space
   */
  set special(space) {
    this.#Special = space;
  }

  /**
   *
   * @return {*[]} a copy of the array of players
   */
  get avatars() {
    // returns a copy of the players
    return [...this.#Avatars];
  }
  /**
   * @return boolean true if the space has players, false otherwise
   */

  occupied() {
    return this.#Avatars.length > 0;
  }

  /**
   * Is a method to be invoked when an avatar lands (or stops) on a space.
   * @param avatar
   **/

  land(avatar) {
    if (
      this.occupied() &&
      this.#Type !== SpaceType.START &&
      this.#Type !== SpaceType.FINISH
    ) {
      this.#Avatars[0].move(1);
      this.leave();
    } else if (this.#Special !== null) {
      avatar.location = this.#Special;
      avatar.location.#Avatars.push(avatar);
    } else {
      avatar.location = this;
      this.#Avatars.push(avatar);
    }
  }
}
