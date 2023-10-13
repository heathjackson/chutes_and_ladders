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
  #Special = null
  #Players = []

  constructor(value, type) {
    this.#Value = value
    this.#Type = type
  }


  /**
   * Is a method to be invoked when an avatar lands (or stops) on a space.
   * @param avatar
  **/
 
  land(avatar) {
    /*
    alllow only one player on a space, 
    if someone is already on the space, push that person to the next space
    #Players array keeps track if someone is already on the space
    */

    if(this.occupied && this.#Type !== SpaceType.START) {
      for(let i = 0; i < this.#Players.length; i++) {
        this.#Players[i].move(1)
      } 
    }

    if(this.#Type === SpaceType.FINISH) {
      console.log(`${avatar.name} is the Winner Winner Chicken Dinner!`)
    }

    if(this.#Special !== null) {
      avatar.location = this.#Special
    }



    else{
      avatar.location = this
    }

    this.#Players.push(avatar)
}

  /**
   * Is a method to be invoked when an avatar leaves a space
   */
  leave() {
    this.#Players.pop()
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
    return [...this.#Players]
  }

  /**
   * @return boolean true if the space has players, false otherwise
   */

  get occupied() {
    return this.#Players.length > 0
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

let Jane = new Avatar('Car', 'blue')
let Heather = new Avatar('Hat', 'red')
let roll = new Die(4)


let start_1 = new Space(1, SpaceType.START)
let normal_2 = new Space(2, SpaceType.NORMAL)
let normal_3 = new Space(3, SpaceType.NORMAL)
let ladder_4 = new Space(4, SpaceType.LADDER)
let chute_5 = new Space(5, SpaceType.CHUTE)
let normal_6 = new Space(6, SpaceType.NORMAL)
let finish_7 = new Space(7, SpaceType.FINISH)

start_1.next = normal_2
normal_2.next = normal_3
normal_3.next = ladder_4 
ladder_4.next = chute_5
ladder_4.special = normal_6 
chute_5.next = normal_6
chute_5.special = normal_2
normal_6.next = finish_7 
finish_7.next = finish_7



start_1.land(Heather)
start_1.land(Jane)
Heather.move(roll.sumOfRollsAndNumOfDice(2, 1))
Jane.move(3)
Heather.move(2)
console.log(`Jane Location = ${Jane.location.value} ${Jane.location.type}`)
console.log(`Heather Location = ${Heather.location.value} ${Heather.location.type}`)










