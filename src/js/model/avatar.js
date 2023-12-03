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
    //If the number of spaces rolled is a positive number, then move the avatar
    //forward that number of spaces.  If the avatar is moved to the finish space the avatar is landed.
    while (numberOfSpaces > 0) {
      if (this.location.type === SpaceType.FINISH) {
        this.toggleWinner();
        this.location.land(this);
        break;
        // } else if (this.location.next === SpaceType.FINISH) {
        //   this.location = this.location.next;
        //   this.toggleWinner();
        //   break;
      } else {
        this.location = this.location.next;
        numberOfSpaces--;
      }
    }
    this.location.land(this);
  }
}
