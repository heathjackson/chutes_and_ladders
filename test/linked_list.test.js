import { LinkedList } from "../src/js/model/linked_list";
import { SpaceType } from "../src/js/model/space";

describe('#insertHead', () => {
  test('it adds the element to the beginning of the list', () => {
    const ll = new LinkedList()
    ll.insertFirst(10, SpaceType.NORMAL)
    const oldHead = ll.head.value
    ll.insertFirst(0, SpaceType.START)
    
    expect(ll.head.value).toBe(0)
    expect(ll.head.next.value).toBe(oldHead)
    expect(ll.size).toBe(2)
  })
})

describe('#getByIndex', () => {
  describe('with index less than 0', () => {
    test('it returns null', () => {
      const ll = LinkedList.fromValues(10, 20)

      expect(ll.getByIndex(5)).toBeNull()
    })
  })

  describe('with index 0', () => {
    test('it returns the head', () => {
      const ll = LinkedList.fromValues(10, 20)

      expect(ll.getByIndex(0).value).toBe(10)
    })
  })

  describe('with index in the middle', () => {
    test('it returns the element at the index', () => {
      const ll = LinkedList.fromValues(10, 20, 30, 40)

      expect(ll.getByIndex(2).value).toBe(30)
    })
  })
})

