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

import { Avatar } from "./avatar.js"
import { Die } from "./die.js"

export class SpaceType {
  static START = 0
  static NORMAL = 1
  static CHUTE = 2
  static LADDER = 3
  static FINISH = 4
}

Object.freeze(SpaceType)

export class Space {
  #Value = ""
  #Type = SpaceType.NORMAL
  #Next = null
  #Back = null
  #Special = null
  #Avatars = []

  constructor(value, type) {
    this.#Value = value
    this.#Type = type
  }

  /**
   * Is a method to be invoked when an avatar leaves a space
   */
  leave() {
    this.#Avatars.pop()
  }

  /**
   *
   * @return {string}
   */
  get value() {
    return this.#Value
  }

  /**
   *
   * @return {number}
   */
  get type() {
    return this.#Type
  }

  /**
   *
   * @return {Space | null}
   */
  get next() {
    return this.#Next
  }

  /**
   *
   * @param location {Space}
   * @return {Space} the current space
   */
  set next(space) {
    return this.#Next = space
  }

  get back() {
    return this.#Back
  }

  set back(space) {
    return this.#Back = space
  }

  /**
   *
   * @return {Space | null}
   */
  get special() {
    return this.#Special
  }

  /**
   *
   * @param location
   * @return {Space} the current space
   */
  set special(space) {
    return this.#Special = space
  }

  /**
   *
   * @return {*[]} a copy of the array of players
   */
  get avatars() {
    // returns a copy of the players
    return [...this.#Avatars]
  }
  /**
   * @return boolean true if the space has players, false otherwise
   */

  get occupied() {
    return this.#Avatars.length > 0 ? true : false
  }

   /**
   * Is a method to be invoked when an avatar lands (or stops) on a space.
   * @param avatar
  **/

  land(avatar) {
    /*
    alllow only one player on a space, 
    if someone is already on the space, push that person to the next space
    #Avatars array keeps track if someone is already on the space
    */
    if(avatar.winner) {
      return
    }

    if(this.occupied && this.#Type !== SpaceType.START) {
      this.#Avatars[0].move(1)
      this.leave()
    } 

    if(this.#Type === SpaceType.FINISH) {
        avatar.location = this
        console.log(`${avatar.name} is the Winner Winner Chicken Dinner!`)
        avatar.toggleWinner()
    }
    

    else if(this.#Special !== null) {
      avatar.location = this.#Special
    }

    else{
      avatar.location = this
      this.#Avatars.push(avatar)
    }
}

  /**
   *
   * @param validators Array<(space {Space}) => boolean> an array of functions that can validate the space.
   * @return {boolean} true if the space is valid, false otherwise.
   */
  validate(validators) {
    // TODO - Implement a method that validates the spaces state
    return false
  }
}












