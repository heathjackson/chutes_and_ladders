import { SpaceType, Space } from "../src/js/model/space";
import { Board } from "../src/js/model/board";

describe("check that the board is created correctly with the correct amount of spaces with start and finish", () => {
  const spaceMaker = (startValue, type) => {
    return new Space(startValue, type);
  };
  const board = new Board([], 100, spaceMaker);
  test("check board is set up correctly", () => {
    expect(board).toBeTruthy();
    expect(board.start).toBeTruthy();
    expect(board.start.next).toBeTruthy();
    expect(board.start.back).toBeFalsy();
    expect(board.start.type).toEqual(SpaceType.START);
    expect(board.finish.type).toEqual(SpaceType.FINISH);
    expect(board.finish.next).toBeFalsy();
    expect(board.finish.back).toBeTruthy();
  });

  test("board is the correct size", () => {
    let i = 0;
    while (board.start !== null) {
      board.start = board.start.next;
      i++;
    }
    expect(i).toEqual(board.totalSpaces);
  });
});
