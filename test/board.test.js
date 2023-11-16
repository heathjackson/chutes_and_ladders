import { Board } from "../src/js/model/board";

describe("createLadders", () => {
  let testBoard = new Board(10, 10, 5, 5);
  test("random number created for ladders be greater than 2 and less than 90", () => {
    for (let i = 0; i < 100; i++) {
      let testLadder = testBoard.createLadders();
      for (let i = 1; i <= testLadder.length; i++) {
        expect(testLadder[i]).toBeGreaterThan(1);
        expect(testLadder[i]).toBeLessThan(90);
      }
    }
  });
});
