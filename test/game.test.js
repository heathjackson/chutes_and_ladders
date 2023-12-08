// Copyright 2023 YOUR NAME HERE
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { Game } from "../src/js/model/game.js";
import { SpaceType } from "../src/js/model/space";
import { Color } from "../src/js/model/avatar";
import { Player } from "../src/js/model/player";

describe("#createSpecialSpaces", () => {
  const game = new Game(5, 5);
  test("#endMin, test function that sets the lowest number a ladder or chute can end at given a specific start number for the ladder and chute", () => {
    expect(game.endMin(SpaceType.LADDER, 6)).toBe(16);
    expect(game.endMin(SpaceType.CHUTE, 20)).toBe(2);
  });

  test("#endMax, test function that sets the lowest number a ladder or chute can end at given a specific start number for the ladder and chute", () => {
    expect(game.endMax(SpaceType.LADDER, 7)).toBe(99);
    expect(game.endMax(SpaceType.CHUTE, 41)).toBe(31);
  });

  test("#verifySpan - make sure the span from start to end of a special space is less than 40", () => {
    expect(game.verifySpan(20, 45)).toBeTruthy;
    expect(game.verifySpan(20, 60)).toBeFalsy;
  });

  test("#verifyUniqueValue - test for unique values in an array if another number is added", () => {
    const arr = [2, 5, 6, 10, 9];
    expect(game.verifyUniqueValue(arr, 11)).toBeTruthy;
    expect(game.verifyUniqueValue(arr, 10)).toBeFalsy;
  });
});

describe("#registerPlayer", () => {
  test("#chooseColor - verify color chosen is no longer available in array", () => {
    const game = new Game(5, 5);
    game.chooseColor(Color.GREEN);
    expect(game.available_avatars.length).toBe(3);
    expect(game.available_avatars).toEqual([
      Color.BLUE,
      Color.PURPLE,
      Color.RED,
    ]);
  });

  describe("test the registerPlayer function as a whole", () => {
    const game = new Game(5, 5);
    game.registerPlayer("Heather", Color.BLUE);
    game.registerPlayer("Matt", Color.GREEN);

    test("verify that each avatar is being created", () => {
      expect(game.registerPlayer.length).toBe(2);
    });

    test("avatars chosen are no longer available", () => {
      expect(game.available_avatars).toEqual([Color.PURPLE, Color.RED]);
    });
  });
});
