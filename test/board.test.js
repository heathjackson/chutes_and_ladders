import { Board } from "../src/js/model/board";
import { SpaceType } from "../src/js/model/space";

describe('#isEmpyt', () => {
  test('returns true if linked list is empty', () => {
    const ll = Board.fromValues()
    expect(ll.isEmpty()).toBe(true)
  })
  
  test('returns false if linked list is not empty', () => {
    const ll = Board.fromValues(10, 20)
    expect(ll.isEmpty()).toBe(false)
  })
})

describe('#addSpace', () => {
  const ll = Board.fromValues(20, 30, 40)
  test('add a space to a linked list at the beginning of the list', () => {
    
    ll.addSpace(10)
    expect(ll.start.value).toEqual(10)
  })
  test('add a second space and verify it is added at the beginning', () => {
    ll.addSpace(20)
    expect(ll.size).toEqual(5)
    expect(ll.start.value).toEqual(20)
    expect(ll.getByIndex(0).value).toEqual(20)
  }) 
})


