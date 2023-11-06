import { Board } from "../src/js/model/board";

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
})


