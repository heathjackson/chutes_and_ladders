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
import { Color } from "../src/js/model/avatar";

describe("#createSpecialSpaces", () => {
  const game = new Game(5, 5);
  test("#createSpecialSpaces", () => {
    expect(game.specialSpaces.length).toBe(20);
  });

  test("#verifySpan - make sure the span from start to end of a special space is less than 40", () => {
    expect(game.isWithinSpan(20, 45)).toBeTruthy;
    expect(game.isWithinSpan(20, 60)).toBeFalsy;
  });

  test("#verifyUniqueValue - test for unique values in an array if another number is added", () => {
    const arr = [2, 5, 6, 10, 9];
    expect(game.isUniqueValue(arr, 11)).toBeTruthy;
    expect(game.isUniqueValue(arr, 10)).toBeFalsy;
  });
});

describe("#registerPlayer", () => {
  test("#chooseColor - verify color chosen is no longer available in array", () => {
    const game = new Game(5, 5);
    game.chooseColor(Color.GREEN);
    expect(game.availableAvatars.length).toBe(3);
    expect(game.availableAvatars).toEqual([
      Color.BLUE,
      Color.PURPLE,
      Color.RED,
    ]);
  });

  describe("test the registerPlayer function as a whole", () => {
    let game;

    beforeEach(() => {
      game = new Game(5, 5);
      game.registerPlayer("Heather", Color.BLUE);
      game.registerPlayer("Matt", Color.GREEN);
    });

    test("should create a game instance", () => {
      expect(game).toBeInstanceOf(Game);
    });

    test("verify that each avatar is being created", () => {
      expect(game.registerPlayer.length).toBe(2);
    });

    test("avatars chosen are no longer available", () => {
      expect(game.availableAvatars).toEqual([Color.PURPLE, Color.RED]);
    });

    test("should not allow more than four players to be registered", () => {
      game.registerPlayer("London", Color.PURPLE);
      game.registerPlayer("Brooklyn", Color.RED);
      game.registerPlayer("Austin", Color.GREEN);
      expect(game.registeredPlayers).toHaveLength(4);
    });

    test("should set up the game with registered players", () => {
      game.setUpGame();
      game.registeredPlayers.map((player) => {
        expect(player.avatar.location.value).toEqual(1);
      });
    });
  });
});
