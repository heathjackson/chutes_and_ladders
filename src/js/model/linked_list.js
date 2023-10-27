import { Space, SpaceType } from "./space.js";
import { Avatar } from "./avatar.js";

export class LinkedList {
  constructor () {
    this.head = null
    this.tail = null
    this.size = 0
  }

  //insert first space
  insertFirst(value, type) {
    this.head = new Space(value, type, this.head)
    this.size++
  }

  //insert normal spaces
  insertMiddleSpaces(startValue, type, totalSpaces) {
    let value = startValue
    let current = this.head

    for(let i = 0; i < totalSpaces; i++) {
      current.next = new Space(value, type)
      current = current.next
      value++
      this.size++
    }
  }


  //insert last space
  insertLast(type) {
    let space = new Space((this.size), type)
    let current

    //If empty, make head

    if(!this.head) {
      this.head = space

    } else {
      current = this.head

      while(current.next) {
        current = current.next
      }

      current.next = space
      this.size++
    }
  }

  //get space by it's index

  getByIndex(index) {
    if (index < 0 || index >= this.size) return null

    let current = this.head
    for (let i = 0; i < index; i++){
      current = current.next
    }
    return current
  }

  //print space value

  printSpaceValue() {
    let output = ''
    let current = this.head

    while (current) {
      output = `${output}${current.value} ->`
      current = current.next
    }
    console.log(`${output}null`)
  }

  //clear board

  clear() {
    this.head = null
    this.tail = null
    this.size = 0
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

ll.insertFirst(0, SpaceType.START)

ll.insertMiddleSpaces(1, SpaceType.NORMAL, 10)

ll.insertLast(SpaceType.FINISH)

ll.printSpaceValue()

let Jane = new Avatar('Car', 'blue')
let Heather = new Avatar('Hat', 'red')

ll.getByIndex(0).land(Jane)
Jane.move(5)
ll.getByIndex(0).land(Heather)

console.log(Jane.location.type)
console.log(Heather.location.type)

