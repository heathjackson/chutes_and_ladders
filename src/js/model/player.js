// Add player implementations here

import { Avatar } from "./avatar.js";

export class Player {
  #Name = "";
  #Order = -1;
  #Avatar = null;

  /**
   * The constructor for the Player class
   *
   * If Jane is the first player and has a Blue car:
   *     let Jane = new Player('Jane', 0, new Avatar('Car', Color.BLUE))
   *
   * @param name the name of the player
   * @param order the order / position the player is assigned in the game
   * @param avatar {Avatar} is the piece the player will play with. Example:
   *
   */
  constructor(name, order, avatar) {
    this.#Name = name;
    this.#Order = order;
    this.#Avatar = avatar;
  }

  get name() {
    return this.#Name;
  }

  // TODO - Fill in the remaining getters

  get order() {
    return this.#Order;
  }

  get avatar() {
    return this.#Avatar;
  }
}