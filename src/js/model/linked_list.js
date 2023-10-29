import { Avatar } from "./avatar.js";
import { Space, SpaceType } from "./space.js";

export class LinkedList {
  #Head
  #Tail
  #Size
  
  constructor () {
    this.#Head = null
    this.#Tail = null
    this.#Size = 0
  }

  get head() {
    return this.#Head
  }

  get size() {
    return this.#Size
  }

  set size(num) {
    return this.#Size += num
  }

  get tail() {
    return this.#Tail
  }

  isEmpty() {
    this.#Head === null ? true : false
  }

  //insert head of linked list

  insertFirst(value, type) {
    let newSpace = new Space(value, type)

    newSpace.next = this.#Head
    this.#Head = newSpace
    newSpace.back = null
    this.size = 1
  }

  //insert board spaces including start and finish

  insertSpaces(totalSpaces) {

    if(!this.#Head){
      this.insertFirst(0, SpaceType.START)
    }


    let current = this.#Head
    
    for(let i = 1; i < totalSpaces - 1; i++) {
      let newSpace = new Space(i, SpaceType.NORMAL)
    
      current.next = newSpace
      newSpace.back = current
      this.#Tail = newSpace
      current = current.next
      this.size = 1
    }

    this.insertLast(SpaceType.FINISH)
  }

  //insert finish space at end

  insertLast(type){
    let current
    let newSpace = new Space(this.#Size, type)

  //if empty, make head

  if(!this.#Head) {
    this.#Head = newSpace
    this.size = 1
  }

  current = this.#Head

  while(current.next){
    current = current.next
  }

  current.next = newSpace
  newSpace.next = null
  this.#Tail = newSpace

  this.size = 1
    
}

  //get space by it's value

  getByValue(value) {
    let current = this.#Head
    
    if (value < 0 || value >= this.#Size) {
      return null
    }

    for (let i = 0; i < value; i++){
      current = current.next
    }
    return current
  }

  //print space value

  printSpaceValue() {
    let output = ''
    let current = this.#Head

    while (current) {
      output = `${output}${current.value} <-> `
      current = current.next
    }
    console.log(`null <-> ${output}null`)
  }

  //clear board

  clear() {
    this.#Head = null
    this.#Tail = null
    this.#Size = 0
  }
}

LinkedList.fromValues = function(...values){
  const ll = new LinkedList()
  for (let i = values.length - 1; i >= 0; i--){
    ll.insertFirst(values[i])
  }
  return ll
}

const ll = new LinkedList();
ll.insertSpaces(20)
const heather = new Avatar("car", "red")
ll.getByValue(0).land(heather)
heather.move(10)
console.log(ll.tail.value)

console.log(heather.location.type)
console.log(ll.size)







