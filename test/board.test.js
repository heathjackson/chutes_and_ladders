import { Board } from "../src/js/model/board";

describe("#addSpace", () => {
  const ll = Board.fromValues(20, 30, 40);
  test("add a space to a linked list at the beginning of the list", () => {
    ll.addSpace(10);
    expect(ll.start.value).toEqual(10);
  });
});
