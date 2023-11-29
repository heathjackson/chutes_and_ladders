import "./space.js";
import { SpaceType } from "./space.js";

// Add avatar implementations here
export class Color {
  static UNDEFINED = 0;
  static RED = 1;
  static BLACK = 2;
  static BROWN = 3;
  static BLUE = 4;
  static GREEN = 5;
  static PURPLE = 6;
  static WHITE = 7;
  static YELLOW = 8;
  static ORANGE = 9;
  static PINK = 10;
}

export class Avatar {
  winner = false;
  location;
  color = Color.UNDEFINED;

  /**
   *
   * @param color the color of the avatar
   */
  constructor(color) {
    this.color = color;
  }

  toggleWinner() {
    this.winner = !this.winner;
  }

  move(numberOfSpaces) {
    let location = this.location;

    //If the number of spaces rolled is a positive number, then move the avatar
    //forward that number of spaces.  If the avatar is moved to the finish space the avatar is landed.

    if (numberOfSpaces > 0) {
      for (let i = 0; i < numberOfSpaces; i++) {
        if (location.type === SpaceType.FINISH) {
          this.toggleWinner();
          console.log(`${this.color} is the winner`);
          return location.land(this);
        } else {
          location = location.next;
        }
      }

      //If the number of spaces rolled is a negative number, then move the avatar
      //backward that number of spaces.  If the avatar is moved to the start space the avatar is landed.
    } else {
      for (let i = 0; i > numberOfSpaces; i--) {
        if (location.type === SpaceType.START) {
          return location.land(this);
        } else {
          location = location.back;
        }
      }
    }
    return location.land(this);
  }
}
