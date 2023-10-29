import { LinkedList } from "../src/js/model/linked_list";
import { SpaceType } from "../src/js/model/space";

describe('#getByValue', () => {
  describe('with value less than 0', () => {
    test('it returns null', () => {
      const ll = LinkedList.fromValues(10, 20)

      expect(ll.getByValue(-1).value).toBe(10)
    })
  })

  describe('with index 0', () => {
    test('expect ', () => {
      const ll = LinkedList.fromValues(10, 20, 30)

      expect(ll.getByValue(0).value).toBe(10)
    })
  })
  describe('with index in the middle', () => {
    test('it returns the element at the index', () => {
      const ll = LinkedList.fromValues(10, 20, 30, 40)

      expect(ll.getByValue(2).value).toBe(30)
    })
  })
})

