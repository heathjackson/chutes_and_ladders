import { Space, SpaceType } from "./space.js";
import { randomNumber } from "./utils.js";
import { Avatar } from "./avatar.js";

export class Board {
  #Start = null;
  #Finish = null;
  #Columns = null;
  #Rows = null;
  #Chutes = null;
  #Ladders = null;
  #Size = 0;
  //designate special spaces ahead of time before creating board
  #SpecialSpacesArray = new Array(0);
  //holds a 2D array that connects the special space with the designated end space when the space is decided if it's a ladder or a chute
  #EndSpecialSpaces = new Array(0);

  constructor(columns, rows, chutes, ladders) {
    this.#Columns = columns;
    this.#Rows = rows;
    this.#Chutes = chutes;
    this.#Ladders = ladders;
  }

  get start() {
    return this.#Start;
  }

  set start(space) {
    this.#Start = space;
  }

  get size() {
    return this.#Size;
  }

  set size(value) {
    this.#Size += value;
  }

  get finish() {
    return this.#Finish;
  }

  set finish(space) {
    this.#Finish = space;
  }

  get chutes() {
    return this.#Chutes;
  }

  get ladders() {
    return this.#Ladders;
  }

  get specialSpacesArray() {
    return [...this.#SpecialSpacesArray];
  }

  set specialSpacesArray(value) {
    this.#SpecialSpacesArray.push(value);
  }

  get endSpecialSpaces() {
    return [...this.#EndSpecialSpaces];
  }

  set endSpecialSpaces(value) {
    this.#EndSpecialSpaces.push(value);
  }

  //method to add space to beginning of doubly linked list

  addSpace(value, type) {
    //create a variable to insert
    let temp = new Space(value, type);

    //if a list has not already been started make this new space both the start and finish
    if (this.start === null) {
      this.start = temp;
      this.finish = temp;
    }

    //else add the space to the start and shift the start to be the next space after start
    else {
      temp.next = this.start;
      this.start.back = temp;
      this.start = this.start.back;
    }

    //now that a new space has been added increase the total number of spaces by one
    this.size = 1;
  }

  //randomly chooses all the spaces that will either have a chute or ladder
  specialSpaces() {
    let totalSpecial = this.#Chutes + this.#Ladders;
    let totalSpaces = this.#Columns * this.#Rows;

    //run through the total amount of special spaces that need to be created
    for (let i = 0; i < totalSpecial; i++) {
      let specialSpace = randomNumber(1, totalSpaces - 2);

      //verify there are no duplicates of special spaces
      if (this.specialSpacesArray.includes(specialSpace)) {
        i--;

        //create a space holder for a special space to be created
      } else {
        this.specialSpacesArray = specialSpace;
      }
    }
  }

  //create ladder space
  ladderSpace(value) {
    this.addSpace(value, SpaceType.LADDER);

    const totalSpaces = this.#Columns * this.#Rows;

    //function that creates an end ladder space holder and guarantees the ladder will not
    //end further than 2 spaces before the end
    const endLadderCreater = () => {
      if (value + this.#Columns > totalSpaces - 2) {
        return totalSpaces - 2;
      } else {
        return randomNumber(value + this.#Columns, totalSpaces - 2);
      }
    };

    let endLadder = endLadderCreater();

    //verify that the end ladder space has not been used for a beginning special space if it has
    //populate another random end space holder
    this.#SpecialSpacesArray.includes(endLadder)
      ? (endLadder = endLadderCreater())
      : endLadder;

    //verify that the end ladder has also not been duplicated in end special spaces, if it has
    //generate another random end space holder
    this.#EndSpecialSpaces.forEach((specialSpace) => {
      if (specialSpace[1] === endLadder) {
        endLadder = randomNumber(value + this.#Columns, totalSpaces - 2);
      }
    });

    //if everything passes and there are no duplicates push the beginning and end values to end special in a 2d array to keep value pairs connected
    this.#EndSpecialSpaces.push([value, endLadder]);
  }

  //create chute Space
  chuteSpace(value) {
    this.addSpace(value, SpaceType.CHUTE);

    //function that creates an end chute space holder and verifies the end space will not be less than 2
    const endChuteCreater = () => {
      if (value - (this.#Columns - 1) < 3) {
        return 2;
      }
      //end space will have at least one column variance
      return randomNumber(3, value - (this.#Columns - 1));
    };

    let endChute = endChuteCreater();

    //verify the end chute space has not been used for a beginning special space if it has
    //populate another random end space holder
    this.#SpecialSpacesArray.includes(endChute)
      ? (endChute = endChuteCreater())
      : endChute;

    //verify the end chute has also not been duplicated in end special spaces, if it has
    //generate another random end space holder
    this.#EndSpecialSpaces.forEach((specialSpace) => {
      if (specialSpace[1] === endChute) {
        endChute = endChuteCreater();
      }
    });

    this.endSpecialSpaces = [value, endChute];
  }

  //create board
  createBoard() {
    const totalSpaces = this.#Rows * this.#Columns;
    let totalLadders = this.#Ladders;
    let totalChutes = this.#Chutes;

    this.specialSpaces();

    for (let i = totalSpaces - 1; i >= 0; i--) {
      if (i === 0) {
        this.addSpace(i, SpaceType.START);
      } else if (i === totalSpaces - 1) {
        this.addSpace(i, SpaceType.FINISH);

        //if i is a designated special space run the billions of if else statements below the initial if else statement
      } else if (this.#SpecialSpacesArray.includes(i)) {
        //if special space will be in the last row make it a chute
        if (i >= totalSpaces - this.#Columns) {
          this.chuteSpace(i);
          totalChutes--;

          //if special space is not located in the first or last row randomly choose if it's a ladder or a chute
        } else if (i < totalSpaces - this.#Columns && i >= this.#Columns) {
          if (
            (randomNumber(0, 2) === 0 && totalLadders > 0) ||
            totalChutes === 0
          ) {
            this.ladderSpace(i);
            totalLadders--;
          } else {
            this.chuteSpace(i);
            totalChutes--;
          }
        }

        //finally if the special space will be located in the first row make it a ladder
        else if (i < this.#Columns) {
          this.ladderSpace(i);
          totalLadders--;
        }
      }

      //make all other spaces normal spaces
      else {
        this.addSpace(i, SpaceType.NORMAL);
      }
    }

    //if total ladder and total cutes do not both equal 0 re-create the board
    if (totalLadders !== 0 && totalChutes !== 0) {
      this.clear();
      this.createBoard();
    }

    //create pointers to all the special end spaces after everything else on the board is created
    this.#EndSpecialSpaces.forEach((space) => {
      let specialSpace = this.getSpaceByValue(space[0]);
      let chuteEnd = this.getSpaceByValue(space[1]);
      specialSpace.special = chuteEnd;
    });

    console.log(
      `total chutes = ${totalChutes}, total ladders = ${totalLadders}`
    );
  }

  //get space by it's value
  getSpaceByValue(value) {
    let current = this.#Start;

    while (current.value !== value && current.next !== null) {
      current = current.next;
    }

    return current;
  }

  //clear board

  clear() {
    this.#Start = null;
    this.#Finish = null;
    this.#Size = 0;
  }

  //to traverse and display the list

  display() {
    let current = this.#Start;

    while (current) {
      console.log(`value = ${current.value} type = ${current.type}`);
      if (current.special) {
        console.log(`special = ${current.special.value}`);
      }
      current = current.next;
    }
  }
}

//used this in testing to isolate testing for different functions
Board.fromValues = function (...values) {
  const ll = new Board();
  for (let i = values.length - 1; i >= 0; i--) {
    ll.addSpace(values[i]);
  }
  return ll;
};

const newBoard = new Board(10, 10, 5, 5);
const Heather = new Avatar("car", "red");

newBoard.createBoard();
newBoard.display();
newBoard.start.land(Heather);
console.log(Heather.location.value);
Heather.move(2);
console.log(Heather.location.value);
Heather.move(10);
console.log(Heather.location.value);
Heather.move(5);
console.log(Heather.location.value);
