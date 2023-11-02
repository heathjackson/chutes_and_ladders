import { Avatar } from "./avatar.js";
import { Space, SpaceType } from "./space.js";

export class Board {
  #Start = null
  #Finish = null
  #Columns = null
  #Rows = null
  #Chutes = null
  #Ladders = null
  #Size = 0
  #TopLadderSpaces = new Array(0)

  constructor (columns, rows, chutes, ladders) {
    this.#Columns = columns
    this.#Rows = rows
    this.#Chutes = chutes
    this.#Ladders = ladders
  }

  get start() {
    return this.#Start
  }

  get size() {
    return this.#Size
  }

  get finish() {
    return this.#Finish
  }

  get chutes() {
    return this.#Chutes
  }

  get ladders() {
    return this.#Ladders
  }

  get topLadderSpaces() {
    return [...this.#TopLadderSpaces]
  }

  //check if list is empty
  isEmpty() {
    return this.#Start == null ? true : false
  }

  //method to add space to end of doubly linked list

  addSpace(value, type){

    //create a temporary variable
    let temp = new Space(value, type)

    if (this.#Start === null) {
      this.#Start = temp
      this.#Finish = temp
    }

    //else add item to the start and shift the start

    else {
      temp.next = this.#Start
      this.#Start.back = temp
      this.#Start = this.#Start.back
    }

    this.#Size++
  }

  //randomly chooses all the spaces that will either have a chute or ladder
  specialSpaces() {
    let totalSpecial = this.#Chutes + this.#Ladders
    let totalSpaces = this.#Columns * this.#Rows
    let specialArray = []

    for(let i = 0; i < totalSpecial; i++ ){
      let specialSpace = Math.floor(Math.random() * totalSpaces)

      if(specialArray.includes(specialSpace)){
        i--
      }else{
        specialArray.push(specialSpace)
      }
    }
    return specialArray
  }

  //chute or ladder generator
  chuteOrLadder() {
    const randomNum = Math.floor(Math.random() * 2)

     // Return "chute" if random number is 0, "ladder" if it's 1
    
    return randomNum === 0 ? "chute" : "ladder"
  }

  //create ladder space
  ladderSpace(value) {

    //use the ladder space value perameter to determine the max and min for where the ladder ends
    const max = Math.ceil(this.#Columns * this.#Rows)
    const min = Math.floor(value + 1)

    let randomLadderTop = Math.floor(Math.random() * (max - min + 1) + min)
    let ladder = new Space(value, SpaceType.LADDER)
    ladder.special = new Space(randomLadderTop, SpaceType.NORMAL)

    this.#TopLadderSpaces.push(ladder.special)
  }

  //create chute Space
  chuteSpace(value) {
    const max = Math.ceil(value - 1)
    const min = Math.floor(0)

    let chute = new Space(value, SpaceType.CHUTE)
    let chuteEnd =  Math.floor(Math.random() * (max - min + 1) + min)

    let chuteSpecial = this.getByIndex(chuteEnd)
    chute.special = chuteSpecial
  }

  //create board

  createBoard() {
    const totalSpaces = this.#Rows * this.#Columns
    const allSpecialSpaces = this.specialSpaces()
    let totalLadders = this.#Ladders
    let totalChutes = this.#Chutes
    

    for(let i = totalSpaces - 1; i >= 0; i--){
      if(i == 0){
        this.addSpace(i, SpaceType.START)

      }else if(i === totalSpaces -1) {
        this.addSpace(i, SpaceType.FINISH)

      }else if (this.#TopLadderSpaces.some(space => space.value === i)) {
        let topLadderSpace = this.#TopLadderSpaces.find(space => space.value === i)
        this.addSpace(topLadderSpace)

      }else if(allSpecialSpaces.includes(i)) {
        if (i < totalSpaces - this.#Columns && totalLadders > 0 || 
          i < totalSpaces - this.#Columns && totalLadders > 0 && totalChutes === 0 ) {

            this.ladderSpace(i)
            totalLadders--

        }else if(i > this.#Columns && totalChutes > 0 || 
          i > this.#Columns && totalChutes > 0 && totalLadders === 0) {

          this.chuteSpace(i)
          totalChutes--

        }else{
          if(this.chuteOrLadder() === "ladder") {
            this.ladderSpace(i)
            totalLadders--

          }else{
            this.chuteSpace(i)
            totalChutes--
          }
        }
      }
      
      else{
        this.addSpace(i, SpaceType.NORMAL)
      }
    }
  }

  //get space by it's value

  getByIndex(index) {
    let current = this.#Start
    
    if (index < 0 || index >= this.#Size) {
      return null
    }

    for (let i = 0; i < index; i++){
      current = current.next
    }
    return current
  }

  //clear board

  clear() {
    this.#Start = null
    this.#Finish = null
    this.#Size = 0
  }

  //to traverse and display the list

  display() {
    let current = this.#Start

    while(current) {
      console.log(current.value)
      current = current.next
    }
  }
}

Board.fromValues = function(...values){
  const ll = new Board()
  for (let i = values.length - 1; i >= 0; i--){
    ll.addSpace(values[i])
  }
  return ll
}

let newBoard = new Board(10, 10, 5, 5)

newBoard.createBoard()
newBoard.display()
// newBoard.ladderSpace(7)
// newBoard.ladderSpace(10)
// console.log(newBoard.topLadderSpaces[0].value)
// console.log(newBoard.topLadderSpaces[1].value)

// console.log(newBoard.start.type)
// console.log(newBoard.finish.type)
// console.log(newBoard.size)
// console.log(newBoard.specialSpaces(10))

let Heather = new Avatar("car", "red")
let Sally = new Avatar("hat", "blue")
newBoard.start.land(Heather)
newBoard.start.land(Sally)
console.log(Heather.location.value)
console.log(Sally.location.value)
Heather.move(6)
Sally.move(6)
Heather.move(10)
Sally.move(8)
console.log(Heather.location.value)
console.log(Sally.location.value)






