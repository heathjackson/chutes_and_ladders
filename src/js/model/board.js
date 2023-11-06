import { Space, SpaceType } from "./space.js";

export class Board {
  #Start = null
  #Finish = null
  #Columns = null
  #Rows = null
  #Chutes = null
  #Ladders = null
  #Size = 0
  //designate special spaces ahead of time before creating board
  #SpecialSpacesArray = new Array(0)
  //holds a 2D array that connects the special space with the designated end space when the space is decided if it's a ladder or a chute
  #EndSpecialSpaces = new Array (0)

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

  get specialSpacesArray() {
    return [...this.#SpecialSpacesArray]
  }

  get endSpecialSpaces() {
    return [...this.#EndSpecialSpaces]
  }

  //check if list is empty
  isEmpty() {
    return this.#Start == null ? true : false
  }

  //method to add space to end of doubly linked list

  addSpace(value, type){

    //create a variable to insert
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

    for(let i = 0; i < totalSpecial; i++ ){
      let specialSpace = this.randomNumber(1, totalSpaces - 2)

      if(this.#SpecialSpacesArray.includes(specialSpace)){
        i--
      }else{
        this.#SpecialSpacesArray.push(specialSpace)
      }
    }
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

 
  //create ladder space
  ladderSpace(value) {
    this.addSpace(value, SpaceType.LADDER)

    const totalSpaces = this.#Columns * this.#Rows
    let endLadder = this.randomNumber(value + this.#Columns, totalSpaces - 2)

    this.#SpecialSpacesArray.includes(endLadder) ? endLadder = this.randomNumber(value + this.#Columns, totalSpaces - 2) : endLadder
    this.#EndSpecialSpaces.map((specialSpace) => {
      if(specialSpace[1] === endLadder){
        endLadder = this.randomNumber(value + this.#Columns, totalSpaces - 2)
      }
    })
  
    this.#EndSpecialSpaces.push([value, endLadder])
  }

  //create chute Space
  chuteSpace(value) {
    this.addSpace(value, SpaceType.CHUTE)

    const endChuteCreater = () => {
      return this.randomNumber(1, value - (this.#Columns - 1))
    }

    let endChute = endChuteCreater()

    this.#SpecialSpacesArray.includes(endChute) ? endChute = endChuteCreater() : endChute

    this.#EndSpecialSpaces.map((specialSpace) => {
      if(specialSpace[1] === endChute){
        endChute = endChuteCreater()
      }
    })
    
    this.#EndSpecialSpaces.push([value, endChute])
  }

  //create board
  createBoard() {
    const totalSpaces = this.#Rows * this.#Columns
    let totalLadders = this.#Ladders
    let totalChutes = this.#Chutes

    this.specialSpaces()

    for(let i = totalSpaces - 1; i >= 0; i--){
      if(i === 0){
        this.addSpace(i, SpaceType.START)

      }else if(i === totalSpaces - 1) {
        this.addSpace(i, SpaceType.FINISH)

      }else if(this.#SpecialSpacesArray.includes(i)) {

        if (i < this.#Columns && totalLadders > 0) {
            this.ladderSpace(i)
            totalLadders--
            
        }else if(i >= totalSpaces - this.#Columns && totalChutes > 0) {
          this.chuteSpace(i)
          totalChutes--

        }else if((this.randomNumber(0, 2) === 0 && totalLadders > 0) || (totalLadders > 0 && totalChutes === 0)) {
            this.ladderSpace(i)
            totalLadders--

        }else{
            this.chuteSpace(i)
            totalChutes--
          }
      }

      else{
        this.addSpace(i, SpaceType.NORMAL)
      }
    }

    this.#EndSpecialSpaces.map((space) => {
      let specialSpace = this.getSpaceByValue(space[0])
      let chuteEnd = this.getSpaceByValue(space[1])
      specialSpace.special = chuteEnd
    })
    

    console.log(`total chutes = ${totalChutes}, total ladders = ${totalLadders}`)
  }

  //get space by it's value
  getSpaceByValue(value) {
    let current = this.#Start

    while(current.value !== value && current.next !== null){
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
      console.log(`value = ${current.value} type = ${current.type}`)
      if(current.special){
        console.log(`special = ${current.special.value}`)
      }
      current = current.next
    }
  }
}

//used this in testing to isolate testing for different functions
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
console.log(newBoard.specialSpacesArray)
newBoard.endSpecialSpaces.map((space) => {
  console.log(space)
})












